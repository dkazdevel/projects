import {
  Controller,
  UseGuards,
  UsePipes,
  UseInterceptors,
  Post,
  ValidationPipe,
  UploadedFile,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { ApiConsumes } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { fileMimetypeFilter } from '../files/filters/file-mimetype-filter';
import { MAX_IMAGE_SIZE } from '../constants/constants';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserEntity } from '../user/user.entity';
import { ParseFile } from 'src/files/pipes/parse-file.pipe';
import { User } from '../user/decorators/user.decarator';
import { CreatePostDto } from './dto/createPost.dto';
import { PromiseOptional } from '../interfacesAndTypes/optional.interface';
import { UploadApiResponse } from 'cloudinary';
import { BlogService } from './blog.service';
import { FilesService } from '../files/files.service';
import { PostsResponseInterface } from './interface/postResponseInterface';
import { BlogEntity } from './blog.entity';
import { EditPostDto } from './dto/editPost.dto';

@Controller('blog')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    private readonly filesService: FilesService,
  ) {}

  @ApiOperation({ summary: 'Create post' })
  @ApiResponse({
    status: 201,
    description: 'Create post for register user',
  })
  @ApiSecurity('JWT-auth')
  @ApiConsumes('multipart/form-data')
  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileMimetypeFilter('image', 'mp4', 'mov', 'm4v'),
      limits: { fileSize: MAX_IMAGE_SIZE },
    }),
  )
  async createPost(
    @UploadedFile(ParseFile) file: Express.Multer.File,
    @User() currentUser: UserEntity,
    @Body() createPostDto: CreatePostDto,
  ): PromiseOptional<void> {
    const imgSavedData: UploadApiResponse =
      await this.filesService.getSavedImgData(file);
    Object.assign(createPostDto, { media: imgSavedData.secure_url });

    return await this.blogService.createPost(currentUser, createPostDto);
  }

  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({
    status: 200,
    description: 'All posts',
  })
  @Get()
  @UsePipes(new ValidationPipe())
  async findAllBlogs(): Promise<PostsResponseInterface> {
    return await this.blogService.findAll();
  }

  @ApiOperation({ summary: 'Get all my posts' })
  @ApiResponse({
    status: 200,
    description: 'All my posts',
  })
  @UseGuards(AuthGuard)
  @Get('my-posts')
  @UsePipes(new ValidationPipe())
  async findAllMyBlogs(
    @User('id') currentUserId: number,
  ): Promise<PostsResponseInterface> {
    const filterObj = { user: currentUserId };

    return await this.blogService.findAll(filterObj);
  }

  @ApiOperation({ summary: 'Get one advertisement' })
  @ApiResponse({ status: 200, description: 'Get one advertisement by slug' })
  @Get(':slug')
  async getSinglePost(
    @Param('slug') slug: string,
  ): PromiseOptional<BlogEntity> {
    return await this.blogService.getBlogBySlug(slug);
  }

  @ApiOperation({ summary: 'Edit post' })
  @ApiResponse({ status: 201, description: 'Edit post for registered user' })
  @ApiSecurity('JWT-auth')
  @ApiConsumes('multipart/form-data')
  @Patch()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileMimetypeFilter('image', 'mp4', 'mov', 'm4v'),
      limits: { fileSize: MAX_IMAGE_SIZE },
    }),
  )
  async editPost(
    @UploadedFile() file: Express.Multer.File,
    @User() currentUser: UserEntity,
    @Body() editPostDto: EditPostDto,
  ): PromiseOptional<void> {
    if (file) {
      const imgSavedData: UploadApiResponse =
        await this.filesService.getSavedImgData(file);
      Object.assign(editPostDto, { media: imgSavedData.secure_url });
    }

    return await this.blogService.editPost(currentUser, editPostDto);
  }

  @ApiOperation({ summary: 'Delete post' })
  @ApiResponse({ status: 201, description: 'Delete post for register user' })
  @ApiSecurity('JWT-auth')
  @Delete(':slug')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async deletePost(
    @User() currentUser: UserEntity,
    @Param('slug') slug: string,
  ): PromiseOptional<void> {
    return await this.blogService.deletePost(currentUser, slug);
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import { MFile } from './InterfacesAndTypes/mfile.class';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UploadApiResponse } from 'cloudinary';
import { MessageError } from '../constants/constants';

@Injectable()
export class FilesService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async saveFiles(file: MFile): Promise<UploadApiResponse> {
    if (file.mimetype === 'image') {
    }
    return await this.cloudinaryService.uploadFile(file).catch(() => {
      throw new HttpException(
        MessageError.ERROR_WHILE_SAVING_ON_CLOUDINARY,
        HttpStatus.NOT_ACCEPTABLE,
      );
    });
  }

  async convertToWebP(file: Buffer): Promise<Buffer> {
    return sharp(file).webp().toBuffer();
  }

  async getSavedImgData(file: MFile) {
    let saveFile: MFile;

    saveFile = new MFile({
      originalname: file.mimetype.toString().startsWith('image')
        ? `${file.originalname.split('.')[0]}.webp`
        : file.originalname,
      buffer: file.mimetype.toString().startsWith('image')
        ? await this.convertToWebP(file.buffer)
        : file.buffer,
      mimetype: file.mimetype,
    });

    return this.saveFiles(saveFile);
  }
}

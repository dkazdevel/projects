import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FILES_ERRORS } from '../../constants/constants';

@Injectable()
export class ParseFile implements PipeTransform {
  transform(
    files: Express.Multer.File,
    metadata: ArgumentMetadata,
  ): Express.Multer.File {
    console.log(files);
    if (files === undefined || files === null) {
      throw new HttpException(FILES_ERRORS.FILE_EXPECTED, HttpStatus.NOT_FOUND);
    }
    return files;
  }
}

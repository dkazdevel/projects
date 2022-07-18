import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { MFile } from '../files/InterfacesAndTypes/mfile.class';

@Injectable()
export class CloudinaryService {
  async uploadFile(file: MFile): Promise<UploadApiResponse> {
    if (file.mimetype.toString().startsWith('image')) {
      return new Promise((resolve, reject) => {
        const upload = v2.uploader.upload_stream((error, result) => {
          if (error) {
            console.log(error);
            return reject(error);
          }

          resolve(result);
        });

        toStream(file.buffer).pipe(upload);
      });
    } else {
      return new Promise((resolve, reject) => {
        const upload = v2.uploader
          .upload_stream({ resource_type: 'video' }, (error, result) => {
            if (error) {
              console.log(error);
              return reject(error);
            }

            resolve(result);
          })
          .end(file.buffer);
      });
    }
  }

  // async uploadVideo(video: MFile): Promise<UploadApiResponse> {
  //   return await v2.uploader.upload(
  //       {
  //         resource_type: "video",
  //         public_id: "blog/video",
  //         chunk_size: 6000000,
  //       });
  // }
}

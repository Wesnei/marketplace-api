// Path: src/cloudinary/cloudinary.service.ts

import { Injectable, BadRequestException } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  constructor() {
    // Esta configuração usa as variáveis de ambiente que você já definiu no .env
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  // Função que recebe um arquivo e o envia para o Cloudinary
  uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      if (!file) {
        return reject(new BadRequestException('O upload do arquivo é obrigatório.'));
      }

      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'ecommerce-products' },
        (error, result) => {
          if (error) {
            console.error('Cloudinary Error:', error);
            return reject(new BadRequestException('Falha no upload para o Cloudinary.'));
          }
          // Check if result is defined before resolving
          if (result) {
            resolve(result);
          } else {
            reject(new BadRequestException('Falha no upload para o Cloudinary - resposta vazia.'));
          }
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
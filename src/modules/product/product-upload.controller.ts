// Path: src/modules/product/product-upload.controller.ts

import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductUploadController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload product image to Cloudinary' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ 
    status: 201, 
    description: 'Image uploaded successfully',
    example: {
      imageUrl: 'https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/ecommerce-products/image.jpg'
    }
  })
  @ApiResponse({ status: 400, description: 'No file provided' })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado.');
    }

    // Delega o upload para o serviço do Cloudinary
    const uploadResult = await this.cloudinaryService.uploadImage(file);

    // Retorna a URL segura e permanente
    return {
      imageUrl: uploadResult.secure_url,
    };
  }
}
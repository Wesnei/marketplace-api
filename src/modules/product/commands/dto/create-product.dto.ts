import { IsString, IsNumber, IsNotEmpty, IsUrl, Min, IsOptional } from 'class-validator'; // Add IsOptional to the import
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Product name', example: 'iPhone 15' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Product description', example: 'Latest iPhone with advanced features' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ 
    description: 'Product image URL (obtained from Cloudinary upload)', 
    example: 'https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/ecommerce-products/image.jpg',
    required: false
  })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ description: 'Product price', example: 999.99 })
  @IsNotEmpty()
  price: number;
}
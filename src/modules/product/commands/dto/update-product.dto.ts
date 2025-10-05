import { IsString, IsNumber, IsOptional, IsUrl, Min, IsUUID } from 'class-validator';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({ description: 'Product ID', example: 'uuid-string' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Product name', example: 'iPhone 15 Pro', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Product description', example: 'Latest iPhone Pro with advanced features', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ 
    description: 'Product image URL (obtained from Cloudinary upload)', 
    example: 'https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/ecommerce-products/image.jpg',
    required: false
  })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ description: 'Product price', example: 1199.99, required: false })
  @IsOptional()
  price?: number;
}

export class UpdateProductDtoWithoutId extends OmitType(UpdateProductDto, ['id'] as const) {}
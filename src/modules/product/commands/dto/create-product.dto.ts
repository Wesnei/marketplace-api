import { IsString, IsNumber, IsNotEmpty, IsUrl, Min } from 'class-validator';
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

  @ApiProperty({ description:'Product image', type: 'string', format: 'binary' })
  image: any;

  @ApiProperty({ description: 'Product price', example: 999.99 })
  @IsNotEmpty()
  price: number;
}

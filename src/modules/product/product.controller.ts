import { Controller, Get, Post, Put, Delete, Query, Body, Param, UploadedFile, UseInterceptors, BadRequestException } from "@nestjs/common";
import { QueryBus, CommandBus } from "@nestjs/cqrs";
import { GetProductsDto } from "./queries/dto/get-products.dto";
import { GetProductsQuery } from "./queries/impl/get-products.query";
import { GetProductByIdQuery } from "./queries/impl/get-product-by-id.query";
import { CreateProductCommand } from "./commands/impl/create-product.command";
import { UpdateProductCommand } from "./commands/impl/update-product.command";
import { DeleteProductCommand } from "./commands/impl/delete-product.command";
import { CreateProductDto } from "./commands/dto/create-product.dto";
import { UpdateProductDtoWithoutId } from "./commands/dto/update-product.dto";
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth, ApiConsumes, ApiBody } from "@nestjs/swagger";
import { Public } from "../auth/decorators/public.decorator";
import { Roles } from "../../core/decorators/roles.decorator";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) { }

  @Get()
  @ApiOperation({ summary: 'Get products with pagination and filters' })
  @ApiResponse({
    status: 200, example: {
      page: 1,
      limit: 10,
      total: 100,
      products: []
    }
  })
  @Public()
  async getProducts(@Query() query: GetProductsDto) {
    return this.queryBus.execute(new GetProductsQuery({
      ...query,
      price: query.price ? Number(query.price) : undefined
    }));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiResponse({ status: 200, example: {
    id: '1',
    name: 'iPhone 15',
    description: 'Latest iPhone with advanced features',
    imageUrl: `${process.env.BASE_URL}/image.jpg`,
    price: 999.99
  } })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @Public()
  async getProductById(@Param('id') id: string) {
    return this.queryBus.execute(new GetProductByIdQuery({ id }));
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product (Admin only)' })
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201, example: {
      id: '1',
      name: 'iPhone 15',
      description: 'Latest iPhone with advanced features',
      imageUrl: `${process.env.BASE_URL}/image.jpg`,
      price: 999.99
    }
  })
  @ApiResponse({
    status: 401, example: {
      message: 'Unauthorized',
      statusCode: 401
    }
  })
  @ApiResponse({
    status: 403, example: {
      message: 'Forbidden - Admin role required',
      statusCode: 403
    }
  })
  @ApiBearerAuth()
  @Roles(['ADMIN'])
  async createProduct(
    @UploadedFile() image: Express.Multer.File,
    @Body() createProductDto: CreateProductDto
  ) {
    return this.commandBus.execute(new CreateProductCommand({
      ...createProductDto,
      price: Number(createProductDto.price),
      imageUrl: image.filename
    }));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product (Admin only)' })
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, example: {
    id: '1',
    name: 'iPhone 15',
    description: 'Latest iPhone with advanced features',
    imageUrl: `${process.env.BASE_URL}/image.jpg`,
    price: 999.99
  } })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin role required' })
  @ApiBearerAuth()
  @Roles(['ADMIN'])
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDtoWithoutId,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.commandBus.execute(new UpdateProductCommand({
      id,
      price: updateProductDto.price ? Number(updateProductDto.price) : undefined,
      imageUrl: image ? image.filename : undefined,
      description: updateProductDto.description ? updateProductDto.description : undefined,
      name: updateProductDto.name ? updateProductDto.name : undefined
    }));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product (Admin only)' })
  @ApiResponse({ status: 200, example: {
    message: 'Product deleted successfully',
    product: {
      id: '1',
      name: 'iPhone 15',
      description: 'Latest iPhone with advanced features',
      imageUrl: `${process.env.BASE_URL}/image.jpg`,
      price: 999.99
    }
  } })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin role required' })
  @ApiBearerAuth()
  @Roles(['ADMIN'])
  async deleteProduct(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteProductCommand({ id }));
  }
}
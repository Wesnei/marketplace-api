import { Controller, Get, Post, Put, Delete, Query, Body, Param } from "@nestjs/common"; // Remove UploadedFile, UseInterceptors, BadRequestException
import { QueryBus, CommandBus } from "@nestjs/cqrs";
import { GetProductsDto } from "./queries/dto/get-products.dto";
import { GetProductsQuery } from "./queries/impl/get-products.query";
import { GetProductByIdQuery } from "./queries/impl/get-product-by-id.query";
import { CreateProductCommand } from "./commands/impl/create-product.command";
import { UpdateProductCommand } from "./commands/impl/update-product.command";
import { DeleteProductCommand } from "./commands/impl/delete-product.command";
import { CreateProductDto } from "./commands/dto/create-product.dto";
import { UpdateProductDtoWithoutId } from "./commands/dto/update-product.dto";
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from "@nestjs/swagger"; // Remove ApiConsumes
import { Public } from "../auth/decorators/public.decorator";
import { Roles } from "../../core/decorators/roles.decorator";
// Remove FileInterceptor import

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
    // Remove CloudinaryService injection since we're not using it directly in this controller anymore
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
  // Remove FileInterceptor and ApiConsumes
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
    // Remove @UploadedFile() image: Express.Multer.File,
    @Body() createProductDto: CreateProductDto
  ) {
    // Remove Cloudinary upload logic since imageUrl is now passed directly
    return this.commandBus.execute(new CreateProductCommand({
      ...createProductDto,
      price: Number(createProductDto.price),
      // Provide a default imageUrl if not provided
      imageUrl: createProductDto.imageUrl || ''
    }));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product (Admin only)' })
  // Remove FileInterceptor and ApiConsumes
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
    @Body() updateProductDto: UpdateProductDtoWithoutId
    // Remove @UploadedFile() image: Express.Multer.File,
  ) {
    // Remove Cloudinary upload logic since imageUrl is now passed directly
    return this.commandBus.execute(new UpdateProductCommand({
      id,
      price: updateProductDto.price ? Number(updateProductDto.price) : undefined,
      imageUrl: updateProductDto.imageUrl, // Use imageUrl directly from DTO
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
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { GetProductsHandler } from "./queries/handlers/get-products.handler";
import { GetProductByIdHandler } from "./queries/handlers/get-product-by-id.handler";
import { CreateProductHandler } from "./commands/handlers/create-product.handler";
import { UpdateProductHandler } from "./commands/handlers/update-product.handler";
import { DeleteProductHandler } from "./commands/handlers/delete-product.handler";
import { ProductController } from "./product.controller";
import { MulterModule } from "@nestjs/platform-express";
import { MulterConfigService } from "src/core/infra/multer/multer-config.service";

@Module({
  imports: [
    CqrsModule, MulterModule.registerAsync({
      useClass: MulterConfigService,
    })
  ],
  controllers: [ProductController],
  providers: [
    GetProductsHandler,
    GetProductByIdHandler,
    CreateProductHandler,
    UpdateProductHandler,
    DeleteProductHandler
  ]
})
export class ProductModule { }
import { Injectable } from "@nestjs/common";
import { MulterOptionsFactory, MulterModuleOptions } from "@nestjs/platform-express";
import { memoryStorage } from "multer"; // Change from diskStorage to memoryStorage

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: memoryStorage() // Use memory storage instead of disk storage
    };
  }
}
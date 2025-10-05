import { Injectable } from "@nestjs/common";
import { MulterOptionsFactory, MulterModuleOptions } from "@nestjs/platform-express";
import { diskStorage } from "multer";

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`);
        }
      })
    };
  }
}
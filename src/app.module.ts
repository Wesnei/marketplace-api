import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { validateEnv } from './core/infra/config/env';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './core/guards/roles.guard';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { AuthModule } from './modules/auth/auth.module';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductModule } from './modules/product/product.module';
import { CartModule } from './modules/cart/cart.module';
import { AppController } from './app.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from './core/infra/multer/multer-config.service';

@Module({
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
  imports: [
    AuthModule,
    CoreModule,
    ProductModule,
    CartModule,
    CqrsModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv
    }),
  ],
})
export class AppModule { }

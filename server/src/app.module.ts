import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { BannedUser } from './users/banned-users.model';
import { ProductsModule } from './products/products.module';
import { FilesModule } from './files/files.module';
import { Product } from './products/products.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { ProductInfo } from './products/product-info.model';
import { CategoriesModule } from './category/categories.module';
import { Category } from './category/categories.model';
import { ProductCategory } from './category/product-categories.model';
import { RatingsModule } from './ratings/ratings.module';
import { Rating } from './ratings/ratings.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, BannedUser, Product, ProductInfo, Category, ProductCategory, Rating],
      autoLoadModels: true
    }),
    // Registring passport into app module
    PassportModule.register({ session: true }),
    UsersModule,
    RolesModule,
    AuthModule,
    ProductsModule,
    FilesModule,
    CategoriesModule,
    RatingsModule,
  ],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { ShippingInfoService } from './shipping-info.service';
import { ShippingInfoController } from './shipping-info.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { ShippingInfo } from './shipping-info.model';

@Module({
  providers: [ShippingInfoService],
  controllers: [ShippingInfoController],
  imports: [
    SequelizeModule.forFeature([ShippingInfo]),
    AuthModule,
  ],
  exports: [ShippingInfoService]
})
export class ShippingInfoModule { }

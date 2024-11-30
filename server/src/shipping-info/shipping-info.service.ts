import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ShippingInfo } from './shipping-info.model';
import { AddShippingInfoDto } from './dto/add-shippingInfo.dto';

@Injectable()
export class ShippingInfoService {
    constructor(
        @InjectModel(ShippingInfo) private shippingInfoRepo: typeof ShippingInfo,
    ) { }

    async getInfosByUserId(userId: number) {
        if (userId) {
            return await this.shippingInfoRepo.findAll({ where: { userId: userId } })
        }

        throw new BadRequestException("user id not provided")
    }

    async getInfoById(id: number) {
        return await this.shippingInfoRepo.findByPk(id)
    }

    async addShippingInfo(dto: AddShippingInfoDto, userId: number) {
        const isFirstAddress = await this.getInfosByUserId(userId)
        const ShippingInfoDto = { ...dto, userId }

        if (userId) {
            if (isFirstAddress.length > 1) {
                return await this.shippingInfoRepo.create(ShippingInfoDto)
            }

            if (isFirstAddress.length < 1) {
                const ShippingInfoDto = { isDefault: true, ...dto, userId }
                return await this.shippingInfoRepo.create(ShippingInfoDto)
            }
        }

        throw new BadRequestException("user id not provided")
    }

    async removeShippingInfo(userId: number, ShippingInfoId: number) {
        return await this.shippingInfoRepo.destroy({ where: { userId: userId, id: ShippingInfoId } })
    }

}

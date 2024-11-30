import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Req } from '@nestjs/common';
import { ShippingInfoService } from './shipping-info.service';
import { AddShippingInfoDto } from './dto/add-shippingInfo.dto';
import { AuthService } from 'src/auth/auth.service';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('shipping-info')
export class ShippingInfoController {
    constructor(
        private shippingInfoService: ShippingInfoService,
        private authService: AuthService,
    ) { }


    @Get()
    async getShippingInfos(@Req() req) {
        const jwtToken = req.cookies.jwtToken;

        if (jwtToken) {
            const decoded = await this.authService.verifyJwtToken(jwtToken)
            if (decoded.sub) {
                return await this.shippingInfoService.getInfosByUserId(decoded.sub)
            }
        }

        throw new BadRequestException("user id not provided")
    }

    @Post()
    async createShippingInfo(@Req() req, @Body() dto: AddShippingInfoDto) {
        const jwtToken = req.cookies.jwtToken;

        if (jwtToken) {
            const decoded = await this.authService.verifyJwtToken(jwtToken)
            if (decoded.sub) {
                return await this.shippingInfoService.addShippingInfo(dto, decoded.sub)
            }
        }

        throw new BadRequestException("user id not provided")
    }

    @Delete()
    async removeShippingInfo(@Req() req, @Body() shippingInfoId: number) {
        try {
            const jwtToken = req.cookies.jwtToken;

            if (jwtToken) {
                const decoded = await this.authService.verifyJwtToken(jwtToken)
                if (decoded.sub) {
                    return await this.shippingInfoService.removeShippingInfo(shippingInfoId, decoded.sub)
                }
            }

        } catch (e) {
            throw new NotFoundException("Shipping address not found")
        }
    }

    @Roles("ADMIN")
    @Get(':id')
    async getInfoById(@Param('id') id: number) {
        return await this.shippingInfoService.getInfoById(id)
    }
}

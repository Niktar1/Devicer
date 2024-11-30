import { Body, Controller, Get, Param, Post, Req, UnauthorizedException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthService } from 'src/auth/auth.service';
import { BasketsService } from 'src/baskets/baskets.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AddOrderItemsDto } from './dto/add-order-items.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('orders')
export class OrdersController {
    constructor(
        private ordersService: OrdersService,
        private authService: AuthService,
        private basketsService: BasketsService,
    ) { }

    @Post()
    async createOrder(@Req() req, @Body() { phone, shippingInfoId }: { phone: number, shippingInfoId: number }) {
        const jwtToken = req.cookies.jwtToken;

        if (jwtToken) {
            const decoded = await this.authService.verifyJwtToken(jwtToken)
            if (decoded.sub) {
                const userBasket = await this.basketsService.getUserBasket(null, decoded.sub);
                const basketProducts = await this.basketsService.getBasketProducts(userBasket.id)

                const orderDto: CreateOrderDto = {
                    userId: decoded.sub,
                    phone: phone,
                    shippingInfoId: shippingInfoId,

                }
                const order = await this.ordersService.createOrder(orderDto)

                basketProducts.forEach((product) => {
                    const orderItemsDto: AddOrderItemsDto = {
                        orderId: order.id,
                        productId: product.id,
                    }
                    return this.ordersService.addOrderItem(orderItemsDto)
                })
                return [order, basketProducts]
            }
        }
    }

    @Get('myorders')
    async getUserOrders(@Req() req) {
        const jwtToken = req.cookies.jwtToken;
        if (jwtToken) {
            const decoded = await this.authService.verifyJwtToken(jwtToken)
            if (decoded.sub) {
                return await this.ordersService.getOrdersByUserId(decoded.sub);
            }
        }
        throw new UnauthorizedException("User not logged in")
    }

    @Roles("ADMIN")
    @Get()
    async getAllOrders() {
        return await this.ordersService.getOrdersByUserId()
    }

    @Roles("ADMIN")
    @Get(':userId')
    async getOrdersByUserId(@Param('userId') userId: number) {
        return await this.ordersService.getOrdersByUserId(userId);
    }

}

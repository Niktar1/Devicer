import { Body, Controller, Get, NotFoundException, Post, Req, Res, UseGuards } from '@nestjs/common';
import { BasketsService } from './baskets.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { AuthService } from 'src/auth/auth.service';
import { ProductsService } from 'src/products/products.service';

@Public()
@Controller('baskets')
export class BasketsController {
    constructor(
        private basketsService: BasketsService,
        private productsService: ProductsService,
        private authService: AuthService,) { }

    @Post('getProduct')
        async getProduct(@Body() { productId }: { productId: number }) {
            return await this.productsService.getById(productId)
        }

    @Get()
    async getBasket(@Req() req, @Res() res) {
        try {
            const jwtToken = req.cookies.jwtToken;
            const anonymousId = req.cookies.anonymousId;
            console.log("getBasket.jwtToken: " + jwtToken);
            console.log("\ngetBasket.anonymousId: " + anonymousId);

            if (jwtToken) {
                const decoded = await this.authService.verifyJwtToken(jwtToken)
                if (decoded.sub) {
                    console.log("Decoded.sub: " + decoded.sub); // check if decoded token valid .sub is the user id

                    const userBasket = await this.basketsService.getUserBasket(null, decoded.sub);
                    console.log("\n userBasket id:"); //
                    console.log(userBasket.id); //

                    if (!userBasket) {
                        console.log(`creating new Basket for user: ${userBasket.userId}`) //
                        return await this.basketsService.createBasket(decoded.sub);
                    }

                    return userBasket;
                }
            }

            if (anonymousId) {
                console.log("anonymousId:"); //
                console.log(anonymousId); //
                return await this.basketsService.getUserBasket(anonymousId)
            }

            const anonumousBasketawait = this.basketsService.createBasket() // anonymous
            res.cookie('anonymousId', (await anonumousBasketawait).anonymousId, { httpOnly: true, maxAge: 36000000 }).redirect('http://localhost:3001')
            return anonumousBasketawait;

        } catch (e) {
            throw new Error('Unable to retrieve or create basket: ' + e.message);
        }
    }


    @Get('basketProducts')
    async getBasketProducts(@Req() req) {
        const jwtToken = req.cookies.jwtToken;
        const anonymousId = req.cookies.anonymousId;

        if (jwtToken) {
            const decoded = await this.authService.verifyJwtToken(jwtToken)
            if (decoded.sub) {
                const userBasket = await this.basketsService.getUserBasket(null, decoded.sub);
                return await this.basketsService.getBasketProducts(userBasket.id)
            }
        }

        if (anonymousId) {
            const userBasket = await this.basketsService.getUserBasket(anonymousId)
            const BasketProducts = await this.basketsService.getBasketProducts(userBasket.id)
            console.log("\n\n\n");
            console.log(BasketProducts);
            return BasketProducts;
        }
    }


    @Post('addproduct')
    async addProduct(@Req() req, @Body() { productId }: { productId: number }) {
        const jwtToken = req.cookies.jwtToken;
        const anonymousId = req.cookies.anonymousId;
        console.log("addproduct.jwtToken: " + jwtToken);
        console.log("addproduct.anonymousId: " + anonymousId);

        if (jwtToken) {
            const decoded = await this.authService.verifyJwtToken(jwtToken)
            if (decoded.sub) {
                const userBasket = await this.basketsService.getUserBasket(null, decoded.sub);
                return await this.basketsService.addToBasket(productId, userBasket.id)
            }
        }

        if (anonymousId) {
            const userBasket = await this.basketsService.getUserBasket(anonymousId);
            return await this.basketsService.addToBasket(productId, userBasket.id)
        }
    }

    @Post('removeProduct')
    async removeProduct(@Req() req, @Body() { productId }: { productId: number }) {
        const jwtToken = req.cookies.jwtToken;
        const anonymousId = req.cookies.anonymousId;

        if (jwtToken) {
            const decoded = await this.authService.verifyJwtToken(jwtToken)
            if (decoded.sub) {
                const userBasket = await this.basketsService.getUserBasket(null, decoded.sub);
                return await this.basketsService.removeProduct(productId, userBasket.id);
            }
        }

        if (anonymousId) {
            console.log(':::');
            console.log(anonymousId);
            const userBasket = await this.basketsService.getUserBasket(anonymousId);
            console.log("anonumous Basket\n");
            console.log(userBasket);
            return await this.basketsService.removeProduct(productId, userBasket.id)
        }


    }

}

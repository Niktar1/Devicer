import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Basket } from './baskets.model';
import { BasketProducts } from './basket-products';
import { BasketProductDto } from './dto/basket-product.dto';

@Injectable()
export class BasketsService {
    constructor(
        @InjectModel(Basket) private basketRepository: typeof Basket,
        @InjectModel(BasketProducts) private basketProductsRepo: typeof BasketProducts
    ) { }

    async getUserBasket(anonymousId?: string, userId?: number) {

        if (userId) {
            const userBasket = await this.basketRepository.findOne({ where: { userId: userId } })
            return userBasket;
        }
        if (!userId && anonymousId) {
            console.log(`getUserBasket.AnonymousId: ${anonymousId}`);
            return await this.basketRepository.findOne({ where: { anonymousId: anonymousId } })
        }
        if (!userId && !anonymousId) throw new NotFoundException("No basket Id was provided")
    }

    async createBasket(userId?: number, rewriteId?: number) {
        if (rewriteId && userId) {
            return await this.basketRepository.create({ userId: rewriteId })
        }

        if (userId) {
            return await this.basketRepository.create({ userId })
        }

        if (!userId) console.log("createBasket NO userId");
        return await this.basketRepository.create()
    }

    async addToBasket(productId: number, basketId: number) {
        const existingProduct = await this.basketProductsRepo.findOne({ where: { productId: productId, basketId: basketId }, });
        if (!existingProduct) {
            const dto: BasketProductDto = { basketId, productId };
            return await this.basketProductsRepo.create(dto)
        }
        throw new ConflictException(
            `The product with ID ${productId} already exists in the basket.`,
        );
    }

    async removeProduct(productId: number, basketId: number) {
        const existingProduct = await this.basketProductsRepo.findOne({ where: { productId: productId }, });
        console.log(':::');
        console.log(existingProduct);
        if (existingProduct) {
            return await this.basketProductsRepo.destroy({ where: { productId: productId, basketId: basketId } })
        }
        throw new ConflictException(`No product with ID ${productId} in the basket. `);
    }


    async getBasketProducts(basketId: number) {
        return await this.basketProductsRepo.findAll({ where: { basketId: basketId } })
    }

    async combineBaskets(userId: number, anonymousId: number) {
        const anonymousBasket = await this.basketRepository.findOne({ where: { anonymousId: anonymousId } })
        const anonymousBasketProducts = await this.basketProductsRepo.findAll({ where: { basketId: anonymousBasket.id } })
        const userBasket = await this.basketRepository.findOne({ where: { userId: userId } })

        anonymousBasketProducts.forEach((basket_product) => {
            basket_product.basketId = userBasket.id
            basket_product.save()
        })




        // return await this.basketProductsRepo.findAll({ where: { basketId: basketId } })
    }
}

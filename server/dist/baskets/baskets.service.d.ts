import { Basket } from './baskets.model';
import { BasketProducts } from './basket-products';
export declare class BasketsService {
    private basketRepository;
    private basketProductsRepo;
    constructor(basketRepository: typeof Basket, basketProductsRepo: typeof BasketProducts);
    getUserBasket(anonymousId?: string, userId?: number): Promise<Basket>;
    createBasket(userId?: number, rewriteId?: number): Promise<Basket>;
    addToBasket(productId: number, basketId: number): Promise<BasketProducts>;
    removeProduct(productId: number, basketId: number): Promise<number>;
    getBasketProducts(basketId: number): Promise<BasketProducts[]>;
    combineBaskets(userId: number, anonymousId: number): Promise<void>;
}

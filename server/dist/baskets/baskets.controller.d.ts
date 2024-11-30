import { BasketsService } from './baskets.service';
import { AuthService } from 'src/auth/auth.service';
import { ProductsService } from 'src/products/products.service';
export declare class BasketsController {
    private basketsService;
    private productsService;
    private authService;
    constructor(basketsService: BasketsService, productsService: ProductsService, authService: AuthService);
    getProduct({ productId }: {
        productId: number;
    }): Promise<import("../products/products.model").Product>;
    getBasket(req: any, res: any): Promise<void | import("./baskets.model").Basket>;
    getBasketProducts(req: any): Promise<import("./basket-products").BasketProducts[]>;
    addProduct(req: any, { productId }: {
        productId: number;
    }): Promise<import("./basket-products").BasketProducts>;
    removeProduct(req: any, { productId }: {
        productId: number;
    }): Promise<number>;
}

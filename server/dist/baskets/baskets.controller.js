"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasketsController = void 0;
const common_1 = require("@nestjs/common");
const baskets_service_1 = require("./baskets.service");
const public_decorator_1 = require("../auth/decorators/public.decorator");
const auth_service_1 = require("../auth/auth.service");
const products_service_1 = require("../products/products.service");
let BasketsController = class BasketsController {
    constructor(basketsService, productsService, authService) {
        this.basketsService = basketsService;
        this.productsService = productsService;
        this.authService = authService;
    }
    async getProduct({ productId }) {
        return await this.productsService.getById(productId);
    }
    async getBasket(req, res) {
        try {
            const jwtToken = req.cookies.jwtToken;
            const anonymousId = req.cookies.anonymousId;
            console.log("getBasket.jwtToken: " + jwtToken);
            console.log("\ngetBasket.anonymousId: " + anonymousId);
            if (jwtToken) {
                const decoded = await this.authService.verifyJwtToken(jwtToken);
                if (decoded.sub) {
                    console.log("Decoded.sub: " + decoded.sub);
                    const userBasket = await this.basketsService.getUserBasket(null, decoded.sub);
                    console.log("\n userBasket id:");
                    console.log(userBasket.id);
                    if (!userBasket) {
                        console.log(`creating new Basket for user: ${userBasket.userId}`);
                        return await this.basketsService.createBasket(decoded.sub);
                    }
                    return userBasket;
                }
            }
            if (anonymousId) {
                console.log("anonymousId:");
                console.log(anonymousId);
                return await this.basketsService.getUserBasket(anonymousId);
            }
            const anonumousBasketawait = this.basketsService.createBasket();
            res.cookie('anonymousId', (await anonumousBasketawait).anonymousId, { httpOnly: true, maxAge: 36000000 }).redirect('http://localhost:3001');
            return anonumousBasketawait;
        }
        catch (e) {
            throw new Error('Unable to retrieve or create basket: ' + e.message);
        }
    }
    async getBasketProducts(req) {
        const jwtToken = req.cookies.jwtToken;
        const anonymousId = req.cookies.anonymousId;
        if (jwtToken) {
            const decoded = await this.authService.verifyJwtToken(jwtToken);
            if (decoded.sub) {
                const userBasket = await this.basketsService.getUserBasket(null, decoded.sub);
                return await this.basketsService.getBasketProducts(userBasket.id);
            }
        }
        if (anonymousId) {
            const userBasket = await this.basketsService.getUserBasket(anonymousId);
            const BasketProducts = await this.basketsService.getBasketProducts(userBasket.id);
            console.log("\n\n\n");
            console.log(BasketProducts);
            return BasketProducts;
        }
    }
    async addProduct(req, { productId }) {
        const jwtToken = req.cookies.jwtToken;
        const anonymousId = req.cookies.anonymousId;
        console.log("addproduct.jwtToken: " + jwtToken);
        console.log("addproduct.anonymousId: " + anonymousId);
        if (jwtToken) {
            const decoded = await this.authService.verifyJwtToken(jwtToken);
            if (decoded.sub) {
                const userBasket = await this.basketsService.getUserBasket(null, decoded.sub);
                return await this.basketsService.addToBasket(productId, userBasket.id);
            }
        }
        if (anonymousId) {
            const userBasket = await this.basketsService.getUserBasket(anonymousId);
            return await this.basketsService.addToBasket(productId, userBasket.id);
        }
    }
    async removeProduct(req, { productId }) {
        const jwtToken = req.cookies.jwtToken;
        const anonymousId = req.cookies.anonymousId;
        if (jwtToken) {
            const decoded = await this.authService.verifyJwtToken(jwtToken);
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
            return await this.basketsService.removeProduct(productId, userBasket.id);
        }
    }
};
exports.BasketsController = BasketsController;
__decorate([
    (0, common_1.Post)('getProduct'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BasketsController.prototype, "getProduct", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BasketsController.prototype, "getBasket", null);
__decorate([
    (0, common_1.Get)('basketProducts'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BasketsController.prototype, "getBasketProducts", null);
__decorate([
    (0, common_1.Post)('addproduct'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BasketsController.prototype, "addProduct", null);
__decorate([
    (0, common_1.Post)('removeProduct'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BasketsController.prototype, "removeProduct", null);
exports.BasketsController = BasketsController = __decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Controller)('baskets'),
    __metadata("design:paramtypes", [baskets_service_1.BasketsService,
        products_service_1.ProductsService,
        auth_service_1.AuthService])
], BasketsController);
//# sourceMappingURL=baskets.controller.js.map
import { Rating } from './ratings.model';
import { AddRatingDto } from './dto/add-rating.dto';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
export declare class RatingsService {
    private ratingsRepository;
    private productService;
    private userService;
    constructor(ratingsRepository: typeof Rating, productService: ProductsService, userService: UsersService);
    addRating(dto: AddRatingDto): Promise<Rating>;
    getProductRatings(productId: number): Promise<Rating[]>;
    getUserRatings(userId: number): Promise<Rating[]>;
}

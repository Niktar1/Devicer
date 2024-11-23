import { RatingsService } from './ratings.service';
import { AddRatingDto } from './dto/add-rating.dto';
export declare class RatingsController {
    private ratingsService;
    constructor(ratingsService: RatingsService);
    getProductRatings(productId: number): Promise<{
        averageRating: number;
    }>;
    getProductReview(productId: number): Promise<import("./ratings.model").Rating[]>;
    getUserRatings(userId: number): Promise<import("./ratings.model").Rating[]>;
    addRating(dto: AddRatingDto): Promise<import("./ratings.model").Rating>;
}

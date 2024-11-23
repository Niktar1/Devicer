import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { AddRatingDto } from './dto/add-rating.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Public()
@Controller('ratings')
export class RatingsController {
    constructor(private ratingsService: RatingsService) { }

    @Get('product-ratings/:id')
    async getProductRatings(@Param('id') productId: number) {
        const ProductRatings = await this.ratingsService.getProductRatings(productId)
        let totalRatings = 0;
        let numberOfRatings = 0;
        ProductRatings.forEach(item => {
            totalRatings += item.dataValues.rating;
            numberOfRatings++;
        });

        let averageRating = numberOfRatings > 0 ? totalRatings / numberOfRatings : 0;
        return { averageRating };
    }

    @Get('product-reviews/:id')
    async getProductReview(@Param('id') productId: number) {
        return await this.ratingsService.getProductRatings(productId)
    }

    @Get('user-ratings/:id')
    async getUserRatings(@Param('id') userId: number) {
        return await this.ratingsService.getUserRatings(userId)
    }

    @Post()
    addRating(@Body() dto: AddRatingDto) {
        return this.ratingsService.addRating(dto)
    }
}

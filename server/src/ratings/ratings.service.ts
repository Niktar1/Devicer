import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Rating } from './ratings.model';
import { AddRatingDto } from './dto/add-rating.dto';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RatingsService {
    constructor(
        @InjectModel(Rating) private ratingsRepository: typeof Rating,
        private productService: ProductsService,
        private userService: UsersService) { }

    async addRating(dto: AddRatingDto) {
        const user = await this.userService.findOne(dto.userId)
        const product = await this.productService.getById(dto.productId)
        if (!user) throw new NotFoundException("User not found")
        if (!product) throw new NotFoundException("Product not found")

        const existingRating = await this.ratingsRepository.findOne({ where: { userId: dto.userId, productId: dto.productId } })
        if (existingRating) {
            //if already rated then rewrites it with new rating 
            existingRating.rating = dto.rating
            existingRating.review = dto.review || null;
            await existingRating.save();
            return existingRating;
        }
        return await this.ratingsRepository.create(dto);
    }

    async getProductRatings(productId: number) {
        return await this.ratingsRepository.findAll({ where: { productId } })
    }

    async getUserRatings(userId: number) {
        return await this.ratingsRepository.findAll({ where: { userId } })
    }
}

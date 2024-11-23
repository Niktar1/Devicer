import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) { }

    @Get()
    getAll() {
        return this.categoriesService.getAll();
    }

    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.categoriesService.getCategoryByValue(value);
    }

    @Roles("ADMIN")
    @Post()
    create(@Body() dto: CreateCategoryDto) {
        return this.categoriesService.create(dto)
    }

    @Roles("ADMIN")
    @Delete('/:value')
    delete(@Param('value') value: string) {
        return this.categoriesService.delete(value);
    }

}

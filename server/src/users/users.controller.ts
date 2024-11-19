import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Public()
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    @Get('profile')
    getProfile(@Req() req) {
        return this.usersService.findOne(req.user.id)
    }

    
    @Roles("ADMIN")
    @Get()
    async getAll() {
        return this.usersService.getAllUsers();
    }

}

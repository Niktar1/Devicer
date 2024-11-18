import { Body, Controller, Get, Post, Req, Res, Session, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Req() req) {
        return this.usersService.findOne(req.user.id)
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll() {
        return this.usersService.getAllUsers();
    }
}

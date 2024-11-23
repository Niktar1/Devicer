import { Body, Controller, Delete, Get, Param, Post, Req, UsePipes } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Public } from 'src/auth/decorators/public.decorator';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

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

    
    // Admin panel
    
    @Roles("ADMIN")
    @Get()
    async getAll() {
        return this.usersService.getBannedUsers();
    }

    @Roles("ADMIN")
    @Delete(':id')
    deleteUser(@Param('id') userId: number) {
        return this.usersService.deleteUser(userId)
    }

    @Roles("ADMIN")
    @Post('role')
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }

    @Roles("ADMIN")
    @Post('ban')
    ban(@Body() dto: BanUserDto) {
        return this.usersService.ban(dto);
    }

}

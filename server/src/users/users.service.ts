import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
        private roleService: RolesService) { }

    async updateHashedRefreshToken(userId: number, hashedRefreshToken: string) {
        return await this.userRepository.update(
            { hashedRefreshToken },
            {
                where: { id: userId },
                returning: true     // this will return the updated rows
            }
        );
    }

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto)
        const role = await this.roleService.getRoleByValue("USER")
        await user.$set('roles', [role.id])
        return user;
    }

    async deleteUser(userId: number) {
        return this.userRepository.destroy({ where: { id: userId } })
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && user) {
            await user.$add('role', role.id);
            return dto;
        }
        throw new NotFoundException("User or Role not found")
    }

    async ban(dto: BanUserDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        if (!user) {
            throw new NotFoundException("User not found")
        }
        user.banned = true;
        await user.save();
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({ include: { all: true } });
        return users;
    }

    async findByEmail(email: string) {
        return await this.userRepository.findOne({
            where: {
                email,
            }
        })
    }

    async findOne(id: number) {
        const user = this.userRepository.findOne({
            where: { id },
            attributes: ['email', 'id', 'hashedRefreshToken'],
            // tweak include to return maybe only roles and not user-roles table
            include: { all: true }
        });
        return user;
    }

}

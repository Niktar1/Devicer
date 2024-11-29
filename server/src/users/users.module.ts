import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { BannedUser } from './banned-users.model';
import { Rating } from 'src/ratings/ratings.model';
import { Basket } from 'src/baskets/baskets.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, BannedUser, Rating, Basket]),
    RolesModule,
  ],
  exports: [UsersService]
})
export class UsersModule { }

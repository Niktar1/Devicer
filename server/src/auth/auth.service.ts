import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { UserDetails } from 'src/utils/types';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User) private readonly userRepository: typeof User) { }

  async validateUser(details: UserDetails) {
    console.log('AuthService')
    console.log(details)
    const user = await this.userRepository.findOne({ where: { email: details.email } })
    if (user) {
      // handle updating the user.  yt video 55 minues time stamp 

      return user; // then return the new user
    }
    const newUser = this.userRepository.create(details);
    (await newUser).save();
    return newUser
  }

  async findUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id } })
    return user;
  }

}

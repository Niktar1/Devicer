import { Injectable } from '@nestjs/common';
import { UserDetails } from 'src/utils/types';

@Injectable()
export class AuthService {

  validateUser(detail: UserDetails) {
    
    return '';
  }

}

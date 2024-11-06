import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './utils/Guards';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    // constructor(private authService: AuthService){}

    @Get('/login')
    login() {
        return { msg: '/login msg' };
    }

    // Passport
    @Get('/logout')
    logout() {
        return { msg: '/logout msg' };
    }

    // Passport
    @Get('/google')
    @UseGuards(GoogleAuthGuard)
    logGoogle() {
        return { msg: '/google msg' };
    }

    @Get('/google/redirect')
    @UseGuards(GoogleAuthGuard)
    redirect() {
        return { msg: 'ok' }
    }

    @Get('status')
    user(@Req() request: Request) {
        console.log(request.user)
        if (request.user) {
            return { msg: 'Authenticated' }
        } else {
            return { msg: 'Not Authenticated' }
        }
    }
}

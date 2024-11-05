import { Controller, Get, UseGuards } from '@nestjs/common';
// import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './utils/Guards';

@Controller('auth')
export class AuthController {
    // constructor(private authService: AuthService){}

    @Get('/login')
    login() {
        return {msg: '/login msg'};
    }

    // Passport
    @Get('/logout')
    logout() {
        return {msg: '/logout msg'};
    }

    // Passport
    @Get('/google')
    @UseGuards(GoogleAuthGuard)
    logGoogle() {
        return {msg: '/google msg'};
    }

    @Get('/google/redirect')
    @UseGuards(GoogleAuthGuard) 
    redirect() {
        return {msg: 'ok'}
    }

}

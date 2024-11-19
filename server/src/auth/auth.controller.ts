import { Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { Public } from './decorators/public.decorator';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Req() req) {
    return this.authService.login(req.user.id)
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get("google/login")
  googleLogin() {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get("google/cb")
  async googleCallback(@Req() req, @Res() res) {
    const response = await this.authService.login(req.user.id)
    res.redirect(`http://localhost:3001?token=${response.accesToken}`)
  }
  

  @UseGuards(RefreshAuthGuard)
  @Post("refresh")
  refreshToken(@Req() req) {
    return this.authService.refreshToken(req.user.id)
  }

  @UseGuards(JwtAuthGuard)
  @Post("logout")
  logOut(@Req() req) {
    this.authService.logOut(req.user.id);
  }
}

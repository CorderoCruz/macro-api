import { Body, Controller, HttpCode, HttpStatus, Post, Get, Headers, Response } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { IncomingHttpHeaders } from "http";

@Controller("api/v1/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Get("validate")
  validateToken(@Headers() headers: IncomingHttpHeaders) {
    return this.authService.validateToken(headers.authorization);
  }

  @Post("login")
  signIn(@Body() credentials: { email: string; password: string; rememberMe: boolean }) {
    console.log(credentials);
    return this.authService.signIn(credentials.email, credentials.password, credentials.rememberMe);
  }

  @Post("signup")
  signUp(@Body() credentials: { email: string; username: string; pass: string; passConfirm: string }) {
    return this.authService.signUp({ ...credentials });
  }
}

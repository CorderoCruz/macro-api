import { HttpException, HttpStatus, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/schemas/user.schema";
import { UserService } from "src/user/user.service";

type Payload = {
  email: string;
  username: string;
  iat?: number;
  exp?: number;
};

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateToken(authorization: string) {
    try {
      const token: string = authorization.split(" ")[1];
      if (token === "null") return false;
      const response = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_CONSTANT });

      if (!response) return { access: false };

      const { email, username } = response as Payload;

      const payload: Payload = { username, email };
      const signedToken: string = await this.jwtService.signAsync(payload, { secret: process.env.JWT_CONSTANT });
      return {
        access: true,
        user: {
          email,
          username,
        },
        access_token: signedToken,
      };
    } catch (err) {
      return { access: false };
    }
  }

  async signIn(email: string, password: string, rememberMe: boolean): Promise<any> {
    try {
      if (!email || !password) throw this.throwError(HttpStatus.BAD_REQUEST, "Missing input field(s)");

      const user: User = await this.userService.findUser(email);
      if (!user) throw this.throwError(HttpStatus.NOT_FOUND, "User with that email was not found!");

      if (user.password !== password) return new UnauthorizedException();

      const payload = { username: user.username, email: user.email };
      return {
        user: {
          username: user.username,
          email: user.email,
        },
        access_token: await this.jwtService.signAsync(payload, { secret: process.env.JWT_CONSTANT }),
      };
    } catch (err) {
      return err;
    }
  }

  async signUp(credentials: { email: string; username: string; pass: string; passConfirm: string }) {
    try {
      const user: User = await this.userService.findUser(credentials.email);

      const payload = { email: credentials.email, username: credentials.username };

      return {
        user,
      };

      return {};
    } catch (err) {
      //return exeption
      return err;
    }
  }

  private throwError(status: HttpStatus, message?: string) {
    return new HttpException({ status, message, error: true }, status);
  }
}

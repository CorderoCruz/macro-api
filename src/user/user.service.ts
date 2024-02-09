import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schemas/user.schema";

@Injectable()
export class UserService {
  constructor(@InjectModel("User") private readonly userModel: Model<User>) {}

  async findUser(email: string): Promise<any | undefined> {
    try {
      const user = this.userModel.findOne({ email: email });
      if (!user) {
        throw new HttpException({ status: HttpStatus.NOT_FOUND, error: "Email not found" }, HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (err) {
      return err;
    }
  }

  async createUser(body: { email: string; username; password: string }) {
    try {
      const newUser = await this.userModel.create({ ...body });
      return { username: newUser.username, email: newUser.email };
    } catch (err) {
      return err;
    }
  }
}

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { WeightModule } from "./weight/weight.module";
import { AppController } from "./app.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    AppController,
    WeightModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
  ],
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { WeightModule } from "./weight/weight.module";
import { AppController } from "./app.controller";

@Module({
  providers: [AppController],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    WeightModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
  ],
})
export class AppModule {}

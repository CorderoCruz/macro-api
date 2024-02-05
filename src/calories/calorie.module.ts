import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Calorie, CalorieSchema } from "src/schemas/calories.schema";
import { CalorieService } from "./calorie.service";
import { CalorieController } from "./calorie.controller";

@Module({
  imports: [MongooseModule.forFeature([{ name: Calorie.name, schema: CalorieSchema }])],
  providers: [CalorieService],
  controllers: [CalorieController],
})
export class CalorieModule {}

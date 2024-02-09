import { Module } from "@nestjs/common";
import { MacroService } from "./macro.service";
import { MacroController } from "./macro.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Calorie } from "src/schemas/calories.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Calorie", schema: Calorie }])],
  providers: [MacroService],
  controllers: [MacroController],
})
export class MacroModule {}

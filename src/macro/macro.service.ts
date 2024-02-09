import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CalorieSchema } from "src/schemas/calories.schema";
import { Macros } from "src/schemas/macros.schema";

@Injectable()
export class MacroService {
  constructor(@InjectModel(CalorieSchema.name) private calorieModel: Model<CalorieSchema>) {}

  async getMacrosForWeek(weekNumber: number) {}

  async createMacrosForWeek() {}
}

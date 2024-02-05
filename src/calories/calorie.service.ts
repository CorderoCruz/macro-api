import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Calorie } from "src/schemas/calories.schema";

@Injectable()
export class CalorieService {
  constructor(@InjectModel(Calorie.name) private calorieModel: Model<Calorie>) {}

  async getMacrosForWeek(weekNumber: number) {
    const latestWeek = await this.calorieModel.findOne({}, {}, { sort: { created_at: -1 } });

    if (!latestWeek) return { status: 404, error: "Have yet to start a week", message: "Have yet to start a week" };
    return latestWeek;
  }

  async createMacrosForWeek(weeklyCalories: number, startDate: string) {
    const mode = await this.calorieModel.findOne({}, {}, { sort: { created_at: -1 } });
    console.log(mode);

    let newDoc;

    if (!mode) {
      newDoc = await this.calorieModel.create({ weekNumber: 1, weeklyCalories, caloriesLeft: weeklyCalories, weekStartDate: startDate });
    }

    return newDoc;
  }
}

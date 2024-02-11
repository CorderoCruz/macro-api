import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Document, Types } from "mongoose";
import { Calorie } from "src/schemas/calories.schema";

export type MongooseDocument<T> = Document<unknown, {}, T> &
  T & {
    _id: Types.ObjectId;
  };

@Injectable()
export class CalorieService {
  constructor(@InjectModel(Calorie.name) private calorieModel: Model<Calorie>) {}

  async getMacrosForWeek(weekNumber: number) {
    let latestWeek: MongooseDocument<Calorie>;
    if (weekNumber) {
      latestWeek = await this.calorieModel.findOne({ weekNumber: weekNumber });
    }
    latestWeek = await this.calorieModel.findOne({}, {}, { sort: { created_at: -1 } });

    if (!latestWeek) return { status: 404, error: "Have yet to start a week", message: "Have yet to start a week" };
    return latestWeek;
  }

  async createMacrosForWeek(weeklyCalories: number, startDate: string) {
    const mode: MongooseDocument<Calorie> = await this.calorieModel.findOne(undefined, undefined, { sort: { created_at: -1 } });

    let newDoc;

    if (!mode) {
      newDoc = await this.calorieModel.create({ weekNumber: 1, weeklyCalories, caloriesLeft: weeklyCalories, weekStartDate: startDate });
    }

    return newDoc;
  }
}

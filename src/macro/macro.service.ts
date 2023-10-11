import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Macros } from "src/schemas/macros.schema";

@Injectable()
export class MacroService {
  constructor(@InjectModel(Macros.name) private macrosModel: mongoose.Model<Macros>) {}

  async getMacrosByDate(date: string) {
    try {
      const macros = await this.macrosModel.findOne({
        date: date,
      });

      if (!macros) return;
      return { status: 200, data: macros, message: "Successfully found macros" };
    } catch (err: any) {
      return { status: err.status, message: err.message };
    }
  }

  async createMacros(macros: Macros) {
    try {
      const macrosExist = await this.macrosModel.findOne({ date: macros.date });

      if (macrosExist) throw Error("Macros already exist");

      await this.macrosModel.create(macros);

      return { status: 200, message: "Successfully created macros" };
    } catch (err: any) {
      return { message: err.message, status: err.status };
    }
  }

  async updateMacros(macros: Macros) {
    try {
      const existingMacros = await this.macrosModel.findOne({ date: macros.date });

      if (!existingMacros) {
        return this.createMacros(macros);
      }

      const { fat, carbs, protein, calories }: Macros = existingMacros;

      const newCalories: number = calories + existingMacros.calories;
      const newFat: number = fat + existingMacros.fat;
      const newCarbs: number = carbs + existingMacros.carbs;
      const newProtein: number = protein + existingMacros.protein;

      const newDoc = await this.macrosModel.findOneAndUpdate(
        { date: macros.date },
        {
          calories: newCalories,
          fat: newFat,
          carbs: newCarbs,
          protein: newProtein,
        },
        { new: true }
      );
      return { status: 200, data: newDoc, message: "Successfully updated macros" };
    } catch (err) {
      return err;
    }
  }
}

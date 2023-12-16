import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Entry } from "src/schemas/entry.schema";
import { Weight } from "src/schemas/weight.schema";

@Injectable()
export class WeightService {
  constructor(@InjectModel(Weight.name) private weightModel: Model<Entry>) {}

  public async getWeight() {
    const entries = await this.weightModel.find();
    return entries;
  }

  public async addWeight(date: string, weight: string) {
    try {
      const weightToday = await this.weightModel.findOne({ date });

      if (weightToday) return { status: 409, message: "Already added weight for today!" };

      const weightRes = await this.weightModel.create({ date, weight });

      return { status: 200, data: { weightRes }, message: "Weight successfully created" };
    } catch (err) {
      return { status: err.status, message: err.message || "Was not able to create entry" };
    }
  }
}

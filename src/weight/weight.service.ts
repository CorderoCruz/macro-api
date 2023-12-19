import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Weight } from "src/schemas/weight.schema";

@Injectable()
export class WeightService {
  constructor(@InjectModel(Weight.name) private weightModel: Model<Weight>) {}

  public async getWeight(limit: string) {
    const entries = await this.weightModel.find().sort({ _id: -1 }).limit(+limit);
    return entries;
  }

  public async addWeight(date: string, weight: string) {
    try {
      const weightRes = await this.weightModel.create({ date, weight });

      return { status: 200, data: { weight: weightRes.weight, date: weightRes.date }, message: "Weight successfully created" };
    } catch (err) {
      return { status: err.status, message: err.message || "Was not able to create entry" };
    }
  }

  public async updateWeight(date: string, weight: string) {
    try {
      const weightFind = await this.weightModel.findOneAndUpdate({ date: date }, { date: date, weight: weight }, { new: true });

      return { status: 200, data: { weight: weightFind.weight, date: weightFind.date }, message: "Weight was updated" };
    } catch (err) {
      return { status: err.status, message: err.message || "Was not able to create entry" };
    }
  }
}

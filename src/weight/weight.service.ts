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

  public async addWeight(date: string, lbs: number) {
    try {
      const weightRes = await this.weightModel.create({ date, lbs });

      return { status: 200, data: { lbs: weightRes.lbs, date: weightRes.date }, message: "Weight successfully created" };
    } catch (err) {
      return { status: err.status, message: err.message || "Was not able to create entry" };
    }
  }

  public async updateWeight(date: string, weight: string) {
    try {
      const weightFind = await this.weightModel.findOneAndUpdate({ date: date }, { date: date, weight: weight }, { new: true });

      return { status: 200, data: { lbs: weightFind.lbs, date: weightFind.date }, message: "Weight was updated" };
    } catch (err) {
      return { status: err.status, message: err.message || "Was not able to update entry" };
    }
  }

  public async deleteWeight(date: string) {
    try {
      const weightFind = await this.weightModel.findOneAndDelete({ date });
      return { status: 200, data: { lbs: weightFind.lbs, date: weightFind.date }, message: "Weight has been deleted" };
    } catch (err) {
      return { status: err.status, message: err.message || "Was not able to delete entry" };
    }
  }
}

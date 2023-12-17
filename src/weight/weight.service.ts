import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Weight } from "src/schemas/weight.schema";

@Injectable()
export class WeightService {
  constructor(@InjectModel(Weight.name) private weightModel: Model<Weight>) {}

  public async getWeight() {
    const entries = await this.weightModel.find();
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
}

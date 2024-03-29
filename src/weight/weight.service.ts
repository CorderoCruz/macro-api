import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
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
    const existingWeight = await this.weightModel.findOne({ date });
    if (existingWeight) {
      throw new ConflictException("Weight for this date already exists. Please delete existing weight and try again.");
    }

    const weightRes = await this.weightModel.create({ date, lbs });
    return { data: { lbs: weightRes.lbs, date: weightRes.date }, message: "Weight successfully created" };
  }

  public async updateWeight(date: string, weight: string) {
    const weightFind = await this.weightModel.findOneAndUpdate({ date: date }, { date: date, weight: weight }, { new: true });

    return { data: { lbs: weightFind.lbs, date: weightFind.date }, message: "Weight was updated" };
  }

  public async deleteWeight(date: string) {
    const weightFind = await this.weightModel.findOneAndDelete({ date });
    if (!weightFind) {
      throw new NotFoundException("Weight not found");
    }
    return { status: 200, data: { lbs: weightFind.lbs, date: weightFind.date }, message: "Weight has been deleted" };
  }
}

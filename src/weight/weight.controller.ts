import { Body, Controller, Delete, Get, Headers, Post, Put } from "@nestjs/common";
import { WeightService } from "./weight.service";

@Controller("api/v1/weight")
export class WeightController {
  constructor(private weightService: WeightService) {}
  @Get()
  public getWeight(@Headers() headers) {
    return this.weightService.getWeight(headers.limit);
  }

  @Post()
  public addWeight(@Body() weigthInfo) {
    const { date, lbs } = weigthInfo;
    return this.weightService.addWeight(date, lbs);
  }

  @Put()
  public editWeight(@Body() weightInfo) {
    const { date, weight } = weightInfo;
    return this.weightService.updateWeight(date, weight);
  }

  @Delete()
  public deleteWeight(@Body() { date }: { date: string }) {
    try {
      return this.weightService.deleteWeight(date);
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}

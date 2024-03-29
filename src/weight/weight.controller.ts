import { Body, Controller, Delete, Get, Headers, Post, Put } from "@nestjs/common";
import { WeightService } from "./weight.service";

@Controller("api/v1/weight")
export class WeightController {
  constructor(private weightService: WeightService) {}
  @Get()
  public getWeight(@Headers() headers) {
    try {
      return this.weightService.getWeight(headers.limit);
    } catch (e) {
      return e;
    }
  }

  @Post()
  public addWeight(@Body() weigthInfo) {
    try {
      const { date, lbs } = weigthInfo;
      return this.weightService.addWeight(date, lbs);
    } catch (e: unknown) {
      return e;
    }
  }

  @Put()
  public editWeight(@Body() weightInfo) {
    try {
      const { date, weight } = weightInfo;
      return this.weightService.updateWeight(date, weight);
    } catch (e: unknown) {
      return e;
    }
  }

  @Delete()
  public deleteWeight(@Body() { date }: { date: string }) {
    try {
      return this.weightService.deleteWeight(date);
    } catch (e: unknown) {
      return e;
    }
  }
}

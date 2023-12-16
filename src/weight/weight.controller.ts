import { Body, Controller, Get, Post } from "@nestjs/common";
import { WeightService } from "./weight.service";

@Controller("api/v1/weight")
export class WeightController {
  constructor(private weightService: WeightService) {}
  @Get()
  public getWeight() {
    return this.weightService.getWeight();
  }

  @Post()
  public addWeight(@Body() weigthInfo) {
    const { date, weight } = weigthInfo;
    return this.weightService.addWeight(date, weight);
  }
}

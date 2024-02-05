import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CalorieService } from "./calorie.service";

@Controller("api/v1/calories")
export class CalorieController {
  constructor(private calorieService: CalorieService) {}

  @Get(":weekNumber")
  async getMacrosForWeek(@Param() { weekNumber }: { weekNumber: number }) {
    return this.calorieService.getMacrosForWeek(weekNumber);
  }

  @Post("start")
  async createMacrosForWeek(@Body() body: { weeklyCalories: number; startDate: string }) {
    return this.calorieService.createMacrosForWeek(body.weeklyCalories, body.startDate);
  }
}

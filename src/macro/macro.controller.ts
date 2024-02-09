import { Controller, Get, Param } from "@nestjs/common";
import { MacroService } from "./macro.service";

@Controller("api/v1/macros")
export class MacroController {
  constructor(private macroService: MacroService) {}

  @Get("calories/:weekNumber")
  async getMacrosForWeek(@Param() { weekNumber }: { weekNumber: number }) {
    return this.macroService.getMacrosForWeek(weekNumber);
  }
}

import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { Macros } from "src/schemas/macros.schema";
import { MacroService } from "./macro.service";

@Controller("api/v1/macros")
export class MacroController {
  constructor(private macroService: MacroService) {}

  @Get("/date")
  async getMacrosByDate(@Query("date") date: string) {
    return this.macroService.getMacrosByDate(date);
  }

  @Post()
  async createMacros(@Body() macros: Macros) {
    return this.macroService.createMacros(macros);
  }

  @Put()
  async updateMacros(@Body() macros: Macros) {
    return this.macroService.updateMacros(macros);
  }
}

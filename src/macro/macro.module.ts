import { Module } from "@nestjs/common";
import { MacroService } from "./macro.service";
import { MacroController } from "./macro.controller";
import { MacroResolver } from "./macro.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import { MacroSchema } from "src/schemas/macros.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Macros", schema: MacroSchema }])],
  providers: [MacroService, MacroResolver],
  controllers: [MacroController],
})
export class MacroModule {}

import { Module } from "@nestjs/common";

import { MongooseModule } from "@nestjs/mongoose";
import { WeightSchema } from "src/schemas/weight.schema";
import { WeightService } from "./weight.service";
import { WeightController } from "./weight.controller";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Weight", schema: WeightSchema }])],
  providers: [WeightService],
  controllers: [WeightController],
})
export class WeightModule {}

import { Module } from "@nestjs/common";
import { EntryService } from "./entry.service";
import { EntryController } from "./entry.controller";
import { EntryResolver } from "./entry.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import { EntrySchema } from "src/schemas/entry.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Entry", schema: EntrySchema }])],
  providers: [EntryService, EntryResolver],
  controllers: [EntryController],
})
export class EntryModule {}

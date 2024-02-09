import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { EntryService } from "./entry.service";
import { Entry } from "src/schemas/entry.schema";

@Controller("api/v1/entry")
export class EntryController {
  constructor(private entryService: EntryService) {}

  @Get()
  async findAllEntries() {
    return this.entryService.findAllEntries();
  }

  @Post("create")
  async createEntry(@Body() entry: Entry): Promise<Entry> {
    return this.entryService.createEntry(entry);
  }

  @Put("edit")
  async editEntry(@Body() entry: Entry): Promise<Entry> {
    return this.entryService.editEntry(entry);
  }

  @Delete("delete")
  async deleteEntry(@Body("name") name: string) {
    return this.entryService.deleteEntry(name);
  }
}

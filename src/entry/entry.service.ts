import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Entry } from "src/schemas/entry.schema";

@Injectable()
export class EntryService {
  constructor(@InjectModel(Entry.name) private entryModel: mongoose.Model<Entry>) {}

  async findAllEntries(): Promise<Entry[]> {
    const entries: Entry[] = await this.entryModel.find();
    return entries;
  }

  async createEntry(entry: Entry): Promise<any> {
    try {
      const entryRes = await this.entryModel.create(entry);
      return { status: 200, data: { entryRes }, message: "Entry successfully created" };
    } catch (err) {
      return err;
    }
  }

  async deleteEntry(name: string): Promise<any> {
    try {
      const entryExists = await this.entryModel.findOne({ name: name });
      if (!entryExists) throw new Error("Entry does not exist");

      await this.entryModel.findOneAndRemove({ name: name });

      return { status: 200, message: "Successfully deleted entry" };
    } catch (err) {
      return err;
    }
  }
}

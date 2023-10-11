import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: false,
})
export class Entry {
  @Prop()
  name: string;

  @Prop()
  calories: number;

  @Prop()
  fat: number;

  @Prop()
  carbs: number;

  @Prop()
  protein: number;

  @Prop()
  servingMeasurement: string;

  @Prop()
  servingSize: number;
}

export const EntrySchema = SchemaFactory.createForClass(Entry);

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: true,
})
export class Macros {
  @Prop()
  date: string;

  @Prop()
  calories: number;

  @Prop()
  fat: number;

  @Prop()
  carbs: number;

  @Prop()
  protein: number;
}

export const MacroSchema = SchemaFactory.createForClass(Macros);

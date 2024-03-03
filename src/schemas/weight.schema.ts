import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: true,
})
export class Weight {
  @Prop()
  date: string;

  @Prop()
  weight: number;
}

export const WeightSchema = SchemaFactory.createForClass(Weight);

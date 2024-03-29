import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: true,
})
export class Weight {
  @Prop({ unique: true })
  date: string;

  @Prop()
  lbs: number;
}

export const WeightSchema = SchemaFactory.createForClass(Weight);

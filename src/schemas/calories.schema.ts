import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: true,
})
export class Calorie {
  @Prop()
  weekNumber: number;

  @Prop()
  weeklyCalories: number;

  @Prop()
  caloriesLeft: number;

  @Prop()
  weekStartDate: string;
}

export const CalorieSchema = SchemaFactory.createForClass(Calorie);

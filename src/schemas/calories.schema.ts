import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: true,
})
export class Calorie {
  @Prop({ unique: true })
  weekNumber: number;

  @Prop()
  weeklyCalories: number;

  @Prop()
  caloriesLeft: number;

  @Prop({ unique: true })
  weekStartDate: string;

  @Prop()
  nextWeek: boolean;
}

export const CalorieSchema = SchemaFactory.createForClass<Calorie>(Calorie);

import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: "entry" })
export class Entry {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  calories: number;

  @Field()
  fat: number;

  @Field()
  carbs: number;

  @Field()
  protein: number;

  @Field()
  servingMeasurement: string;

  @Field()
  servingSize: number;
}

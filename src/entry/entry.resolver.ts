import { Resolver, Query } from "@nestjs/graphql";

@Resolver()
export class EntryResolver {
  @Query(() => String)
  findAllEntries(): string {
    return "Hello";
  }
}

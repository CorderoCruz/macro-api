import { Query, Resolver } from "@nestjs/graphql";

@Resolver()
export class MacroResolver {
  @Query(() => String)
  findMacros(): string {
    return "Hello";
  }
}

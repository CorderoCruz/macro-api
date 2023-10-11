import { ApolloDriver } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import { join } from "path";
import { AuthModule } from "./auth/auth.module";
import { EntryModule } from "./entry/entry.module";
import { MacroModule } from "./macro/macro.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    UserModule,
    MacroModule,
    EntryModule,
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "schema.gql"),
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    UserModule,
  ],
  controllers: [],
})
export class AppModule {}

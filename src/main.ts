import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ["error", "warn", "log"] });
  app.enableCors();
  await app.listen(process.env.PORT, "0.0.0.0", () => {
    console.log("Listening on port " + process.env.PORT || "0.0.0.0");
  });
}
bootstrap();

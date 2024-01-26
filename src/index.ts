import { swagger } from "@Common/docs/swagger";
import { ValidationPipe, Logger } from "@nestjs/common";
import { NestFactory, HttpAdapterHost } from "@nestjs/core";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { config } from "@Common/config/config";
import { AllExceptionsFilter } from "@Common/filters/all-exception.filter";
import { HttpExceptionFilter } from "@Common/filters/http-exception.filter";
import { OrmExceptionFilter } from "@Common/filters/orm-exception.filter";
import { MainModule } from "./modules/main.module";

export const run = async () => {
	const app = await NestFactory.create(MainModule);

	const winstonLogger = app.get(WINSTON_MODULE_NEST_PROVIDER);
	app.useLogger(winstonLogger);
	app.setGlobalPrefix("api");
	app.use(helmet());
	app.use(cookieParser());
	app.enableCors({
		origin: [
			"http://localhost:3000",
			"https://app.some-url.ru",
			"https://app.dev.some-url.ru",
			"https://app.demo.some-url.ru",
		],
		credentials: true,
	});
	app.useGlobalPipes(new ValidationPipe({ transform: true }));

	const adapterHost = app.get(HttpAdapterHost);
	const { httpAdapter } = adapterHost;
	app.useGlobalFilters(
		new AllExceptionsFilter(httpAdapter, winstonLogger),
		new HttpExceptionFilter(winstonLogger),
		new OrmExceptionFilter(winstonLogger),
	);

	await swagger(app);

	app.enableShutdownHooks();

	const port = config.server.port;
	await app.listen(port, () => Logger.log(`App server listening http://localhost:${port}`));
};

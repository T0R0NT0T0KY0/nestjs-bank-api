import { ErrorDto } from "@Common/errors/dto/error.dto";
import { DataResponseDto } from "@Common/responses/data-response.dto";
import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { writeFile } from "fs/promises";
import { join } from "path";
import { config } from "../config/config";
import { version } from "../../../package.json";

export const swagger = async (app: INestApplication) => {
	const swaggerConfig = new DocumentBuilder()
		.setTitle(`322 backend`)
		.setDescription(`API docs`)
		.setVersion(version)
		.build();

	const document = SwaggerModule.createDocument(app, swaggerConfig, {
		extraModels: [ErrorDto, DataResponseDto],
	});

	SwaggerModule.setup("api/docs", app, document);

	if (config.swagger.isWriteFile) {
		await writeFile(join(process.cwd(), "openapi.json"), JSON.stringify(document, null, "\t"));
	}
};

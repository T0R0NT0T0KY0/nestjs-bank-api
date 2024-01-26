import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, Logger } from "@nestjs/common";
import { Request, Response } from "express";
import { TypeORMError } from "typeorm";

@Catch(TypeORMError)
export class OrmExceptionFilter implements ExceptionFilter {
	constructor(private readonly logger: Logger) {}

	catch(error: TypeORMError, host: ArgumentsHost) {
		this.logger.error(error);

		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();

		response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
			statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
			timestamp: new Date().toISOString(),
			path: request.url,
			message: `Произошла внутреняя ошибка сервера, повторите попытку позднее`,
		});
	}
}

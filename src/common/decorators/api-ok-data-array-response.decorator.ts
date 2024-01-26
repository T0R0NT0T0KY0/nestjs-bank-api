import type { Type } from "@nestjs/common";
import { applyDecorators } from "@nestjs/common";
import { getSchemaPath, ApiExtraModels, ApiOperation, ApiOkResponse } from "@nestjs/swagger";

export const ApiOkDataArrayResponse = <TModel extends Type = Type>(
	description: string,
	model: TModel,
) =>
	applyDecorators(
		ApiExtraModels(model),
		ApiOperation({ description }),
		ApiOkResponse({
			schema: {
				properties: { data: { type: "array", items: { $ref: getSchemaPath(model) } } },
			},
		}),
	);

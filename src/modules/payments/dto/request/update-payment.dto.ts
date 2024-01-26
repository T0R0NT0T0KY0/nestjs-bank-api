import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdatePaymentDto {
	@ApiPropertyOptional({ minimum: 1 })
	amount?: number;

	@ApiPropertyOptional({ type: "object" })
	data?: Record<string, unknown>;
}

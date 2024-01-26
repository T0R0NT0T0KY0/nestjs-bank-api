import { ApiProperty } from "@nestjs/swagger";
import { PaymentTypeEnum } from "../../types/payment-type.enum";

export class CreatePaymentDto {
	@ApiProperty({ minimum: 1 })
	amount: number;

	@ApiProperty({ enum: PaymentTypeEnum })
	type: PaymentTypeEnum;

	@ApiProperty({ type: "object" })
	data?: Record<string, unknown>;
}

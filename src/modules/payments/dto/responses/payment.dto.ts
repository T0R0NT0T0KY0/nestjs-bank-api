import { ApiProperty } from "@nestjs/swagger";
import { PaymentEntity } from "../../entity/payment.entity";
import { PaymentStatusEnum } from "../../types/payment-status.enum";

export class PaymentDto {
	@ApiProperty()
	paymentId: string;

	@ApiProperty()
	userId: string;

	@ApiProperty()
	amount: number;

	@ApiProperty({ enum: PaymentStatusEnum })
	status: PaymentStatusEnum;

	@ApiProperty()
	type: string;

	@ApiProperty()
	data: Record<string, unknown>;

	constructor(
		paymentId: string,
		userId: string,
		amount: number,
		status: PaymentStatusEnum,
		type: string,
		data: Record<string, unknown>,
	) {
		this.paymentId = paymentId;
		this.userId = userId;
		this.amount = amount;
		this.status = status;
		this.type = type;
		this.data = data;
	}

	static fromPaymentEntity(payment: PaymentEntity) {
		return new PaymentDto(
			payment.id,
			payment.userId,
			payment.amount,
			payment.status,
			payment.type,
			payment.data,
		);
	}
}

import { DataResponseDto } from "@Common/responses/data-response.dto";
import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Transactional } from "typeorm-transactional";
import { GetUserService } from "../../users/services/get-user.service";
import { UpdateUserService } from "../../users/services/update-user.service";
import { PaymentDto } from "../dto/responses/payment.dto";
import { PaymentEntity } from "../entity/payment.entity";
import { PaymentData } from "../types/payment-data";
import { PaymentStatusEnum } from "../types/payment-status.enum";
import { PaymentTypeEnum } from "../types/payment-type.enum";

export interface UpdatePaymentIdentifier {
	paymentId: string;
	userId: string;
}

export interface UpdatePaymentData {
	amount?: number;
	data?: PaymentData;
}

@Injectable()
export class UpdatePaymentsService {
	constructor(
		@InjectRepository(PaymentEntity)
		private paymentRepository: Repository<PaymentEntity>,
		private updateUserService: UpdateUserService,
		private getUserService: GetUserService,
	) {}

	@Transactional()
	async update(identifier: UpdatePaymentIdentifier, data: UpdatePaymentData) {
		const payment = await this.paymentRepository.findOneBy({
			userId: identifier.userId,
			id: identifier.paymentId,
		});

		if (!payment) {
			throw new BadRequestException();
		}

		if (payment.status !== PaymentStatusEnum.PENDING) {
			throw new BadRequestException("Payment status invalid");
		}

		if (payment.type === PaymentTypeEnum.INCOME) {
			throw new BadRequestException("Cant edit income payments");
		}

		if (data.data) {
			await this.updateData(payment, data.data);
		}

		if (data.amount) {
			await this.updateWithdrawal(payment, data.amount);
		}

		const updatedPayment = await this.paymentRepository.findOneBy({ id: payment.id });

		const paymentDto = PaymentDto.fromPaymentEntity(updatedPayment);
		return new DataResponseDto(paymentDto);
	}

	private async updateWithdrawal(payment: PaymentEntity, amount: number) {
		const user = await this.getUserService.getActiveById(payment.userId);

		if (user.balance < payment.amount) {
			throw new BadRequestException("low balance");
		}

		// todo fetch payments service update amount

		await this.paymentRepository.update(payment.id, { amount });
	}

	private async updateData(payment: PaymentEntity, data: PaymentData) {
		await this.paymentRepository.update(payment.id, { data });

		await this.paymentRepository.findOneBy({ id: payment.id });
	}
}

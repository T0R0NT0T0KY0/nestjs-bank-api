import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Transactional } from "typeorm-transactional";
import { UpdateUserService } from "../../users/services/update-user.service";
import { PaymentEntity } from "../entity/payment.entity";
import { PaymentStatusEnum } from "../types/payment-status.enum";
import { PaymentTypeEnum } from "../types/payment-type.enum";

export interface CancelPaymentIdentifier {
	paymentId: string;
	userId: string;
}

@Injectable()
export class CancelPaymentsService {
	constructor(
		@InjectRepository(PaymentEntity)
		private paymentRepository: Repository<PaymentEntity>,
		private updateUserService: UpdateUserService,
	) {}

	@Transactional()
	async cancel(identifier: CancelPaymentIdentifier) {
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

		await this.paymentRepository.update(payment.id, { status: PaymentStatusEnum.CANCELED });

		if (payment.type === PaymentTypeEnum.INCOME) {
			await this.cancelIncome(payment);
		} else {
			await this.cancelWithdrawal(payment);
		}
	}

	private async cancelIncome(payment: PaymentEntity) {
		// todo fetch refund
		await this.updateUserService.incrementBalance(payment.userId, -payment.amount);
	}

	private async cancelWithdrawal(payment: PaymentEntity) {
		// todo fetch refund
		await this.updateUserService.incrementBalance(payment.userId, payment.amount);
	}
}

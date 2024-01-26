import { DataResponseDto } from "@Common/responses/data-response.dto";
import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Transactional } from "typeorm-transactional";
import { UserEntity } from "../../users/entities/user.entity";
import { GetUserService } from "../../users/services/get-user.service";
import { UpdateUserService } from "../../users/services/update-user.service";
import { PaymentDto } from "../dto/responses/payment.dto";
import { PaymentEntity } from "../entity/payment.entity";
import { PaymentStatusEnum } from "../types/payment-status.enum";
import { PaymentTypeEnum } from "../types/payment-type.enum";

interface CreatePaymentData {
	userId: string;
	amount: number;
	data?: Record<string, unknown>;
	type: PaymentTypeEnum;
}

@Injectable()
export class CreatePaymentsService {
	constructor(
		private getUserService: GetUserService,
		private updateUserService: UpdateUserService,
		@InjectRepository(PaymentEntity)
		private paymentRepository: Repository<PaymentEntity>,
	) {}

	@Transactional()
	async create(data: CreatePaymentData) {
		const user = await this.getUserService.getActiveById(data.userId);

		const payment = this.paymentRepository.create({
			userId: user.id,
			amount: data.amount,
			type: data.type,
			data: data.data,
			status: PaymentStatusEnum.PENDING,
		});

		if (payment.type === PaymentTypeEnum.INCOME) {
			await this.createIncome(payment);
		} else {
			await this.createWithdrawal(payment, user);
		}

		const paymentDto = PaymentDto.fromPaymentEntity(payment);
		return new DataResponseDto(paymentDto);
	}

	private async createIncome(payment: PaymentEntity) {
		// todo validate money is coming

		await Promise.all([
			this.paymentRepository.insert(payment),
			this.updateUserService.incrementBalance(payment.userId, payment.amount),
		]);
	}

	private async createWithdrawal(payment: PaymentEntity, user: UserEntity) {
		if (user.balance < payment.amount) {
			throw new BadRequestException("Low balance");
		}

		await Promise.all([
			this.paymentRepository.insert(payment),
			this.updateUserService.incrementBalance(user.id, -payment.amount),
		]);

		// todo fetch to money service
	}
}

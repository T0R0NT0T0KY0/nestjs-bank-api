import { DataArrayResponseDto } from "@Common/responses/data-array-response.dto";
import { DataResponseDto } from "@Common/responses/data-response.dto";
import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PaymentDto } from "../dto/responses/payment.dto";
import { PaymentEntity } from "../entity/payment.entity";

export interface GetPaymentIdentifier {
	paymentId: string;
	userId: string;
}

export interface GetPaymentsIdentifier {
	userId: string;
	limit: number;
	offset: number;
}

@Injectable()
export class GetPaymentsService {
	constructor(
		@InjectRepository(PaymentEntity)
		private paymentRepository: Repository<PaymentEntity>,
	) {}

	async getById(identifier: GetPaymentIdentifier) {
		const payment = await this.paymentRepository.findOneBy({
			userId: identifier.userId,
			id: identifier.paymentId,
		});

		if (!payment) {
			throw new BadRequestException();
		}

		const paymentDto = PaymentDto.fromPaymentEntity(payment);
		return new DataResponseDto(paymentDto);
	}

	async getMany(identifier: GetPaymentsIdentifier) {
		const payments = await this.paymentRepository.find({
			where: { userId: identifier.userId },
			order: { createdAt: "ASC" },
			take: identifier.limit,
			skip: identifier.offset,
		});

		const paymentDtos = payments.map((payment) => PaymentDto.fromPaymentEntity(payment));
		return new DataArrayResponseDto(paymentDtos);
	}
}

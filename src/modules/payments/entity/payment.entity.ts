import { BaseEntity } from "@Common/entities/base.entity";
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "../../users/entities/user.entity";
import { PaymentData } from "../types/payment-data";
import { PaymentStatusEnum } from "../types/payment-status.enum";
import { PaymentTypeEnum } from "../types/payment-type.enum";

@Entity({ name: "payment" })
export class PaymentEntity extends BaseEntity {
	@Column({ type: "uuid" })
	userId: string;

	@ManyToOne(() => UserEntity)
	@JoinColumn({ name: "userId" })
	user: UserEntity;

	@Column({ type: "enum", enum: PaymentStatusEnum })
	status: PaymentStatusEnum;

	@Column({ type: "enum", enum: PaymentTypeEnum })
	type: PaymentTypeEnum;

	@Column({ type: "decimal", precision: 10, scale: 2 })
	amount: number;

	@Column({ type: "jsonb", default: {} })
	data: PaymentData;
}

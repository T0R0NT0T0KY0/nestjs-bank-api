import { Column, Entity } from "typeorm";

import { BaseEntity } from "@Common/entities/base.entity";
import { UserStatusEnum } from "../types/user-status.enum";

@Entity({ name: "user" })
export class UserEntity extends BaseEntity {
	@Column({ type: "text", unique: true })
	username: string;

	@Column({ type: "enum", enum: UserStatusEnum })
	status: UserStatusEnum;

	@Column({ type: "text" })
	password: string;

	@Column({ type: "text", nullable: true })
	refreshToken: string | null;

	@Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
	balance: number;
}

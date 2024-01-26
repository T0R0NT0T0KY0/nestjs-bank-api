import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "../../../users/entities/user.entity";

export class UserBalanceDto {
	@ApiProperty()
	userId: string;

	@ApiProperty()
	balance: number;

	constructor(userId: string, balance: number) {
		this.userId = userId;
		this.balance = balance;
	}

	static fromUserEntity(user: UserEntity) {
		return new UserBalanceDto(user.id, user.balance);
	}
}

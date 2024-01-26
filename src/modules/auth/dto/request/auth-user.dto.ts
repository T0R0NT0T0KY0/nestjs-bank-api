import { UserEntity } from "../../../users/entities/user.entity";

export class AuthUserDto {
	userId: string;

	constructor(userId: string) {
		this.userId = userId;
	}

	static fromUserEntity(user: UserEntity) {
		return new AuthUserDto(user.id);
	}
}

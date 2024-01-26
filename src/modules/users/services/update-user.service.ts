import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { UserStatusEnum } from "../types/user-status.enum";

interface UpdateUserData {
	status?: UserStatusEnum;
	refreshToken?: string;
}

@Injectable()
export class UpdateUserService {
	constructor(
		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>,
	) {}

	update(userId: string, data: UpdateUserData) {
		return this.userRepository.update(userId, data);
	}

	incrementBalance(userId: string, addAmount: number) {
		return this.userRepository.increment({ id: userId }, "balance", addAmount);
	}
}

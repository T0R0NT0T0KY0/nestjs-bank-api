import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { UserStatusEnum } from "../types/user-status.enum";

interface CreateUserData {
	password: string;
	username: string;
	status: UserStatusEnum;
}

@Injectable()
export class CreateUserService {
	constructor(
		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>,
	) {}

	async create(data: CreateUserData) {
		const user = this.userRepository.create(data);

		await this.userRepository.insert(user);

		return user;
	}
}

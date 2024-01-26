import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, FindOptionsWhere } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { UserStatusEnum } from "../types/user-status.enum";

@Injectable()
export class GetUserService {
	constructor(
		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>,
	) {}

	getById(id: string) {
		return this.userRepository.findOne({
			where: { id },
		});
	}

	async getActiveById(id: string) {
		const user = await this.userRepository.findOne({
			where: { id },
		});

		if (!user || user.status !== UserStatusEnum.ACTIVE) {
			throw new BadRequestException();
		}
		return user;
	}

	getByUsername(username: string) {
		return this.userRepository.findOne({
			where: { username },
		});
	}

	getBy(where: FindOptionsWhere<UserEntity>) {
		return this.userRepository.findOne({
			where,
		});
	}

	getManyBy(where: FindOptionsWhere<UserEntity>) {
		return this.userRepository.findBy(where);
	}
}

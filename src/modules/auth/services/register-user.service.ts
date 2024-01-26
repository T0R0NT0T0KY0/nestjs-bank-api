import { Injectable, BadRequestException } from "@nestjs/common";
import { CryptoService } from "../../crypto/crypto.module";
import { CreateUserService } from "../../users/services/create-user.service";
import { GetUserService } from "../../users/services/get-user.service";
import { UserStatusEnum } from "../../users/types/user-status.enum";

interface RegisterUserData {
	username: string;
	password: string;
}

@Injectable()
export class RegisterUserService {
	constructor(
		private userRepository: GetUserService,
		private createUserService: CreateUserService,
		private cryptoService: CryptoService,
	) {}

	async register(data: RegisterUserData) {
		await this.checkUniqueUsername(data.username);

		await this.createUserService.create({
			username: data.username,
			password: this.cryptoService.generateHash(data.password),
			status: UserStatusEnum.ACTIVE,
		});
	}

	private async checkUniqueUsername(username: string) {
		const user = await this.userRepository.getByUsername(username);

		if (user) {
			throw new BadRequestException("Username is not unique");
		}
	}
}

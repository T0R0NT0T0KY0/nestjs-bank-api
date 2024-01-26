import { Injectable, BadRequestException } from "@nestjs/common";
import { CryptoService } from "../../crypto/services/crypto.service";
import { GetUserService } from "../../users/services/get-user.service";
import { UpdateUserService } from "../../users/services/update-user.service";

interface LogoutUserData {
	refreshToken: string;
}

@Injectable()
export class LogoutUserService {
	constructor(
		private cryptoService: CryptoService,
		private getUserService: GetUserService,
		private updateUserService: UpdateUserService,
	) {}

	async logout(data: LogoutUserData) {
		const refreshToken = this.cryptoService.generateHash(data.refreshToken);

		const user = await this.getUserService.getBy({ refreshToken });

		if (!user) {
			throw new BadRequestException();
		}

		await this.updateUserService.update(user.id, { refreshToken: null });
	}
}

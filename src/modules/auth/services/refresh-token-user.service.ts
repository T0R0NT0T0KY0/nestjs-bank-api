import { DataResponseDto } from "@Common/responses/data-response.dto";
import { Injectable, BadRequestException } from "@nestjs/common";
import { CryptoService } from "../../crypto/crypto.module";
import { GetUserService } from "../../users/services/get-user.service";
import { UpdateUserService } from "../../users/services/update-user.service";
import { RefreshUserDto } from "../dto/response/refresh-user.dto";
import { AuthService } from "./auth.service";

interface RefreshTokenUserData {
	refreshToken: string;
}

@Injectable()
export class RefreshTokenUserService {
	constructor(
		private getUserService: GetUserService,
		private updateUserService: UpdateUserService,
		private authService: AuthService,
		private cryptoService: CryptoService,
	) {}

	async refreshToken(data: RefreshTokenUserData) {
		const refreshToken = this.cryptoService.generateHash(data.refreshToken);

		const user = await this.getUserService.getBy({ refreshToken });

		if (!user) {
			throw new BadRequestException();
		}

		const tokens = await this.authService.getTokens(user.id);

		await this.updateRefreshToken(user.id, tokens.refreshToken);

		const refreshUserDto = new RefreshUserDto(tokens.accessToken, tokens.refreshToken);
		return new DataResponseDto(refreshUserDto);
	}

	private updateRefreshToken(userId: string, refreshToken: string) {
		const hashedRefreshToken = this.cryptoService.generateHash(refreshToken);

		return this.updateUserService.update(userId, {
			refreshToken: hashedRefreshToken,
		});
	}
}

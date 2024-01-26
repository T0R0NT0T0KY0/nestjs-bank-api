import { DataResponseDto } from "@Common/responses/data-response.dto";
import { Injectable, BadRequestException } from "@nestjs/common";
import { CryptoService } from "../../crypto/crypto.module";
import { GetUserService } from "../../users/services/get-user.service";
import { UpdateUserService } from "../../users/services/update-user.service";
import { LoginUserDto } from "../dto/response/login-user.dto";
import { AuthService } from "./auth.service";

interface LoginUserData {
	username: string;
	password: string;
}

@Injectable()
export class LoginUserService {
	constructor(
		private getUserService: GetUserService,
		private updateUserService: UpdateUserService,
		private authService: AuthService,
		private cryptoService: CryptoService,
	) {}

	async login(data: LoginUserData) {
		const user = await this.getUserService.getByUsername(data.username);

		if (!user) {
			throw new BadRequestException();
		}

		const isValidPassword = this.cryptoService.compareTextWithHash(data.password, user.password);

		if (!isValidPassword) {
			throw new BadRequestException();
		}

		const tokens = await this.authService.getTokens(user.id);

		await this.updateRefreshToken(user.id, tokens.refreshToken);

		const loginUserDto = new LoginUserDto(tokens.accessToken, tokens.refreshToken);
		return new DataResponseDto(loginUserDto);
	}

	private updateRefreshToken(userId: string, refreshToken: string) {
		const hashedRefreshToken = this.cryptoService.generateHash(refreshToken);

		return this.updateUserService.update(userId, {
			refreshToken: hashedRefreshToken,
		});
	}
}

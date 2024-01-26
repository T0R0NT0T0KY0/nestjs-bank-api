import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { config } from "../../../common/config/config";

@Injectable()
export class AuthService {
	constructor(private jwtService: JwtService) {}

	async getTokens(userId: string) {
		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(
				{
					userId,
				},
				{
					secret: config.auth.accessTokenSecret,
					expiresIn: config.auth.accessTokenExpiresIn,
				},
			),
			this.jwtService.signAsync(
				{
					userId,
				},
				{
					secret: config.auth.refreshTokenSecret,
					expiresIn: config.auth.refreshTokenExpiresIn,
				},
			),
		]);

		return {
			accessToken,
			refreshToken,
		};
	}
}

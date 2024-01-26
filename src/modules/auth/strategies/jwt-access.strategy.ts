import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { config } from "../../../common/config/config";
import { GetUserService } from "../../users/services/get-user.service";
import { UserStatusEnum } from "../../users/types/user-status.enum";
import { AuthUserDto } from "../dto/request/auth-user.dto";
import { JwtTokenPayload } from "../types/jwt-token-payload";

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, "jwt") {
	constructor(private getUserService: GetUserService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: config.auth.accessTokenSecret,
		});
	}

	async validate(payload: JwtTokenPayload): Promise<AuthUserDto> {
		const user = await this.getUserService.getById(payload.userId);

		if (!user || user.status !== UserStatusEnum.ACTIVE) throw new UnauthorizedException();

		return AuthUserDto.fromUserEntity(user);
	}
}

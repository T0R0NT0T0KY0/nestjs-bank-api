import { ApiOkDataResponse } from "@Common/decorators/api-ok-data-response.decorator";
import { Controller, Post, Body, HttpStatus, HttpCode } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiOkResponse } from "@nestjs/swagger";
import { LoginUserBodyDto } from "../dto/request/login-user-body.dto";
import { LogoutUserBodyDto } from "../dto/request/logout-user-body.dto";
import { RefreshTokenUserBodyDto } from "../dto/request/refresh-token-user-body.dto";
import { RegisterUserBodyDto } from "../dto/request/register-user-body.dto";
import { LoginUserDto } from "../dto/response/login-user.dto";
import { RefreshUserDto } from "../dto/response/refresh-user.dto";
import { LoginUserService } from "../services/login-user.service";
import { LogoutUserService } from "../services/logout-user.service";
import { RefreshTokenUserService } from "../services/refresh-token-user.service";
import { RegisterUserService } from "../services/register-user.service";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
	constructor(
		private registerUserService: RegisterUserService,
		private loginUserService: LoginUserService,
		private refreshTokenUserService: RefreshTokenUserService,
		private logoutUserService: LogoutUserService,
	) {}

	@HttpCode(HttpStatus.OK)
	@Post("register")
	@ApiOperation({
		description: "Register user",
	})
	@ApiOkResponse({ description: "User register success" })
	register(@Body() body: RegisterUserBodyDto) {
		return this.registerUserService.register(body);
	}

	@Post("login")
	@ApiOperation({
		description: "Login user",
	})
	@ApiOkDataResponse("User login success", LoginUserDto)
	login(@Body() body: LoginUserBodyDto) {
		return this.loginUserService.login(body);
	}

	@ApiOperation({
		description: "Refresh token",
	})
	@ApiOkDataResponse("User login success", RefreshUserDto)
	@Post("refresh")
	refresh(@Body() body: RefreshTokenUserBodyDto) {
		return this.refreshTokenUserService.refreshToken(body);
	}

	@HttpCode(HttpStatus.OK)
	@Post("logout")
	@ApiOperation({
		description: "Refresh token",
	})
	@ApiOkResponse({ description: "Token refresh success" })
	logout(@Body() body: LogoutUserBodyDto) {
		return this.logoutUserService.logout(body);
	}
}

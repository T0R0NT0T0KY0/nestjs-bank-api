import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../users/entities/user.entity";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { LoginUserService } from "./services/login-user.service";
import { LogoutUserService } from "./services/logout-user.service";
import { RefreshTokenUserService } from "./services/refresh-token-user.service";
import { RegisterUserService } from "./services/register-user.service";
import { JwtAccessStrategy } from "./strategies/jwt-access.strategy";

@Global()
@Module({
	imports: [JwtModule.register({}), PassportModule, TypeOrmModule.forFeature([UserEntity])],
	controllers: [AuthController],
	providers: [
		JwtAccessStrategy,
		AuthService,
		LoginUserService,
		LogoutUserService,
		RefreshTokenUserService,
		RegisterUserService,
	],
})
export class AuthModule {}

export * from "./controllers/auth.controller";
export * from "./services/auth.service";
export * from "./services/login-user.service";
export * from "./services/logout-user.service";
export * from "./services/refresh-token-user.service";
export * from "./services/register-user.service";
export * from "./strategies/jwt-access.strategy";

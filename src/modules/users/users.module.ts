import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserEntity } from "./entities/user.entity";
import { CreateUserService } from "./services/create-user.service";

import { GetUserService } from "./services/get-user.service";
import { UpdateUserService } from "./services/update-user.service";

@Global()
@Module({
	imports: [TypeOrmModule.forFeature([UserEntity])],
	controllers: [],
	providers: [GetUserService, CreateUserService, UpdateUserService],
	exports: [GetUserService, CreateUserService, UpdateUserService],
})
export class UsersModule {}

export * from "./entities/user.entity";
export * from "./services/create-user.service";
export * from "./services/get-user.service";
export * from "./services/update-user.service";
export * from "./types/user-status.enum";

import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class RefreshTokenUserBodyDto {
	@IsString()
	@ApiProperty()
	refreshToken: string;
}

import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
	@ApiProperty()
	accessToken: string;
	@ApiProperty()
	refreshToken: string;

	constructor(accessToken: string, refreshToken: string) {
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
	}
}

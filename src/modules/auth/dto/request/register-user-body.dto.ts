import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, MaxLength, Matches } from "class-validator";

export class RegisterUserBodyDto {
	@IsString()
	@MinLength(4)
	@MaxLength(25)
	@ApiProperty({ minLength: 4, maxLength: 25 })
	username: string;

	@IsString()
	@MinLength(4)
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
		message: "password too weak",
	})
	@ApiProperty({
		minLength: 4,
		pattern: "((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$",
	})
	password: string;
}

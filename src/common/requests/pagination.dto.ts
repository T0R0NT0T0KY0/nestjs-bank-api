import { ApiProperty } from "@nestjs/swagger";

export class PaginationDto {
	@ApiProperty({ maximum: 100, minimum: 0, default: 10 })
	limit: number;

	@ApiProperty({ minimum: 0, default: 0 })
	offset: number;
}

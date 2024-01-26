import { DataResponseDto } from "@Common/responses/data-response.dto";
import { Injectable, BadRequestException } from "@nestjs/common";
import { GetUserService } from "../../users/services/get-user.service";
import { UserStatusEnum } from "../../users/types/user-status.enum";
import { UserBalanceDto } from "../dto/responses/user-balance.dto";

export interface GetBalanceIdentifier {
	userId: string;
}

@Injectable()
export class GetBalanceService {
	constructor(private getUserService: GetUserService) {}

	async get(identifier: GetBalanceIdentifier) {
		const user = await this.getUserService.getById(identifier.userId);

		if (!user || user.status !== UserStatusEnum.ACTIVE) {
			throw new BadRequestException();
		}

		const userBalanceDto = UserBalanceDto.fromUserEntity(user);
		return new DataResponseDto(userBalanceDto);
	}
}

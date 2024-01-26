import { ApiOkDataArrayResponse } from "@Common/decorators/api-ok-data-array-response.decorator";
import { ApiOkDataResponse } from "@Common/decorators/api-ok-data-response.decorator";
import { PaginationDto } from "@Common/requests/pagination.dto";
import {
	Controller,
	Post,
	Body,
	HttpStatus,
	HttpCode,
	Req,
	Get,
	Param,
	ParseUUIDPipe,
	UseGuards,
	Delete,
	Patch,
	Query,
} from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { JwtAccessGuard } from "../../auth/guards/jwt-access.guard";
import { AuthorizedRequest } from "../../auth/types/authorized-request";
import { CreatePaymentDto } from "../dto/request/create-payment.dto";
import { UpdatePaymentDto } from "../dto/request/update-payment.dto";
import { PaymentDto } from "../dto/responses/payment.dto";
import { UserBalanceDto } from "../dto/responses/user-balance.dto";
import { CancelPaymentsService } from "../services/cancel-payments.service";
import { CreatePaymentsService } from "../services/create-payments.service";
import { GetBalanceService } from "../services/get-balance.service";
import { GetPaymentsService } from "../services/get-payments.service";
import { UpdatePaymentsService } from "../services/update-payments.service";

@UseGuards(JwtAccessGuard)
@ApiTags("Payments")
@Controller("payments")
export class PaymentsController {
	constructor(
		private createPaymentsService: CreatePaymentsService,
		private getPaymentsService: GetPaymentsService,
		private getBalanceService: GetBalanceService,
		private deletePaymentsService: CancelPaymentsService,
		private updatePaymentsService: UpdatePaymentsService,
	) {}

	@HttpCode(HttpStatus.OK)
	@Post()
	@ApiOperation({
		description: "Create payment",
	})
	@ApiOkDataResponse("Create payment success", PaymentDto)
	create(@Body() body: CreatePaymentDto, @Req() req: AuthorizedRequest) {
		return this.createPaymentsService.create({ ...body, userId: req.user.userId });
	}

	@ApiOperation({
		description: "Get balance",
	})
	@ApiOkDataResponse("Get balance success", UserBalanceDto)
	@Get("balance")
	getBalance(@Req() req: AuthorizedRequest) {
		return this.getBalanceService.get({ userId: req.user.userId });
	}

	@Get(":paymentId")
	@ApiOperation({
		description: "Get payment by id",
	})
	@ApiOkDataResponse("Get payment by id success", PaymentDto)
	getById(@Param("paymentId", ParseUUIDPipe) paymentId: string, @Req() req: AuthorizedRequest) {
		return this.getPaymentsService.getById({ paymentId, userId: req.user.userId });
	}

	@Get()
	@ApiOperation({
		description: "Get paymentBy id",
	})
	@ApiOkDataArrayResponse("Get payments  success", PaymentDto)
	getHistory(@Req() req: AuthorizedRequest, @Query() query: PaginationDto) {
		return this.getPaymentsService.getMany({ ...query, userId: req.user.userId });
	}

	@ApiOperation({
		description: "Cancel payment",
	})
	@ApiOkDataResponse("Cancel payment success", UserBalanceDto)
	@Delete(":paymentId")
	cancel(@Param("paymentId", ParseUUIDPipe) paymentId: string, @Req() req: AuthorizedRequest) {
		return this.deletePaymentsService.cancel({ paymentId, userId: req.user.userId });
	}

	@ApiOperation({
		description: "update payment",
	})
	@ApiOkDataResponse("update payment success", PaymentDto)
	@Patch(":paymentId")
	update(
		@Param("paymentId", ParseUUIDPipe) paymentId: string,
		@Req() req: AuthorizedRequest,
		@Body() body: UpdatePaymentDto,
	) {
		return this.updatePaymentsService.update({ paymentId, userId: req.user.userId }, body);
	}
}

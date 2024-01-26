import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaymentsController } from "./controllers/payments.controller";
import { PaymentEntity } from "./entity/payment.entity";
import { CancelPaymentsService } from "./services/cancel-payments.service";
import { CreatePaymentsService } from "./services/create-payments.service";
import { GetBalanceService } from "./services/get-balance.service";
import { GetPaymentsService } from "./services/get-payments.service";
import { UpdatePaymentsService } from "./services/update-payments.service";

@Global()
@Module({
	imports: [TypeOrmModule.forFeature([PaymentEntity])],
	controllers: [PaymentsController],
	providers: [
		CancelPaymentsService,
		CreatePaymentsService,
		GetBalanceService,
		GetPaymentsService,
		UpdatePaymentsService,
	],
})
export class PaymentsModule {}

export * from "./controllers/payments.controller";
export * from "./services/cancel-payments.service";
export * from "./services/create-payments.service";
export * from "./services/get-balance.service";
export * from "./services/get-payments.service";
export * from "./services/update-payments.service";

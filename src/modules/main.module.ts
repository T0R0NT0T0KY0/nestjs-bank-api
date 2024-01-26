import { Module, Global } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { CryptoModule } from "./crypto/crypto.module";
import { initDatabase } from "./database/init-database";
import { initLogger } from "./logger/init-logger";
import { PaymentsModule } from "./payments/payments.module";
import { UsersModule } from "./users/users.module";

@Global()
@Module({
	imports: [initDatabase(), initLogger(), UsersModule, AuthModule, CryptoModule, PaymentsModule],
})
export class MainModule {}

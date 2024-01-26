import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";
import { DataSource } from "typeorm";
import { addTransactionalDataSource, initializeTransactionalContext } from "typeorm-transactional";
import { config } from "../../common/config/config";

initializeTransactionalContext();

export const initDatabase = () => {
	return TypeOrmModule.forRootAsync({
		useFactory: () =>
			({
				entities: [join("dist", "**", "*.entity{.ts,.js}")],
				migrationsTableName: "migrations_ls",
				migrations: [join("dist", "**", "migrations", "*{.ts,.js}")],
				synchronize: false,
				migrationsTransactionMode: "all",
				...config.database,
			}) as TypeOrmModuleOptions,
		async dataSourceFactory(options) {
			if (!options) {
				throw new Error("Invalid options passed");
			}

			return addTransactionalDataSource(new DataSource(options));
		},
	});
};

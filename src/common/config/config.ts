import { config as envs } from "dotenv";
import { env } from "process";

envs();

export const config = {
	auth: {
		accessTokenExpiresIn: env.AUTH_JWT_ACCESS_EXPIRES_IN,
		refreshTokenExpiresIn: env.AUTH_JWT_REFRESH_EXPIRES_IN,
		accessTokenSecret: env.AUTH_JWT_ACCESS_SIGN,
		refreshTokenSecret: env.AUTH_JWT_REFRESH_SIGN,
	},
	database: {
		type: "postgres",
		host: env.PG_HOST,
		port: +env.PG_PORT,
		username: env.PG_USERNAME,
		password: env.PG_PASSWORD,
		database: env.PG_DATABASE,
		migrationsRun: env.PG_IS_MIGRATIONS_RUN === "true",
		logging: !!env.PG_IS_LOGGING,
	},
	server: {
		port: env.PORT,
	},
	swagger: {
		isWriteFile: env.SWAGGER_IS_WRITE_FILE,
	},
};

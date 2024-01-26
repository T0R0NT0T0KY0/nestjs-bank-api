import { WinstonModule, utilities } from "nest-winston";
import * as Winston from "winston";

export const initLogger = () => {
	return WinstonModule.forRootAsync({
		useFactory: () => {
			const transportList = [];
			transportList.push(
				new Winston.transports.Console({
					format: Winston.format.combine(
						Winston.format.timestamp(),
						Winston.format.ms(),
						utilities.format.nestLike("some-app"),
					),
				}),
			);
			return {
				transports: transportList,
			};
		},
	});
};

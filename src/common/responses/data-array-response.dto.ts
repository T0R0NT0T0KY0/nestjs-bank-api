import { DataResponseDto } from "@Common/responses/data-response.dto";

export class DataArrayResponseDto<T> extends DataResponseDto<T[]> {
	constructor(data: T[]) {
		super(data);
	}
}

export interface JwtTokenPayload {
	userId: string;
	iat: number;
	exp: number;
}

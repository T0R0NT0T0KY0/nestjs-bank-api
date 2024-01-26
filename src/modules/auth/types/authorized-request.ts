import { AuthUserDto } from "../dto/request/auth-user.dto";

export type AuthorizedRequest = Request & { user: AuthUserDto };

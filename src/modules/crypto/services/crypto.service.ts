import { Injectable } from "@nestjs/common";
import crypto from "node:crypto";

@Injectable()
export class CryptoService {
	generateHash(payload: string | Buffer) {
		return crypto.createHash("sha1").update(payload).digest("base64url");
	}

	compareTextWithHash(payload: string | Buffer, hash: string) {
		return this.generateHash(payload) === hash;
	}

	sign(key: string, payload: string) {
		return payload + "." + crypto.createHmac("sha256", key).update(payload).digest("base64url");
	}

	unsign(key: string, signedPayload: string) {
		const payload = signedPayload.slice(0, signedPayload.indexOf("."));
		const newSignedPayload = this.sign(key, payload);
		return this.generateHash(signedPayload) === this.generateHash(newSignedPayload)
			? payload
			: false;
	}
}

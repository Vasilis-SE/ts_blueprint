import { AESGCMEncryptionCredentials } from '@interfaces/securityInterfaces';
import crypto from 'crypto';

export default class AESGCM {
	public static encrypt(value: string): AESGCMEncryptionCredentials {
		const key = crypto.randomBytes(32);
		const initializationVector: Buffer = Buffer.from(crypto.randomBytes(12).toString(), 'utf8');

		const cipher: crypto.CipherGCM = crypto.createCipheriv('aes-256-gcm', key, initializationVector);

		let encrypted = cipher.update(value, 'utf8', 'base64');
		encrypted += cipher.final('base64');

		return { encrypted, initializationVector, authenticationTag: cipher.getAuthTag(), key };
	}

	public static decrypt(payload: AESGCMEncryptionCredentials): string {
		const decipher = crypto.createDecipheriv('aes-256-gcm', payload.key, payload.initializationVector);
		decipher.setAuthTag(payload.authenticationTag);

		let decryptedData = decipher.update(payload.encrypted, 'base64', 'utf8');
		decryptedData += decipher.final('utf8');

		return decryptedData;
	}
}

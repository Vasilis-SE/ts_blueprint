export interface AESGCMEncryptionCredentials {
	encrypted: string,
	initializationVector: Buffer,
	authenticationTag: Buffer,
	key: Buffer
}
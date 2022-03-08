export default interface IEncryptedProperties {
    rb: Buffer;
    content: string;
    exp: number;
}
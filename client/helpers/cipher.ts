import crypto from "crypto";
import IEncryptedProperties from "../interfaces/security";

export default class CipherData {
  private algorithm: string;

  constructor(a: string = "aes-256-cbc") {
    this.algorithm = a;
  }

  cipher(value: string, key: string): IEncryptedProperties {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, Buffer.from(key), iv);

    let encrypted = cipher.update(value, "utf-8", "hex");
    encrypted += cipher.final("hex");
  
    return {
        rb: iv,
        content: encrypted,
    };
  }

  decipher(encrypted: IEncryptedProperties, key: string) {
    const decipher = crypto.createDecipheriv(this.algorithm, key, encrypted.rb);
    let decrypted = decipher.update(encrypted.content, "hex", "utf-8");
    decrypted += decipher.final("utf8");

    return decrypted;
  }
}

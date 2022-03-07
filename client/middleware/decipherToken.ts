import { NextApiRequest, NextApiResponse } from "next";
import { InvalidTokenProvided } from "../exceptions/authentication";
import CipherData from "../helpers/cipher";
import IEncryptedProperties from "../interfaces/security";

export async function mwDecipherToken(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (
    typeof req.headers.authorization == "undefined" ||
    !req.headers.authorization ||
    !process.env.STORAGE_AES_KEY // so that ts wont complain
  )
    throw new InvalidTokenProvided();

  const authorization: IEncryptedProperties = JSON.parse(
    req.headers.authorization
  );

  authorization.rb = Buffer.from(authorization.rb);

  const cipher = new CipherData();
  const dencrypted = await cipher.decipher(
    authorization,
    process.env.STORAGE_AES_KEY
  );

  return dencrypted;
}

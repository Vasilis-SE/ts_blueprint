import type { NextApiRequest, NextApiResponse } from "next";
import CipherData from "../../../helpers/cipher";
import Fetch from "../../../helpers/fetch";
import IEncryptedProperties from "../../../interfaces/security";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST": // login
      const response = await Fetch.post(
        `${process.env.API_BASE_URL}/user/login`,
        JSON.parse(req.body),
        {
          "Content-Type": "application/json",
        }
      );

      if (!response.status) return response;
      if (!process.env.STORAGE_AES_KEY) return { status: false };

      // If login is successfull cipher token to keep data on local storage.
      // The token is ciphered here because enviromentals here on the back are
      // accessible.
      const token = response.data.token;
      const cipher = new CipherData();
      const encrypted: IEncryptedProperties = cipher.cipher(
        token,
        process.env.STORAGE_AES_KEY
      );

      res.status(response.httpCode).json({
        status: true,
        httpCode: response.httpCode,
        exp: response.data.exp,
        data: encrypted,
      });

      break;
  }
}

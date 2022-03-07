import type { NextApiRequest, NextApiResponse } from "next";
import {
  IFailedResponse,
  ISuccessfulResponseData,
} from "../../../interfaces/response";
import IEncryptedProperties from "../../../interfaces/security";
import { IUserRegisterProperties } from "../../../interfaces/user";
import CipherData from "../../../helpers/cipher";
import Fetch from "../../../helpers/fetch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ISuccessfulResponseData | IFailedResponse>
) {
  let response: ISuccessfulResponseData | IFailedResponse = {};

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
      // const dencrypted = await cipher.decipher(encrypted, process.env.STORAGE_AES_KEY);

      // Add token to HTTP only Cookie

      return {
        status: true,
        httpCode: response.httpCode,
        data: encrypted,
      };
      break;
  }

  res.status(response.httpCode).json(response);
}

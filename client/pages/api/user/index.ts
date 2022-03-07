import type { NextApiRequest, NextApiResponse } from "next";
import Fetch from "../../../helpers/fetch";
import { mwDecipherToken } from "../../../middleware/decipherToken";
import { InvalidTokenProvided } from "../../../exceptions/authentication";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET": // profile
      try {
        const dencryptedToken: string = await mwDecipherToken(req, res);
        const response = await Fetch.get(
          `${process.env.API_BASE_URL}/user/profile`,
          {
            Authorization: `JWT ${dencryptedToken}`,
          }
        );
        res.status(response.httpCode).json(response);
      } catch (e) {
        if (!(e instanceof InvalidTokenProvided)) throw e;
        const response = { ...e };
        return res.status(response.httpCode).json(response);
      }
      break;
    case "POST": // register
      const response = await Fetch.post(
        `${process.env.API_BASE_URL}/user`,
        JSON.parse(req.body),
        {
          "Content-Type": "application/json",
        }
      );

      res.status(response.httpCode).json(response);

      break;
    case "DELETE": // logout
      try {
        const dencryptedToken: string = await mwDecipherToken(req, res);
        const response = await Fetch.delete(
          `${process.env.API_BASE_URL}/user/logout`,
          {
            Authorization: `JWT ${dencryptedToken}`,
          }
        );
        res.status(response.httpCode).json(response);
      } catch (e) {
        if (!(e instanceof InvalidTokenProvided)) throw e;
        const response = { ...e };
        return res.status(response.httpCode).json(response);
      }
      break;
  }
}

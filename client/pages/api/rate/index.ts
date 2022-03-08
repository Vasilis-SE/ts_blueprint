import type { NextApiRequest, NextApiResponse } from "next";
import { InvalidTokenProvided } from "../../../exceptions/authentication";
import Fetch from "../../../helpers/fetch";
import { mwDecipherToken } from "../../../middleware/decipherToken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST": // rate movie
      try {
        const dencryptedToken: string = await mwDecipherToken(req, res);
        const response = await Fetch.post(
          `${process.env.API_BASE_URL}/rate/movie`,
          JSON.parse(req.body),
          {
            Authorization: `JWT ${dencryptedToken}`,
            "Content-Type": "application/json",
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

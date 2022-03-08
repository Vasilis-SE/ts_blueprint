import type { NextApiRequest, NextApiResponse } from "next";
import { InvalidTokenProvided } from "../../../exceptions/authentication";
import Fetch from "../../../helpers/fetch";
import { mwCheckToken } from "../../../middleware/checkToken";
import { mwDecipherToken } from "../../../middleware/decipherToken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET": // Get list of movies
      const response = await Fetch.get(
        `${process.env.API_BASE_URL}/movie?page=0&limit=${process.env.RESULTS_LIMIT}&order=${process.env.MOVIES_ORDER_BY}&sort=${process.env.MOVIES_ORDER_METHOD}`
      );

      res.status(response.httpCode).json(response);
      break;
    case "POST": // Create new movie
      try {
        const dencryptedToken: string = await mwDecipherToken(req, res);
        const response = await Fetch.post(
          `${process.env.API_BASE_URL}/movie`,
          JSON.parse(req.body),
          {
            Authorization: `JWT ${dencryptedToken}`,
            "Content-Type": "application/json"
          }
        );

        console.log(JSON.parse(req.body))
        console.log(response)

        res.status(response.httpCode).json(response);
      } catch (e) {
        if (!(e instanceof InvalidTokenProvided)) throw e;
        const response = { ...e };
        return res.status(response.httpCode).json(response);
      }
      break;
  }
}

import type { NextApiRequest, NextApiResponse } from "next";
import { InvalidTokenProvided } from "../../../exceptions/authentication";
import Converter from "../../../helpers/convert";
import Fetch from "../../../helpers/fetch";
import { IRequestQueryFilters } from "../../../interfaces/request";
import { mwDecipherToken } from "../../../middleware/decipherToken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET": // Get list of movies
      const query: IRequestQueryFilters = req.query;
      query.limit = Number(
        query.limit ? query.limit : process.env.RESULTS_LIMIT
      );
      query.page = Number(query.page ? query.page : 0);
      query.order = query.order ? query.order : process.env.MOVIES_ORDER_BY;
      query.sort = query.sort ? query.sort : process.env.MOVIES_ORDER_METHOD;
      
      const queryString = Converter.objectToQueryString(query);
      const response = await Fetch.get(
        `${process.env.API_BASE_URL}/movie?${queryString}`
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

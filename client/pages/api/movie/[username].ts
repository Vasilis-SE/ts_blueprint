import type { NextApiRequest, NextApiResponse } from "next";
import Converter from "../../../helpers/convert";
import Fetch from "../../../helpers/fetch";
import { IRequestQueryFilters } from "../../../interfaces/request";

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
        `${process.env.API_BASE_URL}/movie/${req.query.username}?${queryString}`
      );

      res.status(response.httpCode).json(response);
      break;
  }
}

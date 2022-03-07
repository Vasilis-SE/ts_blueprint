import type { NextApiRequest, NextApiResponse } from "next";
import {
  IFailedResponse,
  ISuccessfulResponseData,
} from "../../../interfaces/response";
import Fetch from "../../../helpers/fetch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ISuccessfulResponseData | IFailedResponse>
) {
  let response: ISuccessfulResponseData | IFailedResponse = {};

  switch (req.method) {
    case "GET":
      response = await getHandler();
      break;
  }

  res.status(response.httpCode).json(response);
}

const getHandler = async (): Promise<
  ISuccessfulResponseData | IFailedResponse
> => {
  return await Fetch.get(
    `${process.env.API_BASE_URL}/movie?page=0&limit=${process.env.RESULTS_LIMIT}&order=${process.env.MOVIES_ORDER_BY}&sort=${process.env.MOVIES_ORDER_METHOD}`
  );
};

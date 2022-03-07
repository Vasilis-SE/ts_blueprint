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
  if (req.method != "POST") return;

  response = await Fetch.post(
    `${process.env.API_BASE_URL}/user`,
    JSON.parse(req.body),
    {
      "Content-Type": "application/json",
    }
  );

  res.status(response.httpCode).json(response);
}

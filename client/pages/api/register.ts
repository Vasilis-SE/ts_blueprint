import type { NextApiRequest, NextApiResponse } from "next";
import {
  IFailedResponse,
  ISuccessfulResponseData,
} from "../../interfaces/response";
import Fetch from "../../service/fetch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ISuccessfulResponseData | IFailedResponse>
) {
  if (req.method !== "POST") return;    

  const response: ISuccessfulResponseData | IFailedResponse = 
    await Fetch.post( `${process.env.API_BASE_URL}/user`, req.body);
  res.status(response.httpCode).json(response);
}

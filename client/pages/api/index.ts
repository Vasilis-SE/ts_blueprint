import type { NextApiRequest, NextApiResponse } from 'next'
import { IFailedResponse, ISuccessfulResponseData } from '../../interfaces/response';
import Fetch from '../../service/fetch';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ISuccessfulResponseData | IFailedResponse>
) {
  if (req.method !== 'GET') return;

  const response: ISuccessfulResponseData | IFailedResponse = 
    await Fetch.get(`${process.env.API_BASE_URL}/movie?page=0&limit=${process.env.RESULTS_LIMIT}&order=${process.env.MOVIES_ORDER_BY}&sort=${process.env.MOVIES_ORDER_METHOD}`);
  res.status(response.httpCode).json(response);
}

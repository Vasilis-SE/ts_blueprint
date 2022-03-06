import type { NextApiRequest, NextApiResponse } from 'next'
import { IFailedResponse, ISuccessfulResponseData } from '../../interfaces/response';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ISuccessfulResponseData | IFailedResponse>
) {
  if (req.method !== 'GET') return;

  let response: ISuccessfulResponseData | IFailedResponse = 
    await fetch(`${process.env.API_BASE_URL}/movie?page=0&limit=${process.env.RESULTS_LIMIT}&order=${process.env.MOVIES_ORDER_BY}&sort=${process.env.MOVIES_ORDER_METHOD}`)
      .then(response => response.json())
      .then(data => {return data});
 
  res.status(response.httpCode).json(response);
}

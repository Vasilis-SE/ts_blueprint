import { NextApiRequest, NextApiResponse } from "next";
import LocalStorageStore from "../helpers/storage";
import { IFailedResponse, ISuccessfulResponse } from "../interfaces/response";

export async function mwCheckToken(
  response: ISuccessfulResponse | IFailedResponse,
  res: NextApiResponse
) {
  if (response.status) return;

  const failedResponse: any = response;
  if (failedResponse.errorCode != "es2") return;

  LocalStorageStore.clearLocalStorage();
  res.redirect(307, '/')
}

import IRequestHeaders from "../interfaces/request";

export default class Fetch {
  static async get(url: string) {
    let response = await fetch(url).then((response) => response.json());
    return response;
  }

  static async post(url: string, data: any, header?: IRequestHeaders) {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
    return response;
  }
}

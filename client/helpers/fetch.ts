export default class Fetch {
  static async get(url: string, header: object = {}) {
    const options: any = {
      method: "GET"
    };
    
    if (Object.keys(header).length > 0) options.headers = header;

    let response = await fetch(url, options)
      .then((response) => response.json());
    return response;
  }

  static async post(url: string, data: any, header: object = {}) {
    const options: any = {
      method: "POST",
      body: JSON.stringify(data),
    };

    if (Object.keys(header).length > 0) options.headers = header;

    const response = await fetch(url, options).then((response) =>
      response.json()
    );
    return response;
  }

  static async patch(url: string, data: any, header: object = {}) {
    const options: any = {
      method: "PATCH",
      body: JSON.stringify(data),
    };

    if (Object.keys(header).length > 0) options.headers = header;

    const response = await fetch(url, options).then((response) =>
      response.json()
    );
    return response;
  }

  static async delete(url: string, header: object = {}) {
    const options: any = {
      method: "DELETE"
    };

    if (Object.keys(header).length > 0) options.headers = header;

    const response = await fetch(url, options).then((response) =>
      response.json()
    );
    return response;
  }
}

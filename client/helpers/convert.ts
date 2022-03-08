export default class Converter {
  static objectToQueryString(obj: object): string {
    return Object.entries(obj)
      .map((pair) => pair.map(encodeURIComponent).join("="))
      .join("&");
  }
}

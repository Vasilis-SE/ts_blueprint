export default class Converter {
  static objectToQueryString(obj: object): string {
    return Object.entries(obj)
      .map((pair) => pair.map(encodeURIComponent).join("="))
      .join("&");
  }

  static convertTimestampToData = (timestamp = 0, locale="el-GR") => {
    return new Date(timestamp * 1000).toLocaleDateString(locale, {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    })
  };
}

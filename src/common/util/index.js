export class Util {
  static instance = null;

  static getInstance() {
    if (!Util.instance) {
      Util.instance = new Util();
    }
    return Util.instance;
  }

  getAPIURL() {
    const host = process.env.REACT_APP_API_HOST;
    return host;
  }

}
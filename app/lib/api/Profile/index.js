import config from './config';

export default class Auth {

  constructor(http) {
    this.http = http;
  }

  getProfile() {
    return this.http.get(config.GET_PROFILE);
  }
}

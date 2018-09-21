import config from './config';

export default class Auth {

  constructor(http) {
    this.http = http;
  }

  getProfile(token) {

    if (token) {
      return this.http.get(config.GET_PROFILE, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return this.http.get(config.GET_PROFILE);
  }
}

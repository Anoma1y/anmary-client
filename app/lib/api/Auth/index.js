import config from './config';

export default class Auth {

  constructor(http) {
    this.http = http;
  }

  authorization(email, password) {
    return this.http.post(config.AUTHORIZATION, {
      email,
      password
    });
  }

  logout() {
    return this.http.delete(config.LOGOUT);
  }

}

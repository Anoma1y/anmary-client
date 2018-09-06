import config from './config';

export default class Tags {

  constructor(http) {
    this.http = http;
  }

  add(name) {
    return this.http.post(config.ADD, {
      name
    });
  }

  get(name, limit = 10) {
    return this.http.get(`${config.GET}?name=${name}&limit=${limit}`);
  }

}

import config from './config';

export default class Proportion {

  constructor(http) {
    this.http = http;
  }

  add(size_id) {
    return this.http.post(config.ADD, {
      size_id,
    });
  }
}

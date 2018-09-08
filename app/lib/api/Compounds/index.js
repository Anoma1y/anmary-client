import config from './config';

export default class Compounds {

  constructor(http) {
    this.http = http;
  }

  add(composition_id, value) {
    return this.http.post(config.ADD, {
      composition_id,
      value
    });
  }

}

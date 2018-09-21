import config from './config';

export default class Subscribe {

  constructor(http) {
    this.http = http;
  }

  add(contact_address) {
    return this.http.post(config.SUBSCRIBE, {
      contact_address
    });
  }

}

import config from './config';

export default class Feedback {

  constructor(http) {
    this.http = http;
  }

  send(contact_name = '', contact_address, text) {
    return this.http.post(config.SEND, {
      contact_name,
      contact_address,
      text
    });
  }

  get_list() {
    return this.http.get(config.GET_LIST);
  }

}

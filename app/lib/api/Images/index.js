import config from './config';

export default class Images {

  constructor(http) {
    this.http = http;
  }

  add(file) {
    return this.http.post(config.ADD, file);
  }

  get(file_id) {
    return this.http.get(`${config.GET}/${file_id}`);
  }

  set_default(image_id) {
    return this.http.post(`${config.SET_DEFAULT}/${image_id}`);
  }

  change_default(image_id_old, image_id_new) {
    return this.http.post(`${config.CHANGE_DEFAULT}/${image_id_old}/${image_id_new}`);
  }

}

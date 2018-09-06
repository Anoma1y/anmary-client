import config from './config';

export default class Files {

  constructor(http) {
    this.http = http;
  }

  add(file) {
    return this.http.post(config.ADD, file);
  }

  get(file_id) {
    return this.http.get(`${config.GET}/${file_id}`);
  }

}

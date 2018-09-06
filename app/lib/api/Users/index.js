import config from './config';

export default class Auth {

  constructor(http) {
    this.http = http;
  }

  add(user) {
    return this.http.post(config.ADD, {
      ...user
    });
  }

  edit(user_id, data) {
    return this.http.patch(`${config.EDIT}/${user_id}`, data);
  }

  getList() {
    return this.http.get(config.GET_LIST);
  }

  getSingle(user_id) {
    return this.http.get(`${config.GET_SINGLE}/${user_id}`);
  }

  getSchema() {
    return this.http.get(config.GET_SCHEMA);
  }

}

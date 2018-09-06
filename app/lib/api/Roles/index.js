import config from './config';

export default class Auth {

  constructor(http) {
    this.http = http;
  }

  add(name, display_name, description, permissions) {
    return this.http.post(config.ADD, {
      name,
      display_name,
      description,
      permissions
    });
  }

  edit(role_id, display_name, description, permissions) {
    return this.http.patch(`${config.EDIT}/${role_id}`, {
      display_name,
      description,
      permissions
    });
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

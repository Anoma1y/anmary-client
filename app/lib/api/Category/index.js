import config from './config';

export default class Category {

  constructor(http) {
    this.http = http;
  }

  add(name, description) {
    return this.http.post(config.ADD, {
      name,
      description
    });
  }

  edit(category_id, name, description) {
    return this.http.patch(`${config.EDIT}/${category_id}`, {
      name,
      description
    });
  }

  getList() {
    return this.http.get(config.GET_LIST);
  }

}

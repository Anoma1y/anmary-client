import config from './config';

export default class Category {

  constructor(http) {
    this.http = http;
  }

  add(name, description, country) {
    return this.http.post(config.ADD, {
      name,
      description,
      country
    });
  }

  edit(category_id, name, description, country) {
    return this.http.patch(`${config.EDIT}/${category_id}`, {
      name,
      description,
      country
    });
  }

  getList() {
    return this.http.get(config.GET_LIST);
  }

}

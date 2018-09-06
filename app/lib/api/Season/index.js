import config from './config';

export default class Season {

  constructor(http) {
    this.http = http;
  }

  add(name, description) {
    return this.http.post(config.ADD, {
      name,
      description
    });
  }

  edit(season_id, name, description) {
    return this.http.patch(`${config.EDIT}/${season_id}`, {
      name,
      description
    });
  }

  getList() {
    return this.http.get(config.GET_LIST);
  }

}

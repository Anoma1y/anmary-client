import config from './config';

export default class News {

  constructor(http) {
    this.http = http;
  }

  add(data) {
    return this.http.post(config.ADD, {
      ...data
    });
  }

  edit(news_id, data) {
    return this.http.patch(`${config.EDIT}/${news_id}`, {
      ...data
    });
  }

  getList() {
    return this.http.get(config.GET_LIST);
  }

  getSingle(news_id) {
    return this.http.get(`${config.GET_SINGLE}/${news_id}`);
  }

}

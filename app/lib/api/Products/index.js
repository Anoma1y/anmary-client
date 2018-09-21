import config from './config';

export default class Products {

  constructor(http) {
    this.http = http;
  }

  add(data) {
    return this.http.post(config.ADD, {
      ...data
    });
  }

  edit(product_id, data) {
    return this.http.patch(`${config.EDIT}/${product_id}`, {
      ...data
    });
  }

  getList(page, num_on_page, filter, params) {
    return this.http.get(`${config.GET_LIST}?page=${page}&num_on_page=${num_on_page}${filter === '' ? filter : `&${filter}`}`);
  }

  getListV1(filter = '', limit = 4) {
    return this.http.get(`${config.GET_LIST_V1}?limit=${limit}${filter === '' ? filter : `&${filter}`}`);
  }

  getSingle(product_id) {
    return this.http.get(`${config.GET_SINGLE}/${product_id}`);
  }

}

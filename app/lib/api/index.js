import axios from 'axios';
import config from './config';
import AuthApiModule from './Auth';
import CategoryApiModule from './Category';
import SeasonApiModule from './Season';
import BrandApiModule from './Brand';
import ImagesApiModule from './Images';
import UsersApiModule from './Users';
import SizeApiModule from './Size';
import CompositionApiModule from './Composition';
import RolesApiModule from './Roles';
import CompoundsApiModule from './Compounds';

class Api {

  constructor() {
    this.code = config.STATUS_CODES;

    this.http = axios.create({
      baseURL: config.BASE_URL,
      timeout: config.TIMEOUT,
      headers: {
        ...config.HEADERS
      }
    });

    this.registerBeforeInterceptor();
    this.registerAfterInterceptor();

    this.auth = new AuthApiModule(this.http);
    this.category = new CategoryApiModule(this.http);
    this.images = new ImagesApiModule(this.http);
    this.users = new UsersApiModule(this.http);
    this.roles = new RolesApiModule(this.http);
    this.compounds = new CompoundsApiModule(this.http);
    this.season = new SeasonApiModule(this.http);
    this.brand = new BrandApiModule(this.http);
    this.composition = new CompositionApiModule(this.http);
    this.size = new SizeApiModule(this.http);
  }

  /**
   * Метод для добавления заголовка
   * @param key - ключ
   * @param value - значение
   * @returns {Promise<any>} - для асинхронного выполнения выполняется обещание
   */
  addHeader(key, value) {
    return new Promise((resolve) => {

      this.http.defaults.headers = {
        ...this.http.defaults.headers,
        [key]: value
      };
      resolve();

    });
  }

  /**
   * Удаление заголовка
   * @param key - заголовок
   */
  removeHeader(key) {
    if (key in this.http.defaults.headers) {
      delete this.http.defaults.headers[key];
    }
  }

  registerBeforeInterceptor() {
    this.http.interceptors.request.use(
      // Do something before request is made
      (config) => config,

      // Do something if there is something wrong with request
      (error) => Promise.reject(error)
    );
  }

  registerAfterInterceptor() {
    this.http.interceptors.response.use(
      // Do something with successful response
      (response) => response,

      // Do something with response error
      (error) => Promise.reject(error)
    );
  }
}

export const api = new Api();

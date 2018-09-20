const storage = window.localStorage; // todo возможно, переделать в sessionStorage

export default {

  /**
   * Метод для добавления данных в локальное хранилище
   * @param key - ключ
   * @param value - значение, может быть или объектом или number | string | boolean
   */
  set(key, value) {
    if (typeof value === 'object') {
      storage.setItem(key, JSON.stringify(value));
    } else {
      storage.setItem(key, String(value));
    }
  },

  check(key) {
    return storage.getItem(key) !== null;
  },

  /**
   * Метод для извлечения данных из локального хранилища
   * @param key - ключ, по которому будут извлекаться данные
   * @returns {*} - если ничего не найдено, то вернет null
   */
  get(key) {
    const store = storage.getItem(key);

    if (store === null) {
      return null;
    }

    return JSON.parse(store);

  },

  /**
   * Метод для очистки локального хранилища
   * @param key - если ключ не указан, то очиститься всё хранилище
   */
  clear(key) {

    if (key) {
      storage.removeItem(key);
    } else {
      storage.clear();
    }

  }
};

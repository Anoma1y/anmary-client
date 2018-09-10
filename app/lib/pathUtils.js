import _ from 'lodash';

/**
 * Функция для преобразования первого символа строки в верхний регистр
 * @param item строка для преобразования
 * @returns {string}
 */
export const upperFirstCase = (item) => {
  if (item) {
    return `${item.charAt(0)
      .toUpperCase()}${item.slice(1)}`;
  }
  return '';
};

/**
 * Функция для преобразования первого символа строки в нижний регистрв
 * @param item строка для преобразования
 * @returns {string}
 */
export const lowerFirstCase = (item) => {
  if (item) {
    return `${item.charAt(0)
      .toLowerCase()}${item.slice(1)}`;
  }
  return '';
};

/**
 * Функция для преобразования строки в верхний регистрв
 * @param item строка для преобразования
 * @returns {string}
 */
export const upperCase = (item) => {
  if (item) {
    return item.toUpperCase();
  }
  return '';
};

/**
 * Функция для преобразования строки в нижний регистр
 * @param item строка для преобразования
 * @returns {string}
 */
export const lowerCase = (item) => {
  if (item) {
    return item.toLowerCase();
  }
  return '';
};

/**
 * Функция для парсера ссылок
 * @param path полный путь
 * @returns {Array} объектов, содержащих key - ключ, name - имя ссылки и link - ссылка
 */
export const getPathInfo = (path) => {
  return _.compact(path.split('/').map((p, i, arr) => {
    // if (!/[^\d]/.test(p)) return undefined;

    if (p !== '') {
      let link = arr.slice(0, i + 1).join('/');

      if (link.charAt(link.length - 1) !== '/') {
        link = `${link}/`;
      }
      return {
        key: i,
        name: p,
        link
      };
    }
    return undefined;
  }));
};

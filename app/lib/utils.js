/**
 * Функция для вывода всех значений объекта и вложенных в данный объект объектов
 * @param object - объект для вычисления
 * @returns {Array}
 */
export const getValuesDeep = (object) => {
  const arr = [];

  const getVal = (obj) => {
    for (const key in obj) {
      switch (typeof obj[key]) {
        case 'object':
          getVal(obj[key]);
          break;
        case 'boolean':
          arr.push(obj[key] ? 1 : 0);
          break;
        default:
          arr.push(obj[key]);
      }
    }
  };

  getVal(object);
  return arr;
};

/**
 * Функция для удаления ключей с undefined свойствами
 * @param obj - исходный объект
 * @returns {*}
 */
export const removeEmpty = (obj) => {
  Object.keys(obj).forEach(key => {
    ((obj[key]) && typeof obj[key] === 'object') && removeEmpty(obj[key]) || (obj[key] === undefined) || (obj[key] === null) && delete obj[key];
  });
  return obj;
};

/**
 * Функция для преобразования base64 в формат file
 * @param base64 - код base64
 * @param filename - название файла
 * @returns {File}
 */
export const dataURLtoFile = (base64, filename) => {
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

export const parseParams = (str) => {
  if (str.length === 0) return null;

  const query = {};
  const pairs = (str[0] === '?' ? str.substr(1) : str).split('&');
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
};

export const serializeParams = (obj) => {
  const str = [];

  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      if (_.isArray(obj[p])) {
        str.push(`${encodeURIComponent(p)}=${obj[p]}`);
        continue;
      }
      str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
    }
  }
  return str.join('&');
};

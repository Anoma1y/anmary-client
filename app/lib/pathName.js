const TRANSLATE = {
  'admin': 'Административная панель',
  'products': 'Товары',
  'users': 'Пользователи',
  'roles': 'Роли',
  'categories': 'Категории',
  'brands': 'Бренды',
  'seasons': 'Сезоны',
  'new': 'Добавление',
  'edit': 'Изменение',
};

export default (pathname) => TRANSLATE[pathname] || pathname;

function getMenu(path) {
  let menu = [
    {
      url: '/',
      title: 'Home',
    },
    {
      url: '/about',
      title: 'About',
    },
    {
      url: '/tienda',
      title: 'Tienda'
    },
    {
        url: '/contact',
        title: 'Contact'
    },
    {
      url: '/todo',
      title: 'ToDo',
    }
  ];
  menu = menu.map(item => {
    item.active = item.url === path;
    return item;
  });
  return menu;
}

module.exports = {
    getMenu: getMenu,
};
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
      url: '/contact',
      title: 'Contact'
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
window.addEventListener('load', () => {

  const app = document.querySelector('#app');
  const input = app.querySelector('input');
  const list = app.querySelector('.list-group');

  var elements = [];

  // auto enfocar input
  input.focus();

  input.addEventListener('keydown', ({ keyCode, target }) => {
    if(keyCode === 13){
      elements.push({
        text: target.value,
        checked: false,
      });
      target.value = '';
      render();
    }
  });

  function render(){
    list.innerHTML = '';
    list.append(...elements.map(getTask));
  }

  function getTask(elem, index) {
    const { text, checked } = elem;
    var item = document.createElement('div');
    item.setAttribute('class', 'list-group-item');
    item.innerHTML = `
      <label>
        <input type="checkbox" ${checked ? 'checked' : ''} />
        ${text}
      </label>
      <span class="badge badge-danger float-right">x</span>
    `;
    item.querySelector('label').addEventListener('click', (e) => {
      e.preventDefault();
      let checkbox = item.querySelector('input');
      elem.checked = !checkbox.checked;
      render();
    });
    item.querySelector('.badge').addEventListener('click', (e) => {
      elements.splice(index, 1);
      render();
    });
    return item;
  }

});
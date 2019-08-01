window.addEventListener('load', () => {

  const app = document.querySelector('#app');

  var elements = [];
  render();

  function render(){
    const itemsLeft = elements.reduce((prev, { checked }) => !checked ? prev + 1 : prev, 0);

    app.innerHTML = `
      <div class="card-body">
        <header class="form-group">
          <label>Nueva Tarea</label>
          <input type="text" class="form-control w-100" placeholder="Escribe la siguiente tarea">
        </header>
        <section class="list-group"></section>
        <footer ${elements.length > 0 ? '' : 'hidden'}>
          <p class="mb-0 mt-4">
            <span>${itemsLeft} elemento${itemsLeft === 1 ? '' : 's'} restante${itemsLeft === 1 ? '' : 's'}</span>
          </p>
        </footer>
      </div>
    `;

    // seleccionar input
    const input = app.querySelector('input');
    // evento del input
    input.addEventListener('keydown', handleInput);

    // seleccionar lista de tareas
    const list = app.querySelector('.list-group');
    // llenar lista de tareas
    list.append(...elements.map(getTask));
  }

  function handleInput({ keyCode, target }) {
    if(keyCode === 13){
      elements.push({
        text: target.value,
        checked: false,
      });
      target.value = '';
      render();
    }
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
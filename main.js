window.addEventListener('load', () => {

  var elements = [];
  var elementsFiltered = [ ...elements ];
  var filter = false;
  render();

  function render(){
    const itemsLeft = elements.reduce((prev, { checked }) => !checked ? prev + 1 : prev, 0);

    const app = document.querySelector('#app');
    app.innerHTML = `
      <div class="card-body">
        <header class="form-group mb-0">
          <label>Nueva Tarea</label>
          <input type="text" class="form-control w-100" placeholder="Escribe la siguiente tarea">
        </header>

        <section class="list-group mt-4" ${elements.length > 0 ? '' : 'hidden'}></section>

        <footer class="mt-4 justify-content-between ${elements.length > 0 ? 'd-flex' : 'd-none'}">
          <div>${itemsLeft} elemento${itemsLeft === 1 ? '' : 's'} restante${itemsLeft === 1 ? '' : 's'}</div>
          <div class="filters">
            <button class="btn btn-sm btn-outline-secondary">Todos</button>
            <button class="btn btn-sm btn-outline-secondary">Completados</button>
            <button class="btn btn-sm btn-outline-secondary">Restantes</button>
          </div>
        </footer>
      </div>
    `;

    // seleccionar input
    const input = app.querySelector('input');
    // auto-enfocar input
    input.focus();
    // evento del input
    input.addEventListener('keydown', handleInput);

    // filtrar lista
    elementsFiltered = elements.filter(({ checked }) => {
      switch(filter){
        case 'completed': return checked;
        case 'uncompleted': return !checked;
        default: return true;
      }
    });
    // seleccionar lista de tareas
    const list = app.querySelector('.list-group');
    // llenar lista de tareas
    list.append(...elementsFiltered.map(getTask));

    // setear filters
    setFilters(...app.querySelectorAll('.filters .btn'));
  }

  function handleInput({ keyCode, target: { value } }) {
    if(keyCode === 13 && value){
      elements.push({
        text: value,
        checked: false,
      });
      render();
    }
  }

  function setFilters(all, completed, uncompleted) {
    all.addEventListener('click', () => {
      filter = false;
      render();
    });
    completed.addEventListener('click', () => {
      filter = 'completed';
      render();
    });
    uncompleted.addEventListener('click', () => {
      filter = 'uncompleted';
      render();
    });
  }

  function getTask(elem, index) {
    const { text, checked } = elem;
    var item = document.createElement('div');
    item.setAttribute('class', 'list-group-item');
    item.innerHTML = `
      <input type="checkbox" ${checked ? 'checked' : ''} />
      <label>
        ${text}
      </label>
      <button class="close text-danger">
        <span>&times;</span>
      </button>
    `;
    item.querySelector('input').addEventListener('click', (e) => {
      elem.checked = e.target.checked;
      render();
    });
    item.querySelector('.close').addEventListener('click', (e) => {
      elements.splice(index, 1);
      render();
    });
    return item;
  }

});
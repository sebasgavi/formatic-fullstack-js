setInterval(() => {
    var app = document.querySelector('#app');

    // app.innerHTML += '<input class="hoadasndan" />';

    var input = document.createElement('input');
    input.setAttribute('class', 'laclase');
    app.appendChild(input);
}, 2000);
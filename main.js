function ocultar(elemento){
    //var elemento = document.querySelector('.card');
    elemento.setAttribute('hidden', true);
}



var cards = document.querySelectorAll('.card');
cards.forEach(function(card, index){
    var btn = card.querySelector('.btn');
    btn.addEventListener('click', function(){
        //ocultar(card);
        var popup = document.querySelector('.popup');
        //console.log();
        popup.removeAttribute('hidden');
        //popup.innerHTML = '<h1>hola ' + (index+1) + '</h1>';
        
        var titulo = document.createElement('h1');
        titulo.innerText = card.getAttribute('data-titulo');
        
        titulo.addEventListener('click', function(){
            this.remove();
        });
        popup.appendChild(titulo);
        
    });
});




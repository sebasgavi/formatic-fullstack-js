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


// deconstrucción de objetos
var persona = {
    edad: 10,
    nombre: 'Sebas',
    estadoCivil: 'soltero',
    titulos: {
        uno: 'Universitario'
    }
}
const { nombre, edad, estadoCivil, titulos: { uno } } = persona;
console.log(`Hola, soy ${nombre}, tengo ${edad} años y soy ${estadoCivil}. ${uno}`);

// deconstrucción de arreglos
function par(){
    var a = Math.random() * 100;
    var b = Math.random() * 100;

    return [ a, b ];
}
var [ a, b ] = par();
console.log(a, b);


var personas = [
    {
        nombre: 'Andŕes',
        edad: 20,
        estadoCivil: 'soltero'
    }
];
personas.push({
    nombre: 'Sebas',
    edad: 10,
    estadoCivil: 'soltero'
});
let sofia = {
    nombre: 'Sofía',
    edad: 22,
    estadoCivil: 'casada',
};
personas.push(sofia);

// función map con deconstrucción de objetos
var copia = personas.map(({ nombre, edad, estadoCivil }) => {
    //const { nombre, edad, estadoCivil } = pers;
    return `Hola, soy ${nombre}, tengo ${edad} años y soy ${estadoCivil}.`;
});
console.log(copia);

// parar iteración
var res = personas.some(({ edad }) => {
    console.log(edad);
    if(edad === 10){
        return true;
    }
});
console.log(res);


var numeros = [10, 20, 45, '30', 10];
/*var total = 0;
for(let i = 0; i < numeros.length; i++){
    total += numeros[i];
}*/
var inicial = 20;
var total = numeros.reduce((total, num) => {
    return total + num;
}, inicial);
console.log(total);


var solteros = personas.reduce((solteros, { estadoCivil }) => {
    if(estadoCivil === 'casada'){
        solteros++;
    }
    return solteros;
}, 0);
console.log(solteros);

// estados = { casado: 1, solter: 1 };
// estadoCivil = 'casado';
var agrupaciones = personas.reduce((estados, { estadoCivil }) => {
    if(estados[estadoCivil]){
        estados[estadoCivil]++;
    } else {
        estados[estadoCivil] = 1;
    }
    return estados;
}, {});
console.log(agrupaciones);

var posibilidades = personas.reduce((estados, { estadoCivil }) => {
    if(estados.indexOf(estadoCivil) < 0){
        estados.push(estadoCivil);
    }
    return estados;
}, []);
console.log(posibilidades);







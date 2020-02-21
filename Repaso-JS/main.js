//alert('hola soy juan david')

var nombre = "victor";
var altura = 190;

/*

var contactenacion = nombre + " "+ altura;
//document.write(contactenacion);

/*var datos = document.getElementById("datos");
datos.innerHTML = contactenacion;*/

/*
var datos = document.getElementById("datos");
datos.innerHTML =  `

    <h1>Soy la caja de datos </h1>
    <h2>mi nombre es: ${nombre} </h2>
    <h3> mi altura es: ${altura} </h3>
`;

if(altura >= 190){
    datos.innerHTML += `
    <h1>Eres una persona Alta</>
    `
}else{
    datos.innerHTML += 'eres una persona bajita';
}

for ( var i=0; i<=2020; i++){
    //bloque
    datos.innerHTML += "<h2>Estamos en el año:" +i ;
}

*/
/*function Muestraminombre(nombre, altura) {
    var datos = document.getElementById("datos");
datos.innerHTML =  `

    <h1>Soy la caja de datos </h1>
    <h2>mi nombre es: ${nombre} </h2>
    <h3> mi altura es: ${altura} </h3>
`;

Muestraminombre(nombre, altura);
}*/



/*
function Muestraminombre(nombre, altura) {
    var datos = document.getElementById("datos");
    var misdatos =  `

    <h1>Soy la caja de datos </h1>
    <h2>mi nombre es: ${nombre} </h2>
    <h3> mi altura es: ${altura} </h3>
`;
return misdatos;
}

function imprimir(){
    var datos = document.getElementById("datos");
    datos.innerHTML += Muestraminombre(nombre, altura);
}

imprimir();
*/


// arrays ---------------------------------

//var nombres = ['victor', 'antinio','joaquin']; //colecion de string
//alert(nombres[0]);// imprime a victor

/*
document.write('listado denombres'); // imprime el array completo
for( var i = 0; i< nombres.length; i++){
    document.write(nombres[i]+`<br/>`);
}*/



//foreach-----------------------------------
/*
nombres.forEach((nombre) =>{
    document.write(nombre + '<br/>')
});
*/

// obejetos -------------------------------

var coche = {
    modelo: 'Mercedes Clase A',
    maxima: 500,
    antiguedad: 2020,

    mostrarDatos(){
        console.log(this.modelo,this.maxima,this.antiguedad);
    },
    propiedad1: "valor aleatorio"
}

document.write("<h1> "+coche.modelo+"<h1/>");
document.write("<h1> "+coche.antiguedad+"<h1/>");

coche.mostrarDatos();
console.log(coche);


// promesas---------------------------------
var saludar = new Promise((resolve, reject) =>{
    setTimeout(() => {
        let saludo = "Hola muy buenas a todos!!!";
        saludo = false; 
        if(saludo){
            resolve(saludo);
        }else{
            reject("no hay saludo disponible")
        }
    }, 2000);
})

saludar.then(resultado =>{
    alert(resultado);
})
.catch(err =>{
    alert(err);
});



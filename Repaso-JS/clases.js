//clases, permiten generar un molde -------------
//tiene propiedades
// tiene acciones

class Coche {
    constructor(modelo, velocidad, antiguedad){
        this.modelo = modelo;
        this.velocidad = velocidad;
        this.antiguedad = antiguedad;
    }

    aumentarVelociadad(){
        this.velocidad += 1; 
        
    }

    reducirVelocidad(){
        this.velocidad -= 1; 
    }
}

// herencia ------------------
class Autobus extends Coche{
    constructor(modelo, velocidad, antiguedad){
        super(modelo, velocidad, antiguedad);
        this.altura = 5;
    }
    mostrarAltura(){
        return "la altura del bus es "+this.altura;
    }
}

var autobus1 = new Autobus('Pegasus',300,1991);
console.log(autobus1.mostrarAltura());
////------------------------------------


var choche1 = new Coche('BMW', 200 , 2017);
var choche2 = new Coche('AUDI', 100 , 2018);
var choche3 = new Coche('MERCEDES', 200 , 2017);
var choche4 = new Coche('RENAULT', 200 , 2017);

//console.log(choche1);
document.write("<h1>velocidad: "+choche1.velocidad+"<h1/>");
//console.log(choche1)
choche1.aumentarVelociadad(); // modifica el valor de la VEL del objeto
choche1.aumentarVelociadad();
choche1.aumentarVelociadad();
document.write("<h1>velocidad: "+choche1.velocidad+"<h1/>");
//console.log(choche1);




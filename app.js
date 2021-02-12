'use strict'

//Crear tablas dinámicas

function generaTabla(cantFilas) {
    window.modal.closeCurrent()
    // Obtener la referencia del elemento body
    var body = document.getElementsByTagName("body")[0];

    // Crea un elemento <table> y un elemento <tbody>
    var tabla = document.createElement("table");
    var tblBody = document.createElement("tbody");

    // Crea las celdas
    for (var i = 0; i < cantFilas; i++) {
        // Crea las hileras de la tabla
        var hilera = document.createElement("tr");

        for (var j = 0; j < cantFilas; j++) {
            // Crea un elemento <td> y un nodo de texto, haz que el nodo de
            // texto sea el contenido de <td>, ubica el elemento <td> al final
            // de la hilera de la tabla
            var celda = document.createElement("td");
            var textoCelda = document.createTextNode(getRandomSymbol());
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
        }

        // agrega la hilera al final de la tabla (al final del elemento tblbody)
        tblBody.appendChild(hilera);
    }

    // posiciona el <tbody> debajo del elemento <table>
    tabla.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tabla);
    // modifica el atributo "border" de la tabla y lo fija a "9";
    tabla.setAttribute("border", "2");
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


function getRandomSymbol() {
    const number = getRandomInt(0,5);
    switch (number){
        case 0: 
        return "🚀";
        case 1: 
        return "👽";
        case 2: 
        return "🤖";
        case 3: 
        return "🛸";
        case 4: 
        return "👾";
    }
}
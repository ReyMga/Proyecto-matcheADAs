'use strict'

//Crear tablas dinámicas
var $ = function( id ) { return document.getElementById( id ); }
const gridContainer = document.getElementById('gridContainer');
let selectedCell = null;

function generaTabla(cantFilas) {
    window.modal.closeCurrent()
    // Obtener la referencia del elemento body
    const body = document.getElementsByTagName("body")[0];

    // Creo un elemento <table> y un elemento <tbody>
    const tabla = document.createElement("table");
    const tblBody = document.createElement("tbody");

    // Creo las celdas
    for (let i = 0; i < cantFilas; i++) {
     
        const hilera = document.createElement("tr");
        for (var j = 0; j < cantFilas; j++) {
          
            const celda = document.createElement("td");
            celda.id = 'cell_'+i+j;
            celda.row = i;
            celda.column = j;
            
            const textoCelda = document.createTextNode(getRandomSymbol());
            const span = document.createElement("span");
            span.className = 'cell-element';
            span.appendChild(textoCelda);
            celda.appendChild(span);
            celda.addEventListener('click', ()=>{
             seleccionarCelda(celda)
            })
            hilera.appendChild(celda);
        }
        tblBody.appendChild(hilera);
    }

    tabla.appendChild(tblBody);

    body.appendChild(tabla);
    gridContainer.appendChild(tabla);
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

//Funcion para generar iconos random
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

//Función para seleccionar celda

function seleccionarCelda(celda){
    if(!selectedCell){
        selectedCell = {
            row : celda.row, 
            column : celda.column
        }
        //celda.style.border='';
        celda.firstElementChild.className = 'cell-element-selected';
    }else{
        if(!nextSelectedItem(celda.row,celda.column)){
            //Despinto la seleccionada y pinto el nuevo item seleccionado
            let oldSelectedCell = $('cell_'+ selectedCell.row + selectedCell.column);
            //oldSelectedCell.style.border = 'none';
            oldSelectedCell.firstElementChild.className = 'cell-element';
            celda.firstElementChild.className = 'cell-element-selected';
            selectedCell = {
                row : celda.row, 
                column : celda.column
            }
        }

    }
}


function nextSelectedItem(i,j){
    return false;
}

//Funcion para el límite de tiempo de juego



var n = 0;
const l = document.getElementById("timeCounter");
window.setInterval(function(){
  

  l.innerHTML = '0:' + n.toString().padStart(2, '0');
  n++;
},1000);

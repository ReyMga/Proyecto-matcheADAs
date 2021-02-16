'use strict'

//Crear tablas dinámicas
var $ = function (id) {
    return document.getElementById(id);
}
const l = document.getElementById("timeCounter");
const gridContainer = document.getElementById('gridContainer');
let selectedCell = null;
let nivel;
let paused=false;
let timmer;

//Boton reiniciar juego con mismo nivel de partida
function reiniciar()
{
    generaTabla(nivel);
}

function generaTabla(cantFilas) {
    nivel=cantFilas;
    window.modal.closeCurrent()
    counterInitialitation();
    // Obtener la referencia del elemento body
    const body = document.getElementsByTagName("body")[0];
    gridContainer.innerHTML='';
    // Creo un elemento <table> y un elemento <tbody>
    const tabla = document.createElement("table");
    const tblBody = document.createElement("tbody");

    // Creo las celdas
    for (let i = 0; i < cantFilas; i++) {

        const hilera = document.createElement("tr");
        for (var j = 0; j < cantFilas; j++) {

            const celda = document.createElement("td");
            celda.id = 'cell_' + i + j;
            celda.row = i;
            celda.column = j;

            const textoCelda = document.createTextNode(getRandomSymbol());
            const span = document.createElement("span");
            span.className = 'cell-element';
            span.appendChild(textoCelda);
            celda.appendChild(span);
            celda.addEventListener('click', () => {
                seleccionarCelda(celda)
            })
            hilera.appendChild(celda);
        }
        tblBody.appendChild(hilera);
    }

    tabla.appendChild(tblBody);

    //body.appendChild(tabla);
    gridContainer.appendChild(tabla);
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

//Funcion para generar iconos random
function getRandomSymbol() {
    const number = getRandomInt(0, 5);
    switch (number) {
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

function seleccionarCelda(celda) {
    if (!selectedCell) {
        selectedCell = {
            row: celda.row,
            column: celda.column
        }
        //celda.style.border='';
        celda.firstElementChild.className = 'cell-element-selected';
    } else {
        if (!nextSelectedItem(celda.row, celda.column)) {
            //Despinto la seleccionada y pinto el nuevo item seleccionado
            let oldSelectedCell = $('cell_' + selectedCell.row + selectedCell.column);
            //oldSelectedCell.style.border = 'none';
            oldSelectedCell.firstElementChild.className = 'cell-element';
            celda.firstElementChild.className = 'cell-element-selected';
            selectedCell = {
                row: celda.row,
                column: celda.column
            }
        }

    }
}


function nextSelectedItem(i, j) {
    return false;
}


//Funcion para el límite de tiempo de juego
function counterInitialitation() {
    var n = 30;
    l.innerHTML = '0:' + n.toString().padStart(2, '0');
    n--;
    timmer = window.setInterval(function () {
        if(!paused)
        {
            l.innerHTML = '0:' + n.toString().padStart(2, '0');
            n--;
            if(n<0){
                clearInterval(timmer);
                window.modal.open('gameOverModal');
            }
        }
    }, 1000);
}


//Boton nuevo juego al finalizar partida

function newGame(){
    window.modal.closeCurrent()
    window.modal.open('miniModal');
}



//Boton información

function informationButton(){
    paused=true;
    window.modal.open('awesome');

}


function empezarJuego(){
    window.modal.closeCurrent();
    !paused ?  window.modal.open('miniModal') : paused=false;
}


//Boton Restart
function restartButtonGame(){
    paused=true;
    window.modal.open('leaveGame');
}

function dontRestartGame(){
    window.modal.closeCurrent();
    !paused ?  window.modal.open('leaveGame') : paused=false;
}

function newRestartGame(){
    paused=false;
    clearInterval(timmer);
    window.modal.closeCurrent();
    window.modal.open('miniModal');
}



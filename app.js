'use strict'

//Crear tablas dinámicas
var $ = function (id) {
    return document.getElementById(id);
}
const l = document.getElementById("timeCounter");
const gridContainer = document.getElementById('gridContainer');
let selectedCell = null;
let nivel;
let timeAnimation = 400;
let paused = false;
let timmer;
let changeBox = 1
let comboBox = 1
let canMove = true;

//Boton reiniciar juego con mismo nivel de partida
function reiniciar() {
    generaTabla(nivel);
}

function generateCell(i, j) {
    const celda = document.createElement("td");
    celda.id = 'cell_' + i + j;
    celda.row = i;
    celda.column = j;
    const textoCelda = document.createTextNode(getRandomSymbol());
    const span = document.createElement("span");
    span.classList.add("cell-element");
    span.appendChild(textoCelda);
    celda.appendChild(span);
    celda.addEventListener('click', (e) => {
        seleccionarCelda(e.target.parentElement.id)
    })
    return celda;
}

function generaTabla(cantFilas) {
    nivel = cantFilas;
    window.modal.closeCurrent()
    counterInitialitation();
    // Obtener la referencia del elemento body
    gridContainer.innerHTML = '';
    // Creo un elemento <table> y un elemento <tbody>
    const tabla = document.createElement("table");
    const tblBody = document.createElement("tbody");

    // Creo las celdas
    for (let i = 0; i < cantFilas; i++) {
        const hilera = document.createElement("tr");
        for (var j = 0; j < cantFilas; j++) {
            const celda = generateCell(i, j);
            hilera.appendChild(celda);
        }
        tblBody.appendChild(hilera);
    }

    tabla.appendChild(tblBody);

    //body.appendChild(tabla);
    gridContainer.appendChild(tabla);
}


function getItemRandm(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

//Funcion para generar iconos random
function getRandomSymbol() {
    const number = getItemRandm(0, 5);
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

function seleccionarCelda(id) {
    const celda = $(id);
    if (!selectedCell) {
        selectedCell = {
            row: celda.row,
            column: celda.column
        }
        //celda.style.border='';
        //celda.firstElementChild.className = 'cell-element-selected';
        celda.firstChild.classList.remove("cell-element");
        celda.firstChild.classList.add("cell-element-selected");
    } else {
        if (!iconsAdjacent(celda, selectedCell)) {
            //Despinto la seleccionada y pinto el nuevo item seleccionado
            let oldSelectedCell = $('cell_' + selectedCell.row + selectedCell.column);
            //oldSelectedCell.style.border = 'none';
            //oldSelectedCell.firstElementChild.className = 'cell-element';
            oldSelectedCell.firstChild.classList.remove("cell-element-selected");
            oldSelectedCell.firstChild.classList.add("cell-element");
            //celda.firstElementChild.className = 'cell-element-selected';
            celda.firstChild.classList.remove("cell-element");
            celda.firstChild.classList.add("cell-element-selected");
            selectedCell = {
                row: celda.row,
                column: celda.column
            }
        } else {
            //console.log('Es Adyacente')
            moveIcons(celda, selectedCell);
        }

    }
}


const iconsAdjacent = (a, b) => {
    const ar = a.row;
    const ac = a.column;
    const br = b.row;
    const bc = b.column;

    return (
        (Math.abs(ar - br) <= 1 && ac - bc === 0) ||
        (Math.abs(ac - bc) <= 1 && ar - br === 0)
    )
}

//Switchear Emojis

const switchIcons = (a, b) => {
    const cellA = $('cell_' + a.row + a.column);
    const cellB = $('cell_' + b.row + b.column);

    const temporary = cellA.firstChild.innerHTML;
    cellA.firstChild.innerHTML = cellB.firstChild.innerHTML;
    cellB.firstChild.innerHTML = temporary;



    cellA.firstChild.classList.remove("cell-element-selected");
    cellA.firstChild.classList.add("cell-element");
    cellB.firstChild.classList.remove("cell-element-selected");
    cellB.firstChild.classList.add("cell-element");

    selectedCell = null;
}

//Funcion para el límite de tiempo de juego
function counterInitialitation() {
    var n = 30;
    l.innerHTML = '0:' + n.toString().padStart(2, '0');
    n--;
    timmer = window.setInterval(function () {
        if (!paused) {
            l.innerHTML = '0:' + n.toString().padStart(2, '0');
            n--;
            if (n < 0) {
                clearInterval(timmer);
                window.modal.open('gameOverModal');
            }
        }
    }, 1000);
}


//Boton nuevo juego al finalizar partida

function newGame() {
    window.modal.closeCurrent()
    window.modal.open('miniModal');
}



//Boton información

function informationButton() {
    paused = true;
    window.modal.open('awesome');

}


function empezarJuego() {
    window.modal.closeCurrent();
    !paused ? window.modal.open('miniModal') : paused = false;
}


//Botones de  Restart
function restartButtonGame() {
    paused = true;
    window.modal.open('leaveGame');
}

function dontRestartGame() {
    window.modal.closeCurrent();
    !paused ? window.modal.open('leaveGame') : paused = false;
}

function newRestartGame() {
    paused = false;
    clearInterval(timmer);
    window.modal.closeCurrent();
    window.modal.open('miniModal');
}


function restartBox() {
    changeBox = 1;
    $('points').innerText = changeBox;
}



// //Bloques verticales y horizonatales

const horizontalBlock = () => {
    let tablita = $('gridContainer').firstChild.firstChild;
    let trs = tablita.querySelectorAll('tr');

    for (let i = 0; i < trs.length; i++) {
        let rowCells = trs[i].querySelectorAll('td');
        for (let j = 0; j < rowCells.length; j++) {
            let iguales = 0
            for (let k = j; k < rowCells.length; k++) {
                if (rowCells[j].innerText === rowCells[k].innerText) {
                    iguales++
                } else {
                    if (iguales >= 3) {
                        return {
                            x: j,
                            y: i,
                            columnas: iguales
                        }
                    } else {
                        iguales = 1
                        j = k
                    }
                }
            }
            if (iguales >= 3) {
                return {
                    x: j,
                    y: i,
                    columnas: iguales
                }
            }
        }
    }
}


const verticalBlock = () => {
    let tablita = $('gridContainer').firstChild.firstChild;
    let trs = tablita.querySelectorAll('tr');

    for (let j = 0; j < trs[0].querySelectorAll('td').length; j++) {
        for (let i = 0; i < trs.length; i++) {
            let iguales = 1
            let k = i + 1;
            for (;k < trs.length; k++) {
                if (trs[i].querySelectorAll('td')[k] && trs[i].querySelectorAll('td')[j].innerText === trs[k].querySelectorAll('td')[j].innerText) {
                    iguales++
                } else {
                    if (iguales >= 3) {
                        return {
                            x: j,
                            y: k - iguales,
                            filas: iguales
                        }
                    }
                    iguales = 1
                    i = k
                }
            }
            if (iguales >= 3) {
                return {
                    x: j,
                    y: k - iguales,
                    filas: iguales
                }
            }
        }
    }
}



// //Borrar Bloques

const aditionBox = () => {
    changeBox++
    $('points').innerHTML = changeBox
}

const deleteBlocks = () => {
    //console.log('DEL')
    const blocks = findBlocks()
    canMove = false

    if (blocks) {
        aditionBox()
        deleteBox(blocks)
        //setTimeout(getdownBlocks, 200)
        //setTimeout(deleteBlocks, timeAnimation * 2 + 100)
    } else {
        canMove = true
        restartBox()
    }
}


// /***************************************************** */
//modificar 
const getDown = () => {
    let tablita = $('gridContainer').firstChild.firstChild;
    let trs = tablita.querySelectorAll('tr');
  
    for (let i = 1; i < trs.length; i++) {
        let myRow = trs[i].querySelectorAll('td');
      for (let j = 0; j < myRow[i].length; j++) {
        if (trs[i].querySelectorAll('td')[j] === null) {
          const cuadradoAnterior = obtenerCuadrado(j, i - 1)
          if (cuadradoAnterior) {
            return cuadradoAnterior
          }
        }
      }
    }
  
    return null
}

const rellenarEspacios = () => {
    let tablita = $('gridContainer').firstChild.firstChild;
    let trs = tablita.querySelectorAll('tr');
  
    for (let i = 0; i < nivel; i++) {
        for (let j = 0; j < nivel; j++) {
            const cuadrado = $(`cell_${i}${j}`)
            if(!cuadrado){
                const celda = generateCell(i, j);
                trs[i].appendChild(celda);    
            }
        }
    }  

    
    //Cambiar nombres de celdas. 
    const celdas = document.querySelectorAll('td');
    let c=0;
    for (let i = 0; i < nivel; i++) {
        for (let j = 0; j < nivel; j++) {
            celdas[c].id=`cell_${i}${j}`
            celdas[c].row=i;
            celdas[c].column=j;
            c++;
        }
    }  

    
    /*
    for (let i = 0; i < trs.length; i++) {
        let myRow = trs[i].querySelectorAll('td');
      for (let j = 0; j < myRow.length; j++) {
        if (trs[i].querySelectorAll('td')[j] === null) {
            //Crear TR y Rellenar con Simbolo
            const celda = generateCell(i, j);
            trs[i].appendChild(celda);
        }
      }
    }*/


    //dibujarGrilla()
}
  

const getdownBlocks = () => {
    let cuadrado = getDown()
  
    while (cuadrado) {
      const espaciosVacios = obtenerCantidadEspaciosDebajo(
        cuadrado.dataset.x,
        cuadrado.dataset.y
      )
      descenderCuadrado(cuadrado, espaciosVacios)
      cuadrado = obtenerCuadradoPuedeDescender()
    }
  
//     setTimeout(rellenarEspacios, timeAnimation)
 }


// /******************************************************* */





const deleteBox = (blockCell) =>{
    let tablita = $('gridContainer').firstChild.firstChild;
    let trs = tablita.querySelectorAll('tr');
    for (let blocks of blockCell ) {
     if(blocks.columnas) {
        for (let j = blocks.x; j < blocks.x + blocks.columnas; j++) {
            //trs[blocks.y].querySelectorAll('td')[j] = ''
            const cuadrado = $(`cell_${blocks.y}${j}`)
            if (cuadrado) {
                cuadrado.classList.add('eliminado');
                cuadrado.remove()
  
            }
         }
     }
     if (blocks.filas) {
        for (let i = blocks.y; i < blocks.y + blocks.filas; i++) {
          //grilla[i][bloque.x] = null
          const cuadrado =  $(`cell_${i}${blocks.x}`)
          if (cuadrado) {
            cuadrado.classList.add('eliminado')
            cuadrado.remove()
            /*setTimeout(() => {
              cuadrado.remove()
              puntos += 100 * modificadorCombo
              actualizarPuntos()
            }, 200)*/
          }
        }
      }
    }
    
    setTimeout(()=>{
        //points.innerText += 100* changeBox
        //restartBox()
        rellenarEspacios();    
        deleteBlocks();
    }, 200)
}



// //Encontrar Bloques

const findBlocks = () => {
    const horizontalBlockItems = horizontalBlock()
    const verticalBlockItems = verticalBlock()

    if (horizontalBlockItems && verticalBlockItems) {
        return [horizontalBlockItems, verticalBlockItems]
    } else if (horizontalBlockItems) {
        return [horizontalBlockItems]
    } else if (verticalBlockItems) {
        return [verticalBlockItems]
    } else {
        return null
    }
}



// //Mover iconos
const moveIcons = (a, b) => {
    canMove = false;
    if (iconsAdjacent(a, b)) {
        switchIcons(a, b)

        setTimeout(() => {
            if (findBlocks()) {
                restartBox()
                deleteBlocks()
            } else {
                switchIcons(a, b)
                canMove = true;
            }
        }, timeAnimation)
    } else {
        a.classList.remove('selectedCell')
        b.classList.add('selectedCell')
        canMove = true;
    }
}
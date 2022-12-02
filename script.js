// variables
let tarjetasVistas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let resultado1 = null;
let resultado2 = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
const timerInicial = 30;
let tiempoRegresivoId = null;

let clickAudio = new Audio('./sonidos/click.wav');
let correctoAudio = new Audio('./sonidos/correcto.wav');
let incorrectoAudio = new Audio('./sonidos/incorrecto.wav');
let ganarAudio = new Audio('./sonidos/ganar.wav');
let perderAudio = new Audio('./sonidos/perder.wav');

// llamadas a documento html
let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("tiempo");

// array de numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(() => {return Math.random() - 0.5});

//funciones

function contarTiempo(){
    tiempoRegresivoId = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = 'Tiempo ⏱: ' + timer + ' segundos';
        if (timer == 0){
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
            perderAudio.play();
            Swal.fire({
                title: "¡Perdiste!",
                text: "Se te acabó el tiempo, intenta de nuevo.",
                grow: "fullscreen",
                timer: 6000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    }, 1000);
}

function bloquearTarjetas(){
    for (let i = 0; i <= 15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="./imagenes/${numeros[i]}.png" alt="imagen">`;
        tarjetaBloqueada.disabled = true;
    }
}

// funcion principal
function ver(id){

    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }

    tarjetasVistas++

    if (tarjetasVistas == 1){
        clickAudio.play();
        // ver primer resulltado
        tarjeta1 = document.getElementById(id);
        resultado1 = numeros[id];
        tarjeta1.innerHTML = `<img src="./imagenes/${resultado1}.png" alt="imagen">`;
        // deshabilitar el primer boton presionado
        tarjeta1.disabled = true;
    } else if (tarjetasVistas == 2){
        // ver segundo resultado
        tarjeta2 = document.getElementById(id);
        resultado2 = numeros[id];
        tarjeta2.innerHTML = `<img src="./imagenes/${resultado2}.png" alt="imagen">`;

        // deshabilitar el segundo boton presionado
        tarjeta2.disabled = true;

        // aumentar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = 'Movimientos 🎲: ' + movimientos;

        if (resultado1 == resultado2){
            correctoAudio.play();
            // poner en 0 las tarjetas vistas
            tarjetasVistas = 0;

            // aumentar los aciertos
            aciertos++;
            mostrarAciertos.innerHTML = 'Aciertos 🎯: ' + aciertos;

            if (aciertos == 8){
                ganarAudio.play();
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `¡Lograste los ${aciertos} aciertos 🏆!`;
                mostrarTiempo.innerHTML = `¡Tu tiempo fue de ${timerInicial-timer} segundos 🎇!`;
                mostrarMovimientos.innerHTML = `¡Hiciste ${movimientos} movimientos 😎!`;
                Swal.fire({
                    title: "¡Ganaste!",
                    text: `¡Felicidades tardaste ${timerInicial-timer} segundos 🎇!`,
                    grow: "fullscreen",
                    timer: 6000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
                localStorage.setItem('tiempoRecord', timerInicial-timer);
            }
        } else {
            incorrectoAudio.play();
            // mostrar los valores y volver a tapar los botones
            setTimeout(() => {
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasVistas = 0;
            },800);
        }
    }
}
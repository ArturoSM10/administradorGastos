class CalcularPresupuesto {
    constructor(presupuesto, gastos, restante) {
        this.presupuesto,
        this.gastos,
        this.restante
    };
}

class UI { 
    crearAlerta(texto, tipo) {
        const campo = document.querySelector(`.campo`);
        const etiquetaP = document.createElement(`P`);
        const existe = document.querySelector(`.alerta`);
        if (existe) return;
        etiquetaP.classList.add(`alerta`, `${tipo}`);
        etiquetaP.textContent = texto;
        console.log(etiquetaP);
        form.insertBefore(etiquetaP, campo);
        setTimeout(()=> {
            etiquetaP.remove();
        }, 3000);

        /*Falta agregar que se puedan crear dos alertas en caso de que el presupuesto se haya agotado*/
    }
}

let presupuesto;
const ui = new UI();
const form = document.querySelector(`.form`);

document.addEventListener(`DOMContentLoaded`, iniciarPagina);

function iniciarPagina() {
    presupuesto = prompt(`¿Cuál es tu presupuesto`);
    leerEventos();
}

function leerEventos() {
    form.addEventListener(`submit`, validarFormulario);
}

function validarFormulario(e) {
    e.preventDefault();

    const gastoInput = document.querySelector(`#gasto`).value;
    const cantidadInput = document.querySelector(`#cantidad`).value;
    const submitBtn = document.querySelector(`.submit`);

    if(gastoInput === `` || cantidadInput === ``) {
        ui.crearAlerta(`Debes llenar los campos`, `incorrecto`);
        return;
    }

    administrarPresupuesto();
}

function administrarPresupuesto() {
    form.reset();
    ui.crearAlerta(`Correcto`, `correcto`);
}
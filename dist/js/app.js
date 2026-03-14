class AdministrarPresupuesto {
    constructor(presupuesto) {
        this.presupuesto = presupuesto,
        this.restante = presupuesto,
        this.gastos = []
    };

    agregarGasto(objeto) {
        this.gastos = [...this.gastos, objeto];
        this.actualizarRestante();
        this.comprobarRestante();
    }

    actualizarRestante() {
        const gastoActualizado = this.gastos.reduce((gastoTotal, gasto) => {
            return gastoTotal + Number(gasto.cantidad);
        }, 0);
        this.restante = this.presupuesto - gastoActualizado;
        this.comprobarRestante();
    }

    eliminarGasto(entrada) {
        const gastoActualizado = this.gastos.filter( gasto => gasto.id !== entrada);
        this.gastos = gastoActualizado;
        this.actualizarRestante();
    }

    comprobarRestante() {
        const btnAgregar = document.querySelector(`.submit`);
        if (this.restante === 0) {
            ui.alerta('Se alcanzo el maximo a gastar', 'agotado');
            btnAgregar.disabled = true;
        }
        else {
            btnAgregar.disabled = false;
        }
        
    }
}

class UI {
    cargarInfoPAgina(valor) {
        const {presupuesto, restante} = valor;
        const elementoPresupuesto = document.querySelector(`.presupuesto__span`);
        const elementoRestante = document.querySelector(`.restante__span`);
        elementoPresupuesto.textContent = presupuesto;
        elementoRestante.textContent = restante;
    }

    alerta(texto, tipo) {
        const existe = document.querySelector(`.alerta`);
        if (existe && tipo !== `agotado`) return; 
        else if (tipo === `agotado`) {
            alertaHtml(texto, `correcto`);
            alertaHtml(`Presupuesto agotado`, `incorrecto`);
        }
        else {
            alertaHtml(texto, tipo);
        }   
    }
    
    agregarGasto(arr) {
        const {gasto, cantidad, id} = arr;
        const elementUl = document.querySelector(`.listado__ul`);

        const elementLi = document.createElement(`li`);
        const spanGasto = document.createElement(`span`);
        const spanPrecio = document.createElement(`span`);
        const borrarBtn = document.createElement(`a`);
        elementLi.classList.add(`listado__li`);
        elementLi.dataset.id = `${id}`;
        
        spanGasto.textContent = gasto;
        spanGasto.classList.add(`listado__gasto`);
        elementLi.append(spanGasto);
        
        spanPrecio.textContent = cantidad;
        spanPrecio.classList.add(`listado__precio`);
        elementLi.append(spanPrecio);
        
        borrarBtn.textContent = `Borrar`;
        borrarBtn.classList.add(`listado__a`);
        elementLi.append(borrarBtn);

        elementUl.appendChild(elementLi);

        this.actualizarRestante(presupuesto);
    }

    actualizarRestante(valor) {
        const {restante} = valor;
        console.log(restante)
        const elementoRestante = document.querySelector(`.restante__span`);
        elementoRestante.textContent = restante;
    }
}

let ui = new UI();
let presupuesto;

const form = document.querySelector(`.form`);
const listado = document.querySelector(`.listado__ul`);




document.addEventListener(`DOMContentLoaded`, preguntarPresupuesto);

function preguntarPresupuesto() {
    const cantidad = Number(prompt(`¿Cuál es tu presupuesto?`));
    if (cantidad <= 0 || isNaN(cantidad)) {
        window.location.reload();
        return;
    }

    presupuesto = new AdministrarPresupuesto(cantidad);
    ui.cargarInfoPAgina(presupuesto);

    leerEventos();

}

function leerEventos() {
    form.addEventListener(`submit`, validarFormulario);
    listado.addEventListener(`click`, borrarGasto);
}

function validarFormulario(e) {
    e.preventDefault();
    const gasto = document.querySelector(`#gasto`).value;
    const cantidad = document.querySelector(`#cantidad`).value;

    if (gasto === '' || cantidad === '') {
        ui.alerta(`Todos los campos son obligatorios.`, `incorrecto`);
        return;
    } else if (Number(cantidad) <= 0 || isNaN(cantidad)) {
        ui.alerta(`cantidad incorrecta.`, `incorrecto`);
        return;
    } else if (cantidad > presupuesto.restante) {
        ui.alerta(`Gasto no puede ser mayor al restante.`, `incorrecto`);///////////////
        return;
    }
    form.reset();
    ui.alerta('Gasto agregado.', `correcto`);

    const gastoObj =  {
        gasto,
        cantidad,
        id: Date.now()
    };

    presupuesto.agregarGasto(gastoObj);
    ui.agregarGasto(gastoObj);
}

function alertaHtml(texto, tipo) {
    const campo = document.querySelector(`.campo`);
    const alertaP = document.createElement(`P`);
    alertaP.textContent = texto;
    alertaP.classList.add(`alerta`, `${tipo}`);
    form.insertBefore(alertaP, campo);
    setTimeout(()=>{
        alertaP.remove();
    }, 3000);
}

function borrarGasto(e) {
    const esBtn = e.target.classList.contains(`listado__a`);

    if (esBtn) {
        const id = e.target.closest(`.listado__li`).dataset.id;
        const listadoLi = document.querySelector(`[data-id = "${id}"]`);
        listadoLi.remove();
        presupuesto.eliminarGasto(Number(id));/////////////////
        ui.actualizarRestante(presupuesto);
    }
}
// import { v4 as uuid } from 'uuid'

listadoProductos = []

document.addEventListener('DOMContentLoaded', () => {
    // Al cargar la página, mostramos posibles productos ya añadidos a la lista de la compra
    // y que estén almacenados en el localStorage
    mostrarListaCompra()
})

document.getElementById('formularioEntrada').addEventListener('submit', (event) => {
    event.preventDefault() // anulamos envío por defecto del formulario
    let producto = document.querySelector('#nombreProducto')
    if (producto.value.trim() ==='' ){  // si el usuario no ha escrito nada, no añado nada
        return
    }
   

    let nuevoProducto = {
        id:uuid.v4(), // id del producto. Usamos la librería uuid para generarlo. Nos ayudará para borrar...
        nombre: producto.value,
        anadido: false // por defecto el producto no está añadido al carrito. Esto lo cambiaremos en el supermercado
    }

    anadirElementoListaCompra(nuevoProducto)
    producto.value = ''  
})

function anadirElementoListaCompra(elemento){
    listadoProductos.push(elemento) // Añadimos al array
    almacenarListaCompra() // Guardamos el array en el localStorage
    mostrarProductoEnPantalla(elemento) // Mostramos el producto en la lista de la pantalla
    actualizarNumeroElementos()  // Actualizamos mensaje de pantalla con número de elementos en la lista
}

function almacenarListaCompra(){
    localStorage.setItem('LSlistaCompra', JSON.stringify(listadoProductos))
}

function mostrarProductoEnPantalla(producto){
    let nuevoLi = document.createElement('li')
    nuevoLi.id = producto.id
    nuevoLi.innerHTML = producto.nombre
    if (producto.anadido){
        nuevoLi.classList.toggle('anadido')
    }
    let botonera = document.createElement('span')
        let botonAnadido = document.createElement('button')
        botonAnadido.innerHTML="Añadido"
        botonAnadido.classList.add('boton')
        botonAnadido.addEventListener('click', function() {
            marcarAnadido(this.parentNode.parentNode.id)
        })
        let botonBorrar = document.createElement('button')
        botonBorrar.innerHTML="Borrar"
        botonBorrar.classList.add('boton')
        botonBorrar.addEventListener('click', function() {
            eliminarProducto(this.parentNode.parentNode.id)
        })

        botonera.appendChild(botonAnadido)
        botonera.appendChild(botonBorrar)
        nuevoLi.appendChild(botonera)

    document.getElementById('listaCompra').appendChild(nuevoLi)
}

function actualizarNumeroElementos(){
    document.querySelector('#numElementos span').innerHTML = ((listadoProductos.length>0) ? listadoProductos.length : 0)
}


function mostrarListaCompra(){
    listaCompra = document.getElementById('listaCompra')
    listaCompra.innerHTML = ''

    recuperarListaCompra()
    listadoProductos.forEach((producto) => {
        let nuevoLi = document.createElement('li')
        nuevoLi.id = producto.id
        nuevoLi.innerHTML = producto.nombre
        if (producto.anadido){
            nuevoLi.classList.toggle('anadido')
        }
        let botonera = document.createElement('span')
            let botonAnadido = document.createElement('button')
            botonAnadido.innerHTML="Añadido"
            botonAnadido.classList.add('boton')
            botonAnadido.addEventListener('click', (event) => {
                marcarAnadido(event.currentTarget.parentNode.parentNode.id)
            })
            let botonBorrar = document.createElement('button')
            botonBorrar.innerHTML="Borrar"
            botonBorrar.classList.add('boton')
            botonBorrar.addEventListener('click', (event) => {
                eliminarProducto(event.currentTarget.parentNode.parentNode.id)
            })

            botonera.appendChild(botonAnadido)
            botonera.appendChild(botonBorrar)
            nuevoLi.appendChild(botonera)

        document.getElementById('listaCompra').appendChild(nuevoLi)
    })
}
function recuperarListaCompra(){
    listadoProductos = JSON.parse(localStorage.getItem('LSlistaCompra')) || []
}

function marcarAnadido(idProducto){
    const index = listadoProductos.findIndex( (producto) => { return producto.id === idProducto} );
    listadoProductos[index].anadido = !listadoProductos[index].anadido;
    almacenarListaCompra() // Actualizamos el array en el localStorage
    mostrarListaCompra() // Mostramos toda la lista de productos
    mostrarProductoEnPantalla(elemento) // Mostramos el producto en la lista de la pantalla
}

function eliminarProducto(idProducto){
    const index = listadoProductos.findIndex( (producto) => { return producto.id === idProducto} );
    listadoProductos.splice(index,1);
    almacenarListaCompra() // Actualizamos el array en el localStorage
    mostrarListaCompra() // Mostramos toda la lista de productos
    actualizarNumeroElementos()  // Actualizamos mensaje de pantalla con número de elementos en la lista
}
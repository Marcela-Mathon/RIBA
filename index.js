class Producto {
    constructor(id, nombre, imagen, precio, descripcion){
      this.id = id 
      this.nombre = nombre
      this.imagen = imagen
      this.precio = precio
      this.descripcion = descripcion
    }
}

const producto1 = new Producto(1, "Maillot", "../catalogo/maillot-gris.png", 1790, "85% Poliester-15% Lycra). Tejido en panel en las mangas y laterales. Protección UV50+")
const producto2 = new Producto(2, "Maillot", "../catalogo/maillot-celeste.png", 1790, "85% Poliester-15% Lycra). Tejido en panel en las mangas y laterales. Protección UV50+")
const producto3 = new Producto(3, "Chaleco", "../catalogo/chalecos.png", 1990, "Delantera repelente al viento y al agua, y lycra en la espalda. Cuenta con 3 bolsillos traseros.")
const producto4 = new Producto(4, "Calza corta", "../catalogo/calza-corta.png", 2590, "Lycra con 4 sentidos de estiramiento. 81% Poliester - 19% Lycra - Protección UV50+.")
const producto5 = new Producto(5, "Calza larga", "../catalogo/calzas-largas.png", 2690, "Lycra con 4 sentidos de estiramiento. 81% Poliester - 19% Lycra -Protección UV50+.")
const producto6 = new Producto(6, "Campera térmica", "../catalogo/nepreno-dama.png", 2790, "Campera liviana de tela firme en frente, espalda y mangas, elástica en los laterales.")
const producto7 = new Producto(7, "Campera térmica", "../catalogo/neopreno-verde.png", 2790, "Campera liviana de tela firme en frente, espalda y mangas, elástica en los laterales.")
const producto8 = new Producto(8, "Campera neopreno", "../catalogo/camperafina.png", 2690, "Campera cálida, confeccionada en tela elástica con gran ajuste al cuerpo.")

const productos = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8]

// Variables

const renderProductos = document.querySelector(".renderProductos")
const tablaCarrito = document.querySelector(".tablaCarrito")
const botonesProductos = document.getElementsByClassName("botonesProductos")
const subTotal = document.querySelector(".subtotal")
const finalizar = document.querySelector(".divFinalizar")
const botonVaciar = document.getElementById("botonVaciar")


function renderProd() {

productos.forEach(producto => {
    renderProductos.innerHTML += `
    <div class="card mb-5" style="max-width:20rem;margin:25px;">
      <div class="tituloproducto" >${producto.nombre}</div>
        <div>
        <img class="imagenestienda" src="${producto.imagen}" alt="${producto.nombre}">
          <p class="card-text">${producto.descripcion}</p>
          <p class="classcatalogo">$${producto.precio}</p>
            <div class="btn btn-secondary botonesProductos" onclick="añadirAlCarrito(${producto.id})">Agregar al carrito</div>
      </div>
    </div>
    `
})}

renderProd()


// Array Carrito

let carrito = JSON.parse(localStorage.getItem("CARRITO")) || []
actualizarCarrito()

// Añadir al carrito

function añadirAlCarrito(id){ 
    // chequea si el producto estaba agregado

    if(carrito.some((item) => item.id === id)){
        cambiarNumeroDeUnidades("aumentar", id)
    } else {
    const item = productos.find((producto) => producto.id === id)
    carrito.push({
        ...item,
        numeroDeUnidades : 1,
    })
}
actualizarCarrito()
}


// Actualizar carrito

 function actualizarCarrito(){
    renderCarrito()
    renderSubtotal()


// guardar en localstorage
localStorage.setItem("CARRITO", JSON.stringify(carrito))
}


// Render subtotal

function renderSubtotal() {
    let precioTotal = 0 
    let totalItems = 0

    carrito.forEach((item) => {
    precioTotal += item.precio * item.numeroDeUnidades
    totalItems += item.numeroDeUnidades  
    
})

subTotal.innerHTML = `Subtotal (${totalItems} items): $${precioTotal}`
}


// Render carrito

function renderCarrito(){
    tablaCarrito.innerHTML = ""
    carrito.forEach((item) => {
        tablaCarrito.innerHTML += `
    <div class="container">
		<hr>
		<table class="table">
			<thead  style="vertical-align:baseline;">
			  <tr>
				<th scope="col"><img style="width:50px; height:50px;" src="${item.imagen}"</th>
				<th scope="col">${item.nombre}</th>
                <th class="btn" scope="col" onclick="cambiarNumeroDeUnidades('disminuir', ${item.id})">-</th>
				<th scope="col">${item.numeroDeUnidades}</th>
                <th class="btn" scope="col" onclick="cambiarNumeroDeUnidades('aumentar', ${item.id})">+</th>
				<th scope="col">${item.precio}</th>
                <th class="btn" scope="col" onclick="eliminarItem(${item.id})">Eliminar</th>
			  </tr>
			</thead>
			<tbody id="items"></tbody>
		  </table>
		<div class="row" id="cards"></div>
	</div>
    `
    })

}

// Funcion aumentar/disminuir items

function cambiarNumeroDeUnidades(action, id) {
    carrito = carrito.map((item) =>  {
        let numeroDeUnidades = item.numeroDeUnidades

        if(item.id === id) {
            if(action === "disminuir" && numeroDeUnidades > 1){
                numeroDeUnidades--
            } else if(action === "aumentar"){
                numeroDeUnidades++
            }
        }
        return {
            ...item,
            numeroDeUnidades
        }
    })
    
    actualizarCarrito()
}

// Funcion eliminar del carrito

function eliminarItem (id) {
carrito = carrito.filter((item) => item.id !== id)

actualizarCarrito()
}

// Alerta de agregado al carrito

for(let i = 0; i < botonesProductos.length; i++) {
    botonesProductos[i].addEventListener('click', () => {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Producto agregado al carrito',
            showConfirmButton: false,
            timer: 2000
          })
        })
    } 

botonVaciar.addEventListener('click', () => {
    carrito.length = 0

    actualizarCarrito()
})
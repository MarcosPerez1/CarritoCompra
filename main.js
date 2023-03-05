document.addEventListener('DOMContentLoaded', () => {
  const desplegable = document.querySelector(".menuDesplegable");
  const contenedor = document.querySelector(".contenedorProductos");
  const cards = document.querySelector(".cards");
  const volver = document.querySelector(".volver");
  const carritoContenedor = document.querySelector(".contenedorCarrito");
  const tablaCompra = document.querySelector(".tablaCompra");


/*EVENTOS/*







/* FUNCIONES */

  const obtenerDatos = async () => {
    try {
      let peticion = await fetch('https://dummyjson.com/products');
      if (peticion.ok) {
        let respuesta = await peticion.json();
        return { ok: true,
                 respuesta };
      } else {
        throw {
          ok: false,
          msg: "La API a la que esta realizando la consulta no ha dado respuesta",
        };
      }
    } catch (error) {
      return error;
    }
  };
  
obtenerDatos()

  const pintar=async()=>{
    let {respuesta, ok}= await obtenerDatos()
    if(ok){
      const productos = respuesta.products;
      console.log(productos)
      productos.forEach((item) => {
        const cuadroArticulos = document.createElement("ARTICLE")
        cuadroArticulos.classList.add("cajaproducto")
        const imagenes =document.createElement("IMG");
        imagenes.src=item.images[0];
        imagenes.alt=item.title;
        const tituloProduct = document.createElement("H3");
        tituloProduct.textContent=item.title;
        const precioArticulo= document.createElement("P");
        precioArticulo.textContent=`precio: ${item.price}`;        
        const comprarArticulo =document.createElement("BUTTON");
        comprarArticulo.textContent="COMPRAR";
        comprarArticulo.classList.add("botonComprar");
        comprarArticulo.setAttribute("id",item.id);
        cuadroArticulos.append(imagenes,tituloProduct,precioArticulo,comprarArticulo);
        contenedor.append(cuadroArticulos)
        
        
      });
        }
      }
pintar()










})
document.addEventListener('DOMContentLoaded', () => {
  const desplegable = document.querySelector(".menuDesplegable");
  const contenedor = document.querySelector(".contenedorProductos");
  const cards = document.querySelector(".cards");
  const volver = document.querySelector(".volver");
  const carritoContenedor = document.querySelector(".contenedorCarrito");
  const tablaCompra = document.querySelector(".tablaCompra");
  const comprar =document.querySelector(".botonComprar");
  const fragment=document.createDocumentFragment();
  let productosSeleccionados = JSON.parse(localStorage.getItem("arrayProductos")) || [];

/*EVENTOS */


document.addEventListener("click", ({ target }) => { 
  if (target.matches(".botonComprar")) {
    aniadirProductos(target.id);
  }
  // if (target.matches(".menuDesplegable")){
  //   desplegableIcono()
  // }
    
  })





/* FUNCIONES */

  /* funcion fetch para obtener la respuesta de la api con los productos que esta alberga */

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

    /* funcion para pintar los diferentes items que compondran nuestras cards/products  */

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
        precioArticulo.textContent=`precio: ${item.price} €`;        
        const comprarArticulo =document.createElement("BUTTON");
        comprarArticulo.textContent="COMPRAR";
        comprarArticulo.classList.add("botonComprar");
        comprarArticulo.setAttribute("id",item.id);       
        const divEstrellas = document.createElement("DIV");
        divEstrellas.classList.add("estrellasDiv")
        const arrayEstrellas = estrellas(item.rating)
        arrayEstrellas.forEach((item)=>{
          divEstrellas.append(item);
        });
        cuadroArticulos.append(imagenes,tituloProduct,precioArticulo,divEstrellas,comprarArticulo);
        contenedor.append(cuadroArticulos)
      });
        }
      }
      pintar()

        /* funcion para obtener el array de estrellas doradas o grises dependiendo del rating */
    
      const estrellas = (ratio) =>{
        let contEstrellaDorada = Math.round(ratio);
        let contEstrellaGris= 5 - contEstrellaDorada;

        const arrayEstrellas=[];

        for (let i = 0; i< contEstrellaDorada; i++){
          let estrellaDorada = document.createElement("img");
          estrellaDorada.src= "./imagenes/star1.png";
          arrayEstrellas.push (estrellaDorada);
        }
        for (let i = 0; i < contEstrellaGris; i++){
          let estrellaGris = document.createElement("IMG");
          estrellaGris.src="./imagenes/star2.png";
          arrayEstrellas.push(estrellaGris);
        }
        return arrayEstrellas
      };

      const setLocal = () =>{
        localStorage.setItem("products",JSON.stringify(productosSeleccionados))
      }

      const getLocal = () =>{
        return JSON.parse(localStorage.getItem("products"))
      }

      /* funcion para añadir los productos seleccionados a la cesta y por lo tanto al local storage  */
      
      // const aniadirProductos= async (id) =>{
      //   let {respuesta, ok}= await obtenerDatos()
      //     if(ok){
      //     const productos = respuesta.products;
      // }


      /* funcion para crear el deplegable que se inicia a travas del click en el icono */


      const desplegableIcono = () =>{

      }






})
import { createContext, useState } from 'react';
import { addProductInCart } from '../MongoDB/CartMongo'

// inicio sesion
// traigo el carrito actualizado
// agrego un producto a la db, con la cantidad dada
// si se agrega a la db, lo agrego al array de cart, toast ok
// si no se agrega, toast error de db
// si el producto ya existia en carrito, modifico la cantidad, toast ok quantity
// cuando, recargo la pagina, o cierro sesion, la recupero y ya me trae el carrito, porque el user tiene al carrito

// DE ESTA MANERA NO ES NECESARIO REALIZAR UN GET DEL CARRITO CADA VEZ QUE QUE LO MODIFICO
// Ya que persiste en el componente de react a la vez que se realiza un post o update

// response.status == 200 ?
// toast.success("Product added successfully", {
//   position: "bottom-left",
//   width: "200px",
// })
// :
// toast.error("Error adding product try in a few minutes", {
//   position: "bottom-left",
//   width: "200px",
// })

export const Context = createContext();

export default function ContextProvider({children}) {
  const [cart, setCart] = useState([]);

  const addToCart = async (product, quantity) => {
    product.quantity = quantity;
    const prodInCart = cart.find(item => item.id === product._id);
    // item.id que devuelve?
    const pid = product._id

    try {
      if (!prodInCart) {
        // AGREGAR MAS DE UNO MODIFICAR
        // If the product is not in the cart, add it with the given quantity
        addProductInCart(pid)
          .then(response => {
          response.status == 200 ? 
            setCart(pid)
          : console.error('no se pudo agregar al carrito, try later')
        })
        
        // cart.status == 200 ? 
        // setCart([...cart, product]);
        
        // Added to cart pop up animation
      //   toast.success(`${product.name} added to cart`, {
      //     position: "bottom-left",
      //     width: "200px",
      //   });
      } else {
        // updateProdQuantity(pid, pqty)
        // setCart(pqty)

      //   const newCart = [...cart];
      //   newCart[productIndex].quantity += quantity;
      //   setCart(newCart);
      //   // Increased quantity pop up animation
      //   toast.info(`increased ${product.name} cart quantity`, {
      //     position: "bottom-left",
      //   });
      }
      // : console.error('Error fetching products:', error);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  const removeItem = (id) => {
    setCart(cart.filter((product) => product.id !== id));
  };

  function clear() {
    setCart([]);
  };
  
  //Calculates the final price of the total number of products in the cart
  const finalPrice = cart.map((product) => Number(product.price * product.quantity)).reduce((a, b) => a + b, 0);

  //Set the orderId from the Checkout so you can reuse it in the PurchaseComplete
  const [orderId, setOrderId] = useState('');
  
  return (
    <>
      <Context.Provider value={{ cart, setCart, addToCart, removeItem, clear, finalPrice, orderId, setOrderId }}>
        {children}
      </Context.Provider>
    </>
  )
}
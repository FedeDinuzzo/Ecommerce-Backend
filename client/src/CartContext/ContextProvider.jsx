import { createContext, useState } from 'react';
import { addProductInCart } from '../MongoDB/CartMongo'

export const Context = createContext();

export default function ContextProvider({children}) {
  const [cart, setCart] = useState([]);

  const addToCart = async (product, quantity) => {
    product.quantity = quantity;
    const productIndex = cart.findIndex(item => item.id === product._id);
    // item.id que devuelve?
    const pid = product._id

    try {
      if (productIndex === -1) {
        // AGREGAR MAS DE UNO MODIFICAR
        // If the product is not in the cart, add it with the given quantity
        addProductInCart(pid)
          .then(data => {
          console.log(data)
        })
          .catch(error => {
            console.log(error)
        });
        
        // cart.status == 200 ? 
        // setCart([...cart, product]);
        
        // Added to cart pop up animation
      //   toast.success(`${product.name} added to cart`, {
      //     position: "bottom-left",
      //     width: "200px",
      //   });
      } else {
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
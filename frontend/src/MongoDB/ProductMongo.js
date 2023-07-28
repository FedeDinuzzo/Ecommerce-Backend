import { toast } from 'react-toastify';

export const getProducts = async (limit, page, category, stock, sort, token) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
  
    const products = await response.json();
    return products.payload;
  };

  export const getProductByCode = async (_id) => {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/${_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
    })

    const product = await response.json()
    console.log(product)
    return product
}

export const createProduct = async (product, cookies) => {
  if (getProductByCode(product._id)) {
    toast.error(`${product.title} already exists`, {
      position: "bottom-left",
      width: "200px",
    })
  } else {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": `jwtCookies=${cookies.jwtCookies}`
      },
      credentials: 'include',
      body: JSON.stringify(product)
    });
    // redireccionar a login si no existe jwtCookies
    response.status == 200 ?
      toast.success(`${product.title} created`, {
        position: "bottom-left",
        width: "200px",
      })
    :
      toast.error(`Error at creating ${product.title}`, {
        position: "bottom-left",
        width: "200px",
      })
  }
}


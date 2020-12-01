import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Products from './components/Products/Products';
import { commerce } from './lib/commerce';
const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    /**
     * Get product from api
     */
    const fetchProduct = async () => {
        const { data } = await commerce.products.list();
        setProducts(data);
    }

    /**
     * Get the cart from api and fetch it to cart state
     */
    const fetchCart = async () =>{
        setCart(await commerce.cart.retrieve());
    }

    const handleAddToCart = async(productId, quantity) =>{
        const item = await commerce.cart.add(productId, quantity);
        setCart(item.cart);

        
    }

    const handleEmptyCart = async() =>{
        const item = await commerce.cart.empty();
        setCart(item.cart);
    }

    /**
     * This function will call at the first time after reloading page
     */
    useEffect(() => {
        fetchProduct();
        fetchCart();
    }, [])
console.log(cart);
    return (
        <div>
            <Navbar cart={cart}/>
            <Products products={products} handleAddToCart={handleAddToCart}/>
        </div>
    )
}

export default App
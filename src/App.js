import React, { useState, useEffect } from 'react';
import { Navbar, Products, Cart } from './components';
import { commerce } from './lib/commerce';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    }

    /**
     * When user click on add to cart icon
     * @param {Product id} productId 
     * @param {quantity} quantity 
     */
    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);
        setCart(item.cart);
    }

    /**
     * Clear all data from cart
     */
    const handleEmptyCart = async () => {
        const item = await commerce.cart.empty();
        setCart(item.cart);
    }

    /**
     * Remove item from cart
     * @param {Cart id to delete} itemId 
     */
    const handleRemoveCart = async(itemId) =>{
        const item = await commerce.cart.remove(itemId);
        setCart(item.cart);
    }

    const handleUpdateCartQty = async(itemId, quantity) =>{
        const {cart} = await commerce.cart.update(itemId, { quantity })
        setCart(cart);
    }

    /**
     * This function will call at the first time after reloading page
     */
    useEffect(() => {
        fetchProduct();
        fetchCart();
    }, [])
    return (
        <Router>
            <div>
                <Navbar cart={cart} />
                <Switch>
                    <Route exact path='/'>
                        <Products products={products} handleAddToCart={handleAddToCart} />
                    </Route>
                    <Route exact path='/cart'>
                        <Cart cart={cart} handleEmptyCart={handleEmptyCart} handleRemoveCart={handleRemoveCart} handleUpdateCartQty={handleUpdateCartQty} />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App
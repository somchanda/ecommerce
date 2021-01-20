import React, { useState, useEffect } from 'react';
import { Navbar, Products, Cart, Checkout } from './components';
import { commerce } from './lib/commerce';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CircularProgress, makeStyles, Backdrop } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
    backdrop : {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff'
    },
}));

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const classes = useStyle();

    /**
     * Get product from api
     */
    const fetchProduct = async () => {
        const { data } = await commerce.products.list();
        setIsLoading(false);
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
    const handleRemoveCart = async (itemId) => {
        const item = await commerce.cart.remove(itemId);
        setCart(item.cart);
    }

    const handleUpdateCartQty = async (itemId, quantity) => {
        const { cart } = await commerce.cart.update(itemId, { quantity })
        setCart(cart);
    }

    const refresh = async () => {
        const newCart = commerce.cart.refresh();
        setCart(newCart);
    }

    const handleCheckoutCapture = async (checkoutTokenId, newOrder) => {
        try {
            const incommingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
            setOrder(incommingOrder);
            refresh();
        } catch (error) {
            console.log(error);
            setErrorMessage(error.data.error.message);
        }

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
                        {isLoading ? <Backdrop className={classes.backdrop} open={isLoading} ><CircularProgress color='inherit'/></Backdrop> : <Products products={products} handleAddToCart={handleAddToCart} />}
                    </Route>
                    <Route exact path='/cart'>
                        <Cart cart={cart} handleEmptyCart={handleEmptyCart} handleRemoveCart={handleRemoveCart} handleUpdateCartQty={handleUpdateCartQty} />
                    </Route>
                    <Route exact path="/checkout">
                        <Checkout
                            cart={cart}
                            order={order}
                            handleCheckoutCapture={handleCheckoutCapture}
                            errorMessage={errorMessage}
                        />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App
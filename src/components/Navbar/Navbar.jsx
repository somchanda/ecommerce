import React from 'react';
import {AppBar, Toolbar, IconButton, Badge, Typography} from '@material-ui/core';
import {ShoppingCart} from '@material-ui/icons';
import logo from '../../assets/logo.png';
import { Link, useLocation} from 'react-router-dom'


import useStyles from './style';

const Navbar = ({cart}) => {
    const classes = useStyles();
    const location = useLocation();
  return (
    <>
        <AppBar position="fixed" className={classes.appBar} color="inherit">
            <Toolbar>
                <Typography component={Link} to = "/" variant="h6" className={classes.title} color="inherit">
                    <img src={logo} alt="E-commerce" height='25px' className={classes.image} />
                    E-Commerce
                </Typography>
                <div className={classes.grow} />
                {location.pathname === '/' &&(
                <div className={classes.button}>
                    <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                        <Badge badgeContent={cart.total_items} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </div>)}
            </Toolbar>
        </AppBar>
    </>
  )
}

export default Navbar

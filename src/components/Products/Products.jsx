import React from 'react';
import { Grid } from '@material-ui/core';
import Product from '../../components/Products/Product/Product';
import useStyles from './style';

const Products = ({products, handleAddToCart}) => {
    // const products = [
    //     {id: 1, name: 'shoes', description: 'Running shoes...', price:'5$', image: 'https://images-na.ssl-images-amazon.com/images/I/61utX8kBDlL._UL1100_.jpg'},
    //     {id: 2, name: 'keyboard', description: 'Black keyboard...', price:'10$', image: 'https://static.bhphoto.com/images/images2500x2500/hp_hp2un30aa_100_keyboard_1529964439000_1418797.jpg'}
    // ]
    const classes = useStyles();
  return (
    <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container justify='center' spacing={4}>
            {products.map((product) =>(
                <Grid item key={product.id} xs={12} sm={6} md = {4} lg={3}>
                    <Product product={product} handleAddToCart={handleAddToCart}/>
                </Grid>
            ))}
        </Grid>
    </main>
  )
}
export default Products

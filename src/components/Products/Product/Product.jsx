import React, { useState } from 'react';
import { Card, CardMedia, CardActions, Typography, IconButton, CardContent, Dialog, Slide, AppBar, Toolbar, List, ListItem, ListItemText, Divider, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import ImageSlider from './ImageSlider';
import CloseIcon from '@material-ui/icons/Close';

import useStyles from './style'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const Product = ({ product, handleAddToCart }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <div>
            <Card className={classes.root}>
                <CardMedia className={classes.media} image={product.media.source} title={product.name} style={{ cursor: 'pointer' }} onClick={(event) => { setOpen(true) }} />
                <CardContent>
                    <div className={classes.cardContent}>
                        <Typography variant="h5" gutterBottom>
                            {product.name}
                        </Typography>
                        <Typography variant="h5">
                            {product.price.formatted_with_symbol}
                        </Typography>
                    </div>
                    <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" color="textSecondary"></Typography>
                </CardContent>
                <CardActions disableSpacing className={classes.cardActions}>
                    <IconButton aria-label="Add to Cart" onClick={() => handleAddToCart(product.id, 1)}>
                        <AddShoppingCart />
                    </IconButton>
                </CardActions>
            </Card>
            {/* <Dialog open={open} fullWidth={true} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>{product.name}</div>
                        <div >{product.price.formatted_with_symbol}</div>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <ImageSlider assets={product.assets.filter(asset => asset.is_image == true)} product={product}/>
                    <DialogContentText style={{padding: '10px', borderRadius: '5px' }}>
                        <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" color="textSecondary"></Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog> */}
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {product.name}
                        </Typography>
                    </Toolbar>
                </AppBar>
                
                <ImageSlider assets={product.assets.filter(asset => asset.is_image == true)} product={product}/>
                {/* <List>
                    <ListItem button>
                        <ListItemText primary="Phone ringtone" secondary="Titania" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Default notification ringtone" secondary="Tethys" />
                    </ListItem>
                </List> */}
            </Dialog>
        </div>
    )
}

export default Product

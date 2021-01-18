import React, { useState } from 'react';
import { CardMedia, IconButton } from '@material-ui/core';
import useStyles from './style';
import { ArrowBack, ArrowForward } from '@material-ui/icons';


const ImageSlider = ({ assets, product }) => {
    const classes = useStyles();
    const [index, setIndex] = useState(0);
    const slideRight = () => {
        setIndex((index + 1) % assets.length); // increases index by 1
      };
    
      const slideLeft = () => {
        const nextIndex = index - 1;
        if (nextIndex < 0) {
          setIndex(assets.length - 1); // returns last index of images array if index is less than 0
        } else {
          setIndex(nextIndex);
        }
      };
    console.log(assets.length);
    return assets.length <= 1 ? (
        <div>
            <CardMedia className={classes.media} image={product.media.source} title={product.name} />
        </div>
    ) : (
            <div>
                <CardMedia className={classes.media} image={assets[index].url} title={product.name} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton aria-label="Back" onClick={slideLeft}>
                        <ArrowBack />
                    </IconButton>
                    <IconButton aria-label="Next" onClick={slideRight}>
                        <ArrowForward />
                    </IconButton>
                </div>
            </div>
        );
}
export default ImageSlider;
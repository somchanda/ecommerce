import React, { useState } from 'react';
import { Card, CardContent, CardMedia, IconButton } from '@material-ui/core';
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
    return assets.length <= 1 ? (
        <Card>
            <CardMedia className={classes.media} image={product.media.source} title={product.name} />
        </Card>
    ) : (
      <Card>
        <CardMedia className={classes.media} image={assets[index].url} title={product.name} />
        <CardContent>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <IconButton aria-label="Back" onClick={slideLeft}>
              <ArrowBack />
            </IconButton>
            <IconButton aria-label="Next" onClick={slideRight}>
              <ArrowForward />
            </IconButton>
          </div>
        </CardContent>
      </Card>

    );
}
export default ImageSlider;
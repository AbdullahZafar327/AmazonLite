import React  from 'react'
import {Card, CardActions,CardMedia, CardContent,Typography, IconButton} from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons'
import useStyles from './Styles'

const Product = ({ product,onAddToCart }) => {
    const classes = useStyles();
  return (
   
   <Card className={classes.root}>
    <CardMedia
      className={classes.media}
      component="img"
      src={product.image?.url}
      title={product.name}
    />
    <CardContent className={classes.cardContent}>
        <div>
            <Typography variant="body2" gutterBottom>
                {product.name}
            </Typography>
            <Typography variant="body2" gutterBottom>
                {product.price.formatted_with_symbol}
            </Typography>
            <Typography variant='body2' dangerouslySetInnerHTML={{__html:product.description}} color="textSecondary"/>
            
        </div>
    </CardContent>
    <CardActions disableSpacing className={classes.cardActions}>
        <IconButton aria-label="add to cart" onClick={()=>onAddToCart(product.id,1)} >
            <AddShoppingCart/>
        </IconButton>
    </CardActions>
   </Card>
   
  )
}

export default Product
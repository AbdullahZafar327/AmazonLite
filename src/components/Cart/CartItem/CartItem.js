import React from 'react'
import {Typography,Button,Card,CardActions,CardContent,CardMedia} from '@material-ui/core'
import useStyles from './Styles.js'

const CartItem = ({item,handleUpdateQty , handleRemove}) => {
    const classes = useStyles();
  return (
  <Card>
    <CardMedia src={item.image?.url} component="img" title={item.name} className={classes.media}/>
    <CardContent className={classes.cartContent}>
        <Typography variant='h4'>{item.name}</Typography>
        <Typography variant='h5'>{item.line_total.formatted_with_symbol}</Typography>
    </CardContent>
    <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
     <Button type='button' size='small' onClick={()=>handleUpdateQty(item.id,item.quantity-1)}>-</Button>
        <Typography>{item.quantity}</Typography>
      <Button type='button' size='small' onClick={()=>handleUpdateQty(item.id,item.quantity+1)}>+</Button>
        </div>
        <Button variant='contained' type='button' color='secondary' onClick={()=>handleRemove(item.id)}>Remove</Button>
    </CardActions>
  </Card>
  )
}

export default CartItem

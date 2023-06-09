import React from 'react'
import {Container,Typography,Button,Grid} from '@material-ui/core';
import useStyles from './Styles'
import CartItem from './CartItem/CartItem'
import {Link} from 'react-router-dom';
const Cart = ({cart, handleUpdateQty,handleRemove,handleEmptyCart}) => {
    const classes = useStyles();

    const EmptyCart = () =>(
        <Typography variant='subtitle1'>you have no items in your shopping cart  
        <Link to='/' className={classes.link}>   Start adding some</Link>
        </Typography>
    );
    const FilledCart = ()=>(
        <>
        <Grid container spacing={3}>
         {cart.line_items.map((item)=>(
           <Grid item xs={12} sm={6} key={item.id}>
            <CartItem item={item} handleRemove={handleRemove} handleUpdateQty={handleUpdateQty}/>
           </Grid>
         ))}
        </Grid>
        <div className={classes.cardDetails} >
            <Typography variant='h4'>
             subtotal: {cart.subtotal.formatted_with_symbol}
            </Typography>
            <div>
                <Button className={classes.emptyButton} size='large' variant='contained' type='button' color='primary' onClick={handleEmptyCart}>Empty Cart</Button>
                <Button component={Link} to='/Checkout' className={classes.checkoutButton} size='large' variant='contained' type='button' color='secondary' >Check Out</Button>
            </div>
        </div>
        </>
    )
    if(!cart.line_items) return 'loading...';
  return (
    <Container>
        <div className={classes.toolbar}/>
        <Typography className={classes.title} variant='h3' gutterBottom>Your Shopping Cart</Typography>
        {!cart.line_items.length?<EmptyCart/>:<FilledCart/>}
    </Container>
  )
}

export default Cart
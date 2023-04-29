import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { ShoppingCart, shoppingCart } from "@material-ui/icons";
import logo from '../../assests/commerce.png'
import useStyles from './Styles.js'
import {Link,useLocation} from 'react-router-dom';


const Navbar = ({totalItem}) => {
  const location = useLocation();
  const classes = useStyles();
  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography variant="h4" component={Link} to='/' className={classes.title}>
            <img
              src={logo}
              alt="Commerce.js"
              height="35px"
              className={classes.image}
            /> AmazonLite
          </Typography>
          <div className={classes.grow} >
            {location.pathname === '/'&&(
            <div className={classes.button}>
                <IconButton component={Link} to='/Cart' aria-label='show cart item ' color="inherit">
                    <Badge badgeContent={totalItem} overlap="rectangular" color="secondary">
                        <ShoppingCart/>
                    </Badge>
                </IconButton>
            </div>)}
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;

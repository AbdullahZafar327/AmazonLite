import React, { useState, useEffect } from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from "@material-ui/core";
import useStyles from "./Styles.js";
import AdressForm from "../AdressForm";
import PaymentForm from "../PaymentForm.js";
import { commerce } from "../../../lib/Commerce";
import{Link} from 'react-router-dom';

const steps = ["shipping address", "payment Details"];
const Checkout = ({ cart,order,onCaptureCheckout,error}) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData,setShippingData]  = useState({});

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        setCheckoutToken(token);
      } catch (error) {

        console.log(error);
      }
    };
    generateToken();
  }, [cart]);

  console.log(checkoutToken);
  const nextStep =()=> setActiveStep((prevActiveStep)=> prevActiveStep +1);
  const backStep =()=> setActiveStep((prevActiveStep)=> prevActiveStep -1);

  const next = (data)=>{
  setShippingData(data);
  nextStep();
  }

  let Confirmation = () =>order.customer? (
    <>
    <div>
      <Typography variant='h6'>Thank you for your Purchase,:{order.customer.firstname}{order.customer.lastname}</Typography>
      <Divider className={classes.divider}/>
      <Typography variant='subtitle2'>order ref:{order.customer_reference}</Typography>
    </div>
    <br/>
    <Button type='button' variant='outlined' component={Link} to='/'>Back to Home</Button>
    </>
  ):(
    <div className={classes.spinner}>
      <CircularProgress/>
    </div>
  )
if(error){
  <>
  <Typography variant='h5'>error : {error}</Typography>
  <br/>
  <Button type='button' variant='outlined' component={Link} to='/'>Back to Home</Button>
  
  </>
}
  const Form = () => (activeStep === 0 ? <AdressForm checkoutToken={checkoutToken} next={next}/> : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} onCaptureCheckout={onCaptureCheckout} nextStep={nextStep}/>);

  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper>
          <Typography variant="h4" align="center">
            check Out
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : checkoutToken &&<Form />}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;

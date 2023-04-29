import React, { useState,useEffect } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "./CustomText.js";
import { commerce } from "../../lib/Commerce";
import {Link} from 'react-router-dom'


const AdressForm = ({checkoutToken,next}) => {
  const [shippingCountries, SetShippingCountries] = useState([]);
  const [shippingCountry, SetShippingCountry] = useState('');
  const [shippingSubDivisions, SetShippingSubDivisions] = useState([]);
  const [shippingSubDivision, SetShippingSubDivision] = useState('');
  const [shippingOptions, SetShippingOptions] = useState([]);
  const [shippingOption, SetShippingOption] = useState('');
  const methods = useForm();

 
const countries = Object.entries(shippingCountries).map(([code,name])=>({
  id:code,
  label:name
}));

const subdivisions = Object.entries(shippingSubDivisions).map(([code,name])=>({
  id:code,
  label:name
}));

const options = shippingOptions.map((sO)=>({
  id:sO.id,
  label:`${sO.description} - (${sO.price.formatted_with_symbol})`
}))


  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
    SetShippingCountries(countries);
    SetShippingCountry(Object.keys(countries)[0])
  };
const fetchSubdivisions = async (countryCode)=>{
  const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode);
  SetShippingSubDivisions(subdivisions);
  SetShippingSubDivision(Object.keys(subdivisions)[0])
}
const FetchShippingOptions = async (checkoutTokenId,country,region=null)=>{
  const options = await commerce.checkout.getShippingOptions(checkoutTokenId,{country,region})
  SetShippingOptions(options);
  SetShippingOption(options[0].id);
}
useEffect(()=>{
  fetchShippingCountries(checkoutToken.id)
},[]);

useEffect(()=>{
  if(shippingCountry)fetchSubdivisions(shippingCountry);
},[shippingCountry]);

useEffect(()=>{
  if(shippingSubDivision) FetchShippingOptions(checkoutToken.id,shippingCountry,shippingSubDivision)
},[shippingSubDivision]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Adress
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data)=>next({...data,shippingCountry,shippingSubDivision,SetShippingOption}))}>
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="First name" />
            <FormInput required name="lastName" label="Last name" />
            <FormInput required name="Address1" label="Address" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="City" label="City" />
            <FormInput required name="Zip" label="Zip / Code" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select value={shippingCountry} fullWidth onChange={(e)=>SetShippingCountry(e.target.value)}>
                 {countries.map((country)=>(
                  <MenuItem key={country.id} value={country.id}>
                  {country.label}
                </MenuItem>
                 ))} 
              </Select>
             </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select value={shippingSubDivision} fullWidth onChange={(e)=>SetShippingSubDivision(e.target.value)}>
                 {subdivisions.map((Subdivision)=>(
                  <MenuItem key={Subdivision.id} value={Subdivision.id}>
                  {Subdivision.label}
                </MenuItem>
                 ))} 
              </Select>
             </Grid>
             <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={shippingOption} fullWidth onChange={(e)=>SetShippingOption(e.target.value)}>
                {options.map((Option)=>(
                <MenuItem key={Option.id} value={Option.id}>
                 {Option.label}
              </MenuItem>
                ))}
              </Select>
             </Grid>
          </Grid>
          <br/>
          <div style={{display:'flex',justifyContent:"space-between"}}>
          <Button component={Link} to='/cart' variant='outlined' color='secondary'>Back to cart</Button>
          <Button type='submit' variant='contained' color='primary'>Next</Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AdressForm;

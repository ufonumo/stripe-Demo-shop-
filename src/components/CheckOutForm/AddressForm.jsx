import React,  {useState , useEffect} from 'react';
import { InputLabel, Select , MenuItem, Button, Grid, Typography} from '@material-ui/core'
import {useForm ,  FormProvider} from 'react-hook-form';
import CustomTextField from './CustomTextField';

import { commerce } from '../../lib/commere'

const AddressForm = ({checkoutToken}) => {
    const methods = useForm();
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setshippingSubdivisions] = useState([]);
    const [shippingSubdivision, setshippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
    //const methods = useForm();

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({id: code , label: name})) ;
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({id: code , label: name})) ;
    const options = shippingOptions.map((listOption) =>({ id : listOption.id, labe: `${listOption.description} - (${listOption.price.formatted_with_symbol})`}))

    //This function gets all the country details that was set on the commerce js platform
    const getShippingCountry = async ( checkoutTokenId) =>{
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
        console.log(countries);
    }

    const getSubDivisionCountry = async (countryCode) =>{
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

        setshippingSubdivisions(subdivisions);
        setshippingSubdivision(Object.keys(subdivisions)[0])
    }

    const getShippingOptions = async ( checkoutTokenId , country , region = null ) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId , {country , region })
        console.log(options);
        setShippingOptions(options);
        setShippingOption(options[0].id)
    }

    useEffect(() => {
        getShippingCountry(checkoutToken.id)
    }, []);

    useEffect(() => {
       if (shippingCountry) getSubDivisionCountry(shippingCountry)
    }, [shippingCountry]);

    useEffect(() => {
        if(shippingSubdivision) getShippingOptions(checkoutToken.id , shippingCountry, shippingSubdivision)
    }, [shippingSubdivision]);



    return (
        <>
            <Typography variant='h6' gutterBottom>Shipping Address</Typography>   
            <FormProvider {...methods}>
                <form action="">
                    <Grid container spacing={3}>
                        <CustomTextField name='firstName' label='First name'/>
                        <CustomTextField name='lastName' label='Last name'/>
                        <CustomTextField name='address1' label='Address'/>
                        <CustomTextField name='email' label='Email'/>
                        <CustomTextField name='city' label='City'/>
                        <CustomTextField name='zip' label='ZIP or Postal code'/>

                         <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {
                                    countries.map((list) =>(
                                        <MenuItem key={list.id} value={list.id}>
                                            {list.label}
                                        </MenuItem>
                                    ))
                                }
                                
                            </Select>
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(e) => setshippingSubdivision(e.target.value)}>
                                {
                                    subdivisions.map((list) =>(
                                        <MenuItem key={list.id} value={list.id}>
                                            {list.label}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </Grid>


                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                                {
                                    options.map((list) =>(
                                        <MenuItem key={list.id} value={list.id}>
                                            {list.label}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </Grid> 
                    </Grid>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm

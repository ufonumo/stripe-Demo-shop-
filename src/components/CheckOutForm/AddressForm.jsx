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

    const getShippingCountry = async ( checkoutTokenId) =>{
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
        console.log(countries);
    }

    useEffect(() => {
        getShippingCountry(checkoutToken.id)
    }, []);



    return (
        <>
            <Typography variant='h6' gutterBottom>Shipping Address</Typography>   
            <FormProvider {...methods}>
                <form action="">
                    <Grid container spacing={3}>
                        <CustomTextField required name='firstName' label='First name'/>
                        <CustomTextField required name='lastName' label='Last name'/>
                        <CustomTextField required name='address1' label='Address'/>
                        <CustomTextField required name='email' label='Email'/>
                        <CustomTextField required name='city' label='City'/>
                        <CustomTextField required name='zip' label='ZIP or Postal code'/>

                         <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {Object.entries(shippingCountries)}
                                <MenuItem key={shippingCountries.id} value={shippingCountries.name}>
                                    select country
                                </MenuItem>
                            </Select>
                        </Grid>
                        {/*
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={} fullWidth onChange={}>
                                <MenuItem key={} value={}>
                                    select country
                                </MenuItem>
                            </Select>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={} fullWidth onChange={}>
                                <MenuItem key={} value={}>
                                    select country
                                </MenuItem>
                            </Select>
                        </Grid> */}
                    </Grid>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm

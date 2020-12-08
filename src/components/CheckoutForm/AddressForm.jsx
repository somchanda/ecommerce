import { Grid, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import InputForm from './Checkout/InputForm';
import { commerce } from '../../lib/commerce'

const AddressForm = ({ checkoutToken }) => {
    const methods = useForm();
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    /**
     * To change object to array of object
     */
    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }));

    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name }));

    /**
     * pass shipping coutry to state
     * @param {Token id} checkoutTokenId 
     */
    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    }

    const fetchShippingSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
    }, []);

    useEffect(() => {
        if (shippingCountry) fetchShippingSubdivisions(shippingCountry);
    }, [shippingCountry]);
    return (
        <>
            <Typography variant="h6" gutterBottom>Shipping address</Typography>
            <FormProvider {...methods}>
                <form onSubmit="">
                    <Grid container spacing={3}>
                        <InputForm name='firstName' label="First Name" required></InputForm>
                        <InputForm name='lastName' label="Last Name" required></InputForm>
                        <InputForm name='address1' label="Address" required></InputForm>
                        <InputForm name='email' label="Email" required></InputForm>
                        <InputForm name='city' label="City" required></InputForm>
                        <InputForm name='zip' label="ZIP / Postal code" required></InputForm>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {countries.map((country) => (
                                    <MenuItem key={country.id} value={country.id}>
                                        {country.label}
                                    </MenuItem>
                                ))}

                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(e)=> setShippingSubdivision(e.target.value)}>
                                {
                                    subdivisions.map((subdivision)=>(
                                        <MenuItem key={subdivisions.id} value ={subdivision.id}>
                                            {subdivision.label}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </Grid>
                        {/* <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Option</InputLabel>
                            <Select value={} fullWidth onChange={}>
                                <MenuItem key={} value={}>
                                    Select Me
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

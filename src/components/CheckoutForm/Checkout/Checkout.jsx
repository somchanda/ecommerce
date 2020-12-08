import React, {useEffect, useState} from 'react'
import {Paper, Step, Stepper, StepLabel, Typography, CircularProgress, Divider, Button} from '@material-ui/core'
import useStyles from './Style'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import  { commerce } from '../../../lib/commerce'

const steps = ["Shipping address", 'Payment address'];
const Checkout = ({cart}) => {
    const classes = useStyles();
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() =>{
        const generateToken = async() => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});
                setCheckoutToken(token);
            } catch (error) {
                
            }
        }
        generateToken();
    }, [cart])


    const Form = () => activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} /> : <PaymentForm />
    const Confirmation = () =>(
        <div>Cofirmation</div>
    )
    return (
        <>
            <div className={classes.toolbar}></div>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) =>(
                            <Step key={step}>
                                <StepLabel>
                                    {step}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form /> }
                </Paper>
            </main>
        </>
    )
}

export default Checkout

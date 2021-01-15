import React, { useEffect, useState } from 'react'
import { Paper, Step, Stepper, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core'
import useStyles from './Style'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import { commerce } from '../../../lib/commerce'
import { Link, useHistory } from 'react-router-dom'

const steps = ["Shipping address", 'Payment address'];
const Checkout = ({ cart, order, handleCheckoutCapture, errorMessage }) => {
    const classes = useStyles();
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const [shippingData, setShippingData] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    const history = useHistory();
    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
                setCheckoutToken(token);
            } catch (error) {
                history.push('/');
            }
        }
        generateToken();
    }, [cart])

    const nextStep = () => setActiveStep((prevActiveSteps) => prevActiveSteps + 1);
    const backStep = () => setActiveStep((prevActiveSteps) => prevActiveSteps - 1);


    const next = (data) => {
        setShippingData(data);
        nextStep();
    }

    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true);
        }, 300);
    }
    const Form = () => activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} next={next} /> : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} nextStep={nextStep} handleCheckoutCapture={handleCheckoutCapture} timeout={timeout}/>
    let Confirmation = () => order.customer ? (
        <>
            <Typography variant='h5'>Thank you for purchase, {order.customer.firstname} {order.customer.lastname} </Typography>
            <Divider />
            <Typography variant='subtitle1'>Order ref: {order.customer_reference}</Typography>
            <br />
            <Button component={Link} to='/' variant='outlined'>Back home</Button>
        </>
    ) : isFinished ? (
        <>
            <Typography variant='h5'>Thank you for purchase</Typography>
            <Divider />
            <br />
            <Button component={Link} to='/' variant='outlined'>Back home</Button>
        </>
    ): (
            <div className = {classes.spinner}>
                <CircularProgress />
            </div >
        );
return (
    <>
        <div className={classes.toolbar}></div>
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant="h4" align="center">Checkout</Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((step) => (
                        <Step key={step}>
                            <StepLabel>
                                {step}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
            </Paper>
        </main>
    </>
)
}

export default Checkout

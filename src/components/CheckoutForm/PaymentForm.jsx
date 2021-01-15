import React from 'react';
import { Typography, Button, Divider, CssBaseline } from '@material-ui/core';
import { CardElement, Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ shippingData, checkoutToken, backStep, nextStep, handleCheckoutCapture, timeout }) => {
    const handleSubmit = async (events, elements, stripe) =>{
        events.preventDefault();
        if(!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
        const {error, paymentMethod} = await stripe.createPaymentMethod({type: 'card', card: cardElement});
        if(error){
            console.log(error);
        }else{
            const orderData = {
                line_items: checkoutToken.live.line_items,
                customer: {
                    firstname: shippingData.firstName,
                    lastname: shippingData.lastName,
                    email: shippingData.email
                },
                shipping: {
                    name: 'Primary',
                    street: shippingData.address1,
                    town_city: shippingData.city,
                    country_state: shippingData.shippingSubdivision,
                    postal_zip_code: shippingData.zip,
                    country: shippingData.country,
                },
                fulfillment: {shipping_method: shippingData.shippingOption},
                payment:{
                    gateway: 'stripe',
                    stripe: {
                        payment_method_id: paymentMethod.id
                    }
                }
            }
            handleCheckoutCapture(checkoutToken.id, orderData);
            timeout();
            nextStep();
            
        }


    }
    return (
        <>
            <CssBaseline/>
            <Review checkoutToken={checkoutToken}/>
            <Divider />
            <Typography variant='h6' gutterBottom style={{padding: '20px 0'}}>Payment Method</Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({elements, stripe}) => (
                        <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                            <CardElement />
                            <br/><br/>
                            <div style={{display: 'flex', justifyContent:'space-between'}}>
                                <Button variant='outlined' onClick={backStep}>Back</Button>
                                <Button variant='contained' type='submit' color='primary' disabled={!stripe}>
                                    Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                                </Button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>

            </Elements>
        </>
    )
}

export default PaymentForm

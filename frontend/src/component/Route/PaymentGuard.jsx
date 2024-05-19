import React, { useState,useEffect } from 'react';
import axios from "axios";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from '../Cart/Payment';

const PaymentGuard = () => {
    const [stripeApiKey, setStripeApiKey] = useState("");

  // async function getStripeApiKey() {
  //   const { data } = await axios.get("/api/v1/stripeapikey");

  //   setStripeApiKey(data.stripeApiKey);
  // }

  useEffect(() => {
    async function fetchStripeApiKey() {
        try {
            const { data } = await axios.get("/api/v1/stripeapikey");
            setStripeApiKey(data.stripeApiKey);
        } catch (error) {
            console.error("Error fetching Stripe API key:", error);
            // Handle error fetching Stripe API key
        }
    }

    fetchStripeApiKey();
}, []);

  return (
    stripeApiKey && (<Elements stripe={loadStripe(stripeApiKey)}>
        <Payment/>
        </Elements>
        )
    );
}

export default PaymentGuard
'use client'

import { useState } from 'react';
import OrderSummary from './orderSummary';
import PaymentForm from './paymentForm';
import Confirmation from './confirmation';

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [orderData, setOrderData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const previousStep = () => setStep((prevStep) => prevStep - 1);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Proceso de Checkout</h1>
      {step === 1 && <OrderSummary onNext={nextStep} />}
      {step === 2 && <PaymentForm onPrevious={previousStep} onNext={nextStep} />}
      {step === 3 && <Confirmation />}
    </div>
  );
}
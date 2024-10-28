import { FC, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface PaymentFormProps {
  onNext: () => void;
  onPrevious: () => void;
}

const stripePromise = loadStripe('your-publishable-key-here'); // Reemplaza con tu clave pública de Stripe

const PaymentForm: FC<PaymentFormProps> = ({ onNext, onPrevious }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    const createPaymentIntent = async () => {
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 29900 }), // Precio en centavos (299.00 USD)
      });
      const data = await response.json();
      setClientSecret(data.clientSecret);
    };
    createPaymentIntent();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement || !clientSecret) return;

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      console.error(error);
    } else if (paymentIntent) {
      onNext();
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <form onSubmit={handleSubmit} className="p-6 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">Información de Pago</h2>
        <CardElement className="p-4 border rounded-lg mb-4" />
        <div className="flex justify-between mt-4">
          <button type="button" onClick={onPrevious} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
            Volver
          </button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Realizar Pago
          </button>
        </div>
      </form>
    </Elements>
  );
};

export default PaymentForm;

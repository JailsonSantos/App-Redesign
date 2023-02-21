import Head from 'next/head';
import { Stripe } from 'stripe';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Button from '../components/Button';
import getStripe from '../utils/get-stripejs';
import { clearBasket } from '../redux/apiCalls';
import { signIn, useSession } from 'next-auth/react';
import { fetchPostJSON } from '../utils/api-stripejs';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronDownIcon } from '@heroicons/react/outline';
import CheckoutProduct from '../components/CheckoutProduct';
import { selectBasketItems, selectBasketQuantity, selectBasketTotal } from '../redux/basketSlice';

function Checkout() {

  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const items = useSelector(selectBasketItems);
  const quantity = useSelector(selectBasketQuantity);
  const basketTotal = useSelector(selectBasketTotal);

  const createCheckoutSession = async () => {
    setLoading(true);

    const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
      "/api/checkout_sessions", { items }
    );

    // Internal Server Error
    if ((checkoutSession as any).statusCode === 500) {
      console.error((checkoutSession as any).message);
      return;
    }

    const redirectStripe = await getStripe();

    const { error } = await redirectStripe!.redirectToCheckout({
      sessionId: checkoutSession.id,
    });

    console.warn(error.message);

    setLoading(false);
  }

  const totalBasketFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(basketTotal);

  return (
    <div className='min-h-screen overflow-hidden bg-[#E7ECEE]'>
      <Head>
        <title>Bag - Apple</title>
        <link rel="icon" href='/favicon.ico' />
      </Head>

      <Header />

      <main className="mx-auto max-w-5xl pb-24">
        <div className="px-5">
          <h1 className='my-4 text-3xl font-sem lg:text-4xl'>
            {quantity > 0 ? "Review your bag" : "Your bag is empty!"}
          </h1>
          <div className='flex flex-col justify-between sm:flex-row'>
            <p className='my-4'>Free delivery ans free returns</p>

            {quantity > 0 && (
              <Button
                width="w-25"
                title="Clear Basket"
                onClick={() => clearBasket(dispatch)}
              />
            )}
          </div>

          {quantity === 0 && (
            <Button
              title="Continue Shopping"
              onClick={() => router.push("/")}
            />
          )}
        </div>

        {quantity > 0 && (
          <div className="mx-5 md:mx-8">
            {items.map((item) => (
              <CheckoutProduct key={item._id} item={item} />
            ))}

            <div className="my-12 mt-6 mgl-auto max-w-3xl0">
              <div className='divide-y divide-gray-300'>
                <div className='pb-4'>
                  <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>{totalBasketFormatted}</p>
                  </div>
                  <div className='flex justify-between'>
                    <p>Shipping</p>
                    <p>FREE</p>
                  </div>

                  <div className='flex justify-between'>
                    <div className='flex flex-col gap-x-1 lg:flex-row'>
                      Estimated tax for: {" "}
                      <p className='flex cursor-pointer items-end text-blue-500 hover:underline'>
                        Enter zip code
                        <ChevronDownIcon className='h-6 w-6' />
                      </p>
                    </div>
                    <p>$ -</p>
                  </div>
                </div>

                <div className='flex justify-between pt-4 text-xl font-semibold'>
                  <h4>Total</h4>
                  <h4>
                    {totalBasketFormatted}
                  </h4>
                </div>
              </div>

              <div className='my-14 space-y-4'>
                <h4 className='text-xl font-semibold'>
                  TotalHow wold you like to check out?
                </h4>
              </div>
              <div className='flex flex-col gap-4 md:flex-row'>
                <div className='order-2 flex flex-1 flex-col items-center rounded-xl bg-gray-200 p-8 py-12 text-center'>
                  <h4 className='mb-4 flex flex-col text-xl font-semibold'>
                    <span>Pay Monthly</span>
                    <span>With App Card</span>
                    <span>R$ 28316/mo. at 0% APR <sup className="-top-1">º</sup>
                    </span>
                  </h4>
                  <Button title="Check Out with Apple Cart Monthly Installments" />
                  <p className='mt-2 max-w-[240px] tex-[13px]'>
                    $ 0.00 due today, which includes applicable full-price items, down payments, shipping, and taxes.
                  </p>
                </div>

                <div className='flex flex-1 flex-col items-center space-y-8 rounded-xl bg-gray-200 p-8 py-12 md:order-2'>
                  <h4 className='mb-4 flex flex-col text-xl font-semibold'>
                    Pay in full
                    <span>
                      {totalBasketFormatted}
                    </span>
                  </h4>

                  {
                    session ?
                      <Button
                        noIcon
                        width="w-full"
                        title="Check out"
                        loading={loading}
                        onClick={createCheckoutSession}
                      />
                      :
                      <Button
                        noIcon
                        width="w-full"
                        title="Check out"
                        loading={loading}
                        onClick={() => signIn()}
                      />
                  }

                </div>
              </div>
            </div>
          </div>
        )}
      </main>

    </div>
  );
}

export default Checkout;

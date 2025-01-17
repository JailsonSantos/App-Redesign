import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { useDispatch } from 'react-redux';
import Button from '../components/Button';
import { useSession } from 'next-auth/react';
import { clearBasket } from '../redux/apiCalls';
import { useMediaQuery } from 'react-responsive';
import React, { useEffect, useState } from 'react';
import { fetchLineItems } from '../utils/fecthLineItems';
import { PriceFormatted, ShippingFee } from '../utils/priceFormatted';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, ShoppingCartIcon } from '@heroicons/react/outline';

interface Props {
  products: StripeProduct[]
}

function Success({ products }: Props) {

  const router = useRouter();
  const dispatch = useDispatch();
  const { session_id } = router.query;
  const { data: session } = useSession();

  const [mounted, setMounted] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  const subtotal = products.reduce((acc, product) => acc + (product.quantity * product.price.unit_amount), 0);


  // showOrderSummary always true for desktop but only conditionally true for mobile
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const showOrderSummaryCondition = isTabletOrMobile ? showOrderSummary : true;

  const handleShowOrderSummary = () => {
    setShowOrderSummary(!showOrderSummary);
  };

  function handleGoToHome() {
    clearBasket(dispatch);
    router.push('/');
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      <Head>
        <title>Thank you! - Apple</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className='mx-auto max-w-xl'>
        <Link href="/">
          <div className='relative ml-4 h-16 w-8 cursor-pointer transition lg:hidden'>
            <Image src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c516.png" fill style={{ objectFit: 'contain' }} alt="" />
          </div>
        </Link>
      </header>

      <main className='grid grid-cols-1 lg:grid-cols-9'>
        <section className="order-2 mx-auto max-w-xl pb-12 lg:col-span-5 lg:mx-0 lg:max-w-none lg:pr-16 lg:pt-16 xl:pl-16 2xl:pl-44">
          <Link href="/">
            <div className='relative ml-14 hidden h-24 w-12 cursor-pointer transition lg:inline-flex'>
              <Image
                fill
                style={{ objectFit: 'contain' }}
                alt="Logo da empresa no formato de maçã"
                src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c516.png"
              />
            </div>
          </Link>

          <div className='my-8 ml-4 flex space-x-4 lg:ml-14 xl:ml-0'>
            <div className='flex h-11 w-11 items-center justify-center rounded-full border-2 border-green-500'>
              <CheckIcon className='h-8 w-8 text-green-500' />
            </div>
            <div>
              <p className='text-sm text-gray-600'>Order: {session_id?.slice(-5)}</p>
              <h4 className='text-lg'>
                Thank you {" "}
                {session ? session.user?.name?.split(" ")[0] : "Guest"}
              </h4>
            </div>
          </div>

          <div className='mx-4 divide-y divide-gray-300 rounded-md border border-gray-300 p-4 lg:ml-14'>
            <div className='space-y-2 pb-3'>
              <p>Your order is confirmed</p>
              <p className='text-sm text-gray-600'>
                We've accepted your order, and we're getting it ready.
                Come back to this page for updates on your shipment status.
              </p>
            </div>

            <div className='pt-3 text-sm'>
              <p className='font-medium text-gray-600'>
                Other tracking number:
              </p>
              <p>CNB123113</p>
            </div>
          </div>

          <div className='my-4 mx-4 space-y-2 rounded-md border border-gray-300 p-4 lg:ml-14'>
            <p>Order updates</p>
            <p className='text-sm text-gray-600'>
              You'll get shipping and delivery updates by email and text.
            </p>
          </div>

          <div className='mx-4 flex flex-col items-center justify-between text-sm lg:ml-14 lg:flex-row'>
            <p className="hidden lg:inline">
              Need help? Contact us
            </p>
            {mounted && (
              <Button
                padding="py-4"
                title='Continue Shopping'
                onClick={handleGoToHome}
                width={isTabletOrMobile ? "w-full" : undefined}
              />
            )}
          </div>
        </section>

        {mounted && (
          <section className="overflow-y-scroll border-y border-gray-300 bg-[#FAFAFA] lg:order-2 lg:col-span-4 lg:h-screen lg:border-y-0">

            <div className={`w-full ${showOrderSummaryCondition && "border-b"} border-gray-300 text-sm lg:hidden`}>
              <div className='mx-auto flex max-w-xl items-center justify-between px-4 py-6'>
                <button onClick={handleShowOrderSummary} className="flex items-center space-x-2">
                  <ShoppingCartIcon className='h-6 w-6' />
                  <p>Show order summary</p>
                  {
                    showOrderSummaryCondition
                      ? (<ChevronUpIcon className='h-4 w-4' />)
                      : (<ChevronDownIcon className='h-4 w-4' />)
                  }
                </button>

                <p className='text-xl font-medium text-black'>
                  {PriceFormatted(subtotal)}
                </p>
              </div>
            </div>

            {showOrderSummaryCondition && (
              <div className='mx-auto max-w-xl divide-y border-gray-300 px-4 py-4 lg:mx-0 lg:max-w-lg lg:px-10 lg:py-16'>
                <div className='space-y-4 pb-4'>
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center space-x-4 text-sm font-medium"
                    >
                      <div className='relative flex h-16 w-16 items-center justify-center rounded-md border border-gray-300 bg-[#F1F1F1] text-xs text-white'>
                        <div className='relative h-7 w-7 animate-bounce rounded-md'>
                          <Image src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c516.png" fill style={{ objectFit: 'contain' }} alt="" />
                        </div>
                        <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[gray] text-xs">
                          {product.quantity}
                        </div>
                      </div>

                      <p className="flex-1 flex-col">
                        {product.description} {<br />}
                        Qtde {product.quantity}
                      </p>
                      <p className='flex text-end'>
                        {PriceFormatted(product.quantity * product.price.unit_amount)} {<br />}
                        {`${PriceFormatted(product.price.unit_amount)} cada`}
                      </p>
                    </div>
                  ))}
                </div>

                <div className='space-y-1 py-4'>
                  <div className='flex justify-between text-sm'>
                    <p className="text-[gray]">Subtotal:</p>
                    <p className="font-medium">{PriceFormatted(subtotal)}</p>
                  </div>

                  <div className='flex justify-between text-sm'>
                    <p className="text-[gray]">Discount:</p>
                    <p className="text-[gray]"></p>
                  </div>

                  <div className='flex justify-between text-sm'>
                    <p className="text-[gray]">Shipping:</p>
                    <p className="font-medium">{ShippingFee()}</p>

                  </div>
                </div>
                <div className='flex justify-between pt-4'>
                  <p>Total</p>
                  <p className="flex items-center gap-x-2 text-xs text-[gray]">
                    <span className="text-xl font-medium text-black">
                      {PriceFormatted(subtotal)}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  )
}

export default Success;

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {

  const sessionId = query.session_id as string;

  const products = await fetchLineItems(sessionId)

  return {
    props: {
      products
    }
  }
}

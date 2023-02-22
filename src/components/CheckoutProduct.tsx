import Image from 'next/image';
import React, { useState } from 'react';
import { urlFor } from '../libs/sanity';
import { useDispatch } from 'react-redux';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';
import { addTotal, deleteProduct, minusTotal } from '../redux/basketSlice';

interface Props {
  item: {
    _id: string;
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    _type: "product";
    title: string;
    price: number;
    slug: {
      _type: "slug";
      current: string;
    };
    description: string;
    category: {
      _type: "reference";
      _ref: string;
    };
    image: Image[];
    quantityOfProduct: number;
  }
}

function CheckoutProduct({ item }: Props) {

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.quantityOfProduct);
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  const handleUpdatedQuantityOfProduct = (type: string) => {
    if (type === "desc") {
      if (quantity > 1) {

        setQuantity(quantity - 1)

        const newTotal = 1 * item.price;

        const newProduct = {
          ...item,
          quantityOfProduct: quantity - 1
        }

        dispatch(
          minusTotal(
            {
              ...newProduct,
              total: newTotal,
            }
          )
        );

      } else {
        handleDeleteProductOfCart();
      }
    } else {
      setQuantity(quantity + 1);

      const newTotal = 1 * item.price;

      const newProduct = {
        ...item,
        quantityOfProduct: quantity + 1
      }

      dispatch(
        addTotal(
          {
            ...newProduct,
            total: newTotal,
          }
        )
      );
    }
  }

  const handleDeleteProductOfCart = () => {

    dispatch(
      deleteProduct(
        {
          ...item,
        }
      )
    );
  }

  const priceTotalFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(quantity * item.price);


  const handleShowOrderSummary = () => {
    setShowOrderSummary(!showOrderSummary);
  };


  return (
    <div className="flex flex-col justify-center items-center gap-x-4 border-b border-gray-300 pb-5 lg:flex-row lg:items-center lg:justify-center">
      <div className='relative h-44 w-44'>
        <Image
          fill
          alt={item.title}
          style={{ objectFit: "contain" }}
          src={urlFor(item.image[0]).url()}
        />
      </div>

      <div className="flex flex-1 flex-col sm:flex-row sm:items-center sm:justify-center lg:items-center w-full">
        <div className="space-y-4 w-full">
          <div className='flex flex-col gap-x-8 text-xl lg:flex-row lg:text-2xl'>
            <h4 className='font-semibold lg:w-96'>{item.title}</h4>
          </div>
          <button onClick={handleShowOrderSummary} className="flex text-blue-500" >
            {showOrderSummary ?
              <>
                Hidden product details
                <ChevronUpIcon className='h-6 w-6' />
              </>
              :
              <>
                Show product details
                <ChevronDownIcon className='h-6 w-6' />
              </>
            }
          </button>
          {
            showOrderSummary &&
            <div className='text-gray-700'>
              O  com seu jeito totalmente novo, intuitivo e divertido de interagir.
              Suas informações mais importantes a uma olhadinha de distância.
            </div>
          }
        </div>
        <div className='flex items-start justify-start sm:items-center sm:justify-center gap-5 w-full'>
          <button
            onClick={() => handleUpdatedQuantityOfProduct("desc")}
            className='h-7 w-7 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-[10px] text-white'
          >
            -
          </button>
          <p className='flex items-end gap-x-5 font-semibold'>
            {item.quantityOfProduct}
          </p>
          <button
            onClick={() => handleUpdatedQuantityOfProduct("inc")}
            className='h-7 w-7 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-[10px] text-white'
          >
            +
          </button>
        </div>

        <div className='flex items-start justify-start sm:items-center sm:justify-center space-y-4 w-full'>
          <h4 className='text-xl font-semibold lg:text-2xl'>
            {priceTotalFormatted}
          </h4>
        </div>
      </div>
    </div>

  )
}

export default CheckoutProduct
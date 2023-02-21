import React from 'react';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { urlFor } from '../libs/sanity';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/basketSlice';
import { ShoppingCartIcon } from '@heroicons/react/outline';

interface Props {
  product: Product
}

function Product({ product }: Props) {

  const dispatch = useDispatch();

  const handleAddNewProductToBasket = () => {

    const priceFormatted = product.price;
    const total = 1 * priceFormatted;

    const newProduct = {
      ...product,
      quantityOfProduct: 1
    }

    dispatch(
      addProduct(
        {
          ...newProduct,
          quantity: 1,
          total,
        }
      )
    );

    toast.success(`${product.title} added to basket`, {
      position: "bottom-center",
    });
  };

  const priceFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(product.price);

  return (
    <div className="flex h-fit w-[320px] select-none flex-col space-y-3 rounded-xl bg-[#35383c] p-8 md:h-[500px] md:w-[400px] md:p-10">
      <div className='relative h-64 w-full md:h-72'>
        <Image src={urlFor(product.image[0]).url()} alt={product.title} fill style={{ objectFit: 'contain' }} />
      </div>

      <div className="flex flex-1 items-center justify-between space-x-3">
        <div className="space-y-2 text-white md:text-2xl">
          <p>{product.title}</p>
          <p>{priceFormatted}</p>
        </div>
        <div className="flex h-16 w-16 flex-sh cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 md:h-[70px] md:w-[70px]"
          onClick={handleAddNewProductToBasket}
        >
          <ShoppingCartIcon className="h-8 w-8 text-white" />
        </div>
      </div>
    </div>
  );
}

export default Product

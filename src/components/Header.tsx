import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import SignOut from "../assets/signout.svg";
import { selectBasketQuantity } from '../redux/basketSlice';
import { signIn, signOut, useSession } from 'next-auth/react';
import { SearchIcon, ShoppingBagIcon, UserIcon } from '@heroicons/react/outline';

function Header() {
  const { data: session } = useSession();
  const quantity = useSelector(selectBasketQuantity);

  return (
    <header className='sticky top-0 z-30 flex w-full items-center justify-between bg-[#E7ECEE] p-4'>
      <div className='flex items-center justify-center md:w-1/5'>

        <Link href="/">
          <div className="relative w-15 cursor-pointer opacity-75 h-10 transition hover:opacity-100 ">
            <Image
              width='34'
              height='34'
              style={{ objectFit: 'contain' }}
              src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c516.png"
              alt="Logo da empresa no formato de maçã"
            />
          </div>
        </Link>
      </div>

      <div className="hidden flex-1 items-center justify-center space-x-8 md:flex">
        <a className="headerLink">Products</a>
        <a className="headerLink">Explore</a>
        <a className="headerLink">Support</a>
        <a className="headerLink">Business</a>
      </div>
      <div className="flex items-center justify-center space-x-4 md:w-1/5">
        <SearchIcon className="headerIcon" />
        <Link href="checkout">
          <div className='relative cursor-pointer'>
            {quantity > 0 && (
              <span className="absolute -right-1 -top-1 z-50 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-[10px] text-white">
                {quantity}
              </span>
            )}
            <ShoppingBagIcon className="headerIcon" />
          </div>
        </Link>
        {
          session ? (
            <>
              <Image
                width='34'
                height='34'
                className="rounded-full"
                alt={session.user?.name || ''}
                src={session.user?.image || ''}
                style={{ objectFit: 'contain' }}
              />

              <Image
                onClick={() => signOut()}
                width="25" height="25" src={SignOut} alt="Button of logout"
                className="cursor-pointer opacity-70 transition hover:opacity-100"
              />
            </>
          ) : (
            <UserIcon
              className="headerIcon"
              onClick={() => signIn()}
            />
          )
        }

      </div>
    </header>
  )
}

export default Header

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { selectItems } from './cartSlice';
import { useDispatch, useSelector } from 'react-redux';


export function Cart() {

  const cartItems = useSelector(selectItems);
  const totalAmount = cartItems.reduce((amount, item) => item.price * item.quantity + amount, 0)
  const totalItems = cartItems.reduce((total, item) => item.quantity + total, 0)

  return (
    <>
      <div>
        <div className="bg-gray-200 mt-14  mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flow-root">

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <h1 className="text-4xl font-bold my-4 tracking-tight text-gray-900">Cart</h1>
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cartItems.map((cart) => (
                  <li key={cart.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        alt={cart.title}
                        src={cart.thumbnail}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={cart.thumbnail} target="_blank" rel="noreferrer">{cart.title}</a>
                          </h3>
                          <div>
                            <p className="ml-4">${Math.round(cart.price * (1 - cart.discountPercentage / 100))}</p>
                            <p className="ml-4 block text-gray-500 line-through">{cart.price}</p>
                          </div>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{cart.brand}</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500">
                          <label htmlFor="quantity" className="inline text-sm font-medium leading-6 text-gray-500 mr-3" >
                            Qty
                          </label>
                          <select >
                            <option value="1">1</option>
                            <option value="2">2</option>
                          </select>
                        </div>

                        <div className="flex">
                          <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>{totalAmount}</p>
            </div>
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Total Items in Cart</p>
              <p>{totalItems} items</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
            <div className="mt-6">
              <Link
                to='/checkout'
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or{' '}
                <Link to='/'>
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

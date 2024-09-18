import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { selectItems, updateCartAsync, deleteCartAsync, selectCartStatus } from './cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { discountedPrice } from '../../app/constant';
import { Grid } from 'react-loader-spinner';
import Modal from '../common/Modal';


export function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectItems);
  const status = useSelector(selectCartStatus);
  const totalAmount = cartItems.reduce((amount, item) => discountedPrice(item?.product) * item.quantity + amount, 0)
  const totalItems = cartItems.reduce((total, item) => item.quantity + total, 0)
  const [openModal, setOpenModal] = useState(null);

  const handleRemove = (e, id) => {
    dispatch(deleteCartAsync(id));
  }

  const handleQuantity = (e, cart) => {
    dispatch(updateCartAsync({ id:cart.id, quantity: +e.target.value }));
  }

  return (
    <>
      <div>
        <div className="bg-gray-200 mt-10  mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-4xl font-bold my-4 tracking-tight text-gray-900">
              Cart
            </h1>
            <div className="flow-root">
              {status === 'loading' ? (
                <Grid
                  height="80"
                  width="80"
                  color="rgb(79, 70, 229) "
                  ariaLabel="grid-loading"
                  radius="12.5"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              ) : null}
              {cartItems.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-lg text-gray-500">  Your cart is empty, but your next favorite find is just a click away! <br />
                    Start exploring and fill your cart with items that make you smile.</p>
                </div>
              ) : (
                <>
                  <ul className="-my-6 divide-y divide-gray-200">
                    {cartItems.map((cart,index) => (
                      <li key={index} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            alt={cart?.product?.title || "ProductImage"}
                            src={cart?.product?.thumbnail || "https://cdn.pixabay.com/photo/2022/06/09/04/51/robot-7251710_1280.png"}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={cart?.product?.thumbnail || "https://cdn.pixabay.com/photo/2022/06/09/04/51/robot-7251710_1280.png"} target="_blank" rel="noreferrer">{cart?.product?.title}</a>
                              </h3>
                              <div>
                                <p className="ml-4">${discountedPrice(cart?.product)}</p>
                                <p className="ml-4 block text-gray-500 line-through">{cart?.product?.price || 0}</p>
                              </div>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{cart?.product?.brand}</p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500">
                              <label htmlFor="quantity" className="inline text-sm font-medium leading-6 text-gray-500 mr-3" >
                                Qty
                              </label>
                              <select onChange={(e) => handleQuantity(e, cart)} value={cart?.quantity}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                              </select>
                            </div>

                            <div className="flex">
                              <Modal
                                title={`Delete ${cart?.product?.title || "Undefined"}`}
                                message="Are you sure you want to delete this Cart item ?"
                                dangerOption="Delete"
                                cancelOption="Cancel"
                                dangerAction={(e) => handleRemove(e, cart.id)}
                                cancelAction={() => setOpenModal(null)}
                                showModal={openModal === cart.id}
                              ></Modal>

                              <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={e => {
                                setOpenModal(cart.id)
                              }}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul></>
              )}


            </div>
          </div>
          {cartItems.length > 0 ? (
            <>
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
            </>
          ) :
            <div className="mt-2 py-4 flex justify-center text-center text-sm text-gray-500">
              <p>
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
            </div>}

        </div>
      </div>
    </>
  );
}

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoggedInUserOrdersAsync, selectUserOrders, selectUserOrdersStatus } from '../userSlice';
import { Link } from 'react-router-dom';
import { Grid } from 'react-loader-spinner';


export function UserOrders() {
    const dispatch = useDispatch();
    const orders = useSelector(selectUserOrders);
    const status = useSelector(selectUserOrdersStatus);

    useEffect(() => {
        dispatch(fetchLoggedInUserOrdersAsync());
    }, [])

    return (
        <div>
            {orders && orders.length > 0 ? (
                orders?.map((order, index) => (
                    <div key={index}>
                        <div>
                            <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                    <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                                        Order # {order.id}
                                    </h1>
                                    <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
                                        Order Status : {order.status}
                                    </h3>
                                    <div className="flow-root">
                                        <ul className="-my-6 divide-y divide-gray-200">
                                            {order.cartItems.map((item, index) => (
                                                <li key={index} className="flex py-6">
                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                        <img
                                                            src={item?.product?.thumbnail}
                                                            alt={item?.product?.title}
                                                            className="h-full w-full object-cover object-center"
                                                        />
                                                    </div>

                                                    <div className="ml-4 flex flex-1 flex-col">
                                                        <div>
                                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                                <h3>
                                                                    <a href={item?.product?.thumbnail}>{item?.product?.title}</a>
                                                                </h3>
                                                                <p className="ml-4">${item?.product?.price}</p>
                                                            </div>
                                                            <p className="mt-1 text-sm text-gray-500">
                                                                {item?.product?.brand}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-1 items-end justify-between text-sm">
                                                            <div className="text-gray-500">
                                                                <label
                                                                    htmlFor="quantity"
                                                                    className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                                                                >
                                                                    Qty :{item.quantity}
                                                                </label>

                                                            </div>

                                                            <div className="flex">

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
                                        <p>$ {order.totalAmount}</p>
                                    </div>
                                    <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                                        <p>Total Items in Cart</p>
                                        <p>{order.totalItems} items</p>
                                    </div>
                                    <p className="mt-0.5 text-sm text-gray-500">
                                        Shipping Address :
                                    </p>
                                    <div
                                        className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
                                    >
                                        <div className="flex gap-x-4">

                                            <div className="min-w-0 flex-auto">
                                                <p className="text-sm font-semibold leading-6 text-gray-900">
                                                    {order?.selectAddress?.name}
                                                </p>
                                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                    {order?.selectAddress?.street}
                                                </p>
                                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                    {order?.selectAddress?.pinCode}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                                            <p className="text-sm leading-6 text-gray-900">
                                                Phone: {order?.selectAddress?.phone}
                                            </p>
                                            <p className="text-sm leading-6 text-gray-500">
                                                {order?.selectAddress?.city}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                ))) :
                <>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-700 mt-12">You haven't placed any orders yet.</h2>
                        <p className="text-gray-500 mt-4">Explore our products and place your first order!</p>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
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
                    </div>
                </>
            }

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
        </div>
    );
}

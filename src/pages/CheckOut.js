import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectItems } from '../features/cart/cartSlice';
import { useForm } from 'react-hook-form';
import { deleteCartAsync, updateCartAsync } from '../features/cart/cartSlice';
import { updateUserAsync } from "../features/auth/authSlice";
import { selectUserInfo } from '../features/user/userSlice';
import { createOrderAsync, selectCurrentOrder } from '../features/orders/orderSlice';
import { discountedPrice } from '../app/constant';


function Checkout() {
    const dispatch = useDispatch();
    const user = useSelector(selectUserInfo);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [selectAddress, setSelectedAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('cash');

    const cartItems = useSelector(selectItems);
    const currentOrder = useSelector(selectCurrentOrder);
    console.log('currentOrder' , currentOrder);
    const totalAmount = cartItems.reduce((amount, item) => discountedPrice(item.product) * item.quantity + amount, 0)
    const totalItems = cartItems.reduce((total, item) => item.quantity + total, 0)

    const handleRemove = (e, id) => {
        dispatch(deleteCartAsync(id));
    }

    const handleQuantity = (e, cart) => {
        dispatch(updateCartAsync({ id: cart.id, quantity: +e.target.value }));
    }

    const handleAddress = (e) => {
        setSelectedAddress(user.addresses[e.target.value])
    }

    const handlePayment = (e) => {
        setPaymentMethod(e.target.value);
    }

    const handleOrder = (e) => {
        if (selectAddress && paymentMethod) {
            const order = { cartItems, totalAmount, user: user.id, totalItems, selectAddress, paymentMethod, status: 'pending' }
            dispatch(createOrderAsync(order));
        }
        else {
            console.log("enter address")
        }
    }

    return (
        <>

            {currentOrder && <Navigate to={`/order-success/${currentOrder.id}`} replace={true}></Navigate>}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">

                    {/* Personal Information form  */}

                    <div className="lg:col-span-3">
                        <form className='bg-white px-5 mt-12 py-12'
                            noValidate
                            onSubmit={handleSubmit((data) => {
                                dispatch(updateUserAsync({ ...user, addresses: [...user.addresses, data] }));
                                reset();
                            })}>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-2xl font-semibold leading-7 text-gray-900">Personal Information</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-4">
                                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                                Full name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="name"
                                                    {...register('name', {
                                                        required: "Name is required"
                                                    })}
                                                    type="text"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors.name && (
                                                    <p className="text-red-500">{errors.name.message}</p>
                                                )}
                                            </div>
                                        </div>


                                        <div className="sm:col-span-4">
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                Email address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    {...register('email', {
                                                        required: "Email is required"
                                                    })}
                                                    type="email"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors.email && (
                                                    <p className="text-red-500">{errors.email.message}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                                Phone Number
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="phone"
                                                    {...register('phone', {
                                                        required: "Phone number is required"
                                                    })}
                                                    type="tel"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors.phone && (
                                                    <p className="text-red-500">{errors.phone.message}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                                Country
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id="country"
                                                    {...register('country', {
                                                        required: "Country is required"
                                                    })}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                >
                                                    <option>India</option>
                                                    <option>United States</option>
                                                    <option>Canada</option>
                                                    <option>Mexico</option>
                                                </select>
                                                {errors.country && (
                                                    <p className="text-red-500">{errors.country.message}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                                                Street address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="street"
                                                    {...register('street', {
                                                        required: "Street address is required"
                                                    })}
                                                    type="text"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors.street && (
                                                    <p className="text-red-500">{errors.street.message}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2 sm:col-start-1">
                                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                City
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="city"
                                                    {...register('city', {
                                                        required: "City address is required"
                                                    })}
                                                    type="text"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors.city && (
                                                    <p className="text-red-500">{errors.city.message}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                                State / Province
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="region"
                                                    {...register('region', {
                                                        required: "Region address is required"
                                                    })}
                                                    type="text"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors.pinCode && (
                                                    <p className="text-red-500">{errors.pinCode.message}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                                                ZIP / Postal code
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="pinCode"
                                                    {...register('pinCode', {
                                                        required: "PinCode address is required"
                                                    })}
                                                    type="text"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors.pinCode && (
                                                    <p className="text-red-500">{errors.pinCode.message}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                        Reset
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Add Address
                                    </button>
                                </div>

                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Address</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        Choose from existing address
                                    </p>

                                    <ul className="divide-y divide-gray-100">
                                        {user.addresses.map((address, index) => (
                                            <li key={index} className="flex justify-between gap-x-6 py-5">
                                                <div className="flex min-w-0 gap-x-4">
                                                    <input
                                                        id="address"
                                                        onChange={handleAddress}
                                                        name="address"
                                                        type="radio"
                                                        value={index}
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <div className="min-w-0 flex-auto">
                                                        <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.street}</p>
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.region}</p>
                                                    </div>
                                                </div>
                                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                    <p className="text-sm leading-6 text-gray-900">{address.phone}</p>
                                                    <p className="text-sm leading-6 text-gray-900">{address.pinCode}</p>
                                                </div>

                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-10 space-y-10">

                                        <fieldset>
                                            <legend className="text-sm font-semibold leading-6 text-gray-900">Payment Methods</legend>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                                Choose one
                                            </p>
                                            <div className="mt-6 space-y-6">
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        id="cash"
                                                        value="cash"
                                                        onChange={handlePayment}
                                                        name="payments"
                                                        checked={paymentMethod === 'cash'}
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Cash
                                                    </label>
                                                </div>
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        id="card"
                                                        value="card"
                                                        name="payments"
                                                        onChange={handlePayment}
                                                        checked={paymentMethod === 'card'}
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Card Payment
                                                    </label>
                                                </div>

                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* CheckOut section */}

                    <div className="lg:col-span-2">
                        <div className="bg-gray-200 mt-14  mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flow-root">

                                <div className="border-t border-gray-200 px-0 py-6 sm:px-0">
                                    <h1 className="text-4xl font-bold my-4 tracking-tight text-gray-900">Cart</h1>

                                    {cartItems.length === 0 ? (
                                        <div className="text-center py-6">
                                            <p className="text-lg text-gray-500">  Your cart is empty, but your next favorite find is just a click away! <br />
                                                Start exploring and fill your cart with items that make you smile.</p>
                                        </div>
                                    ) : (
                                        <>
                                            <ul className="-my-6 divide-y divide-gray-200">
                                                {cartItems.map((cart) => (
                                                    <li key={cart.id} className="flex py-6">
                                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                            <img
                                                                alt={cart.product.title}
                                                                src={cart.product.thumbnail}
                                                                className="h-full w-full object-cover object-center"
                                                            />
                                                        </div>

                                                        <div className="ml-4 flex flex-1 flex-col">
                                                            <div>
                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                    <h3>
                                                                        <a href={cart.product.thumbnail} target="_blank" rel="noreferrer">{cart.product.title}</a>
                                                                    </h3>
                                                                    <div>
                                                                        <p className="ml-4">${discountedPrice(cart.product)}</p>
                                                                    </div>
                                                                </div>
                                                                <p className="mt-1 text-sm text-gray-500">{cart.product.brand}</p>
                                                            </div>
                                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                                <div className="text-gray-500">
                                                                    <label htmlFor="quantity" className="inline text-sm font-medium leading-6 text-gray-500 mr-3" >
                                                                        Qty
                                                                    </label>
                                                                    <select onChange={(e) => handleQuantity(e, cart)} value={cart.quantity}>
                                                                        <option value="1">1</option>
                                                                        <option value="2">2</option>
                                                                        <option value="3">3</option>
                                                                        <option value="4">4</option>
                                                                        <option value="5">5</option>
                                                                    </select>
                                                                </div>

                                                                <div className="flex">
                                                                    <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={(e) => handleRemove(e, cart.id)}>
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
                                    <div className="border-t border-gray-200 px-2 py-6 sm:px-2">
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
                                            <div
                                                onClick={handleOrder}
                                                className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                            >
                                                Order Now
                                            </div>
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
                </div>
            </div>
        </>
    );
}

export default Checkout;
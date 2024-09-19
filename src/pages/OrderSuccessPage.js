import { useEffect } from "react";
import { Link, useParams, Navigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetCartAsync } from "../features/cart/cartSlice";
import { resetOrder } from "../features/orders/orderSlice";
import { ToasterType } from "../app/constant";
import { showToaster } from "../utils/Toaster";


function OrderSuccessPage() {
    const params = useParams();
    const dispatch = useDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const paymentIntent = searchParams.get('payment_intent');

    useEffect(() => {
        //reset cart
        dispatch(resetCartAsync());
        //reset order
        dispatch(resetOrder());

        if (paymentIntent) {
            showToaster(ToasterType.Success, 'Card payment was successful. Your order has been placed!');
        } else {
            showToaster(ToasterType.Success, 'Your order has been placed successfully!');
        }

    }, [dispatch, paymentIntent])

    return (
        <>
            {!params.id && <Navigate to='/' replace={true}></Navigate>}
            <main className="grid min-h-full place-items-center bg-gray-300 px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text-indigo-600">Order SuccessFully placed</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Order number : #{params.id}</h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">You can check your orders in My account &gt; My Orders</p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to='/'
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Go back home
                        </Link>
                    </div>
                </div>
            </main></>
    )
}

export default OrderSuccessPage;
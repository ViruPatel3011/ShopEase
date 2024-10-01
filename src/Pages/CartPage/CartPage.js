import { Cart } from "../../Components/Cart/Cart";
import { HomeIcon } from '@heroicons/react/24/outline';
import { Link } from "react-router-dom";

function CartPage() {
    return (
        <div>
            <header className="bg-slate-100 shadow">
                <div className="mx-auto px-1 py-6 sm:px-6 lg:px-8 items-center flex">
                    <Link to='/'>
                        <HomeIcon className="w-8 h-8 cursor-pointer mx-3 text-gray-500"></HomeIcon >
                    </Link>
                    {/* First div - Logo and Brand */}
                    <div className="flex items-center space-x-4">
                        <img
                            alt="Your Company"
                            src="/shopEase.png"
                            className="h-12 w-auto"
                        />
                        <h1 className="text-4xl font-bold tracking-tight text-teal-900">Sʜᴏᴘᴇᴀsᴇ</h1>
                    </div>
                </div>
            </header>
            <Cart></Cart>
        </div>
    );
}



export default CartPage;
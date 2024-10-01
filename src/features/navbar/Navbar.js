import React from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectItems } from "../cart/cartSlice";
import { selectUserInfo } from '../user/userSlice';
import Header from '../Common/Header';
import { fetchProductsByFiltersAsync } from '../product/ProductSlice';


const navigation = [
    { name: 'Home', link: '/', user: true },
    { name: 'Home', link: '/admin', admin: true },
    { name: 'Orders', link: '/admin/orders', admin: true },
]
const userNavigation = [
    { name: 'My Profile', link: '/profile' },
    { name: 'My Orders', link: '/orders' },
    { name: 'Sign out', link: '/logout' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

function Navbar({ children }) {
    const items = useSelector(selectItems);
    const dispatch = useDispatch();
    const userInfo = useSelector(selectUserInfo);
    const location = useLocation();

    const handleSearch = (e) => {
        const query = e.target.value;
        console.log('query', query);
        dispatch(fetchProductsByFiltersAsync({ filter: {}, sort: {}, pagination: {}, searchQuery: query }));

    }

    const showSearch = location.pathname === '/' || location.pathname === '/admin';

    return (
        <>
            <div className="min-h-full">
                <Header
                    items={items}
                    navigation={navigation}
                    userNavigation={userNavigation}
                />
                {/* Second Nav - Show only when screen size is larger than md */}
                <Disclosure as="nav" className="bg-gray-800 hidden md:block">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <div className="hidden md:block">
                                    <div className="ml-10 flex items-baseline space-x-5">
                                        {navigation.map((item) =>
                                            item[userInfo?.role] ? (
                                                <Link
                                                    key={item.name}
                                                    to={item.link}
                                                    className={classNames(
                                                        item.current
                                                            ? 'bg-gray-900 text-white'
                                                            : 'text-gray-800 hover:bg-slate-200 hover:text-gray-600',
                                                        'rounded-md px-5 py-2 text-sm font-medium bg-orange-50'
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </Link>
                                            ) : null
                                        )}
                                    </div>
                                </div>
                            </div>

                            {showSearch && (
                                <div className="relative">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                    <input
                                        onChange={handleSearch}
                                        type="text"
                                        placeholder="Search"
                                        className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                                    />
                                </div>
                            )}

                        </div>
                    </div>
                </Disclosure>

                {/* Mobile Menu - Show on smaller screens */}
                <Disclosure as="nav" className="bg-gray-800 md:hidden">
                    {({ open }) => (
                        <>
                            <div className="flex items-center justify-between px-4 py-2 sm:px-6 lg:px-8">

                                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </DisclosureButton>
                            </div>

                            <DisclosurePanel className="md:hidden">
                                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                    {navigation.map((item) => item[userInfo?.role] && (
                                        <Link
                                            key={item.name}
                                            to={item.link}
                                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                                <div className="border-t border-gray-700 pb-3 pt-4">
                                    <div className="flex items-center px-5">
                                        <img alt="" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" className="h-10 w-10 rounded-full" />
                                        <div className="ml-3">
                                            <div className="text-base font-medium leading-none text-white">{userInfo?.name}</div>
                                            <div className="text-sm font-medium leading-none text-gray-400">{userInfo?.email}</div>
                                        </div>
                                        <Link to="/cart" className="ml-auto">
                                            <button
                                                type="button"
                                                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                            >
                                                <span className="sr-only">View cart</span>
                                                <ShoppingCartIcon aria-hidden="true" className="h-6 w-6" />
                                                {items.length > 0 && (
                                                    <span className="absolute top-0 right-0 inline-flex items-center justify-center h-4 w-4 rounded-full bg-red-600 text-white text-xs font-bold transform translate-x-1/2 -translate-y-1/2">
                                                        {items.length}
                                                    </span>
                                                )}
                                            </button>
                                        </Link>
                                    </div>
                                    <div className="mt-3 space-y-1 px-2">
                                        {userNavigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.link}
                                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </DisclosurePanel>
                        </>
                    )}
                </Disclosure>

                <main>{children}</main>
            </div>
        </>
    )
}

export default Navbar

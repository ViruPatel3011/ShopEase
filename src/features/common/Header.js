import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

function Header({ items, userNavigation, navigation }) {
    return (
        <header className="bg-slate-100 shadow">
            <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8 grid grid-cols-2 items-center">
                {/* First div - Logo and Brand */}
                <div className="flex items-center space-x-4">
                    <img
                        alt="Your Company"
                        src="/shopEase.png"
                        className="h-12 w-auto"
                    />
                    <h1 className="text-4xl font-bold tracking-tight text-teal-900">Sʜᴏᴘᴇᴀsᴇ</h1>
                </div>

                {/* Second div - Cart and Profile (Visible only on md and above) */}
                <div className="hidden md:flex justify-end items-center space-x-4">
                    {/* Cart Button */}
                    <Link to="/cart">
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

                    {/* Profile Dropdown */}
                    <Menu as="div" className="relative">
                        <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <img
                                alt=""
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                className="h-8 w-8 rounded-full"
                            />
                        </MenuButton>
                        <MenuItems
                            transition
                            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                            {userNavigation.map((item) => (
                                <MenuItem key={item.name}>
                                    {({ active }) => (
                                        <Link
                                            to={item.link}
                                            className={classNames(
                                                active ? 'bg-gray-100' : '',
                                                'block px-4 py-2 text-sm text-gray-700'
                                            )}
                                        >
                                            {item.name}
                                        </Link>
                                    )}
                                </MenuItem>
                            ))}
                        </MenuItems>
                    </Menu>
                </div>
            </div>
        </header>
    )
}

export default Header
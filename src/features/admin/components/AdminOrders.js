import React, { useEffect, useState } from 'react';
import { Pagination } from '../../common/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import {
    PencilIcon,
    EyeIcon,
    ArrowUpIcon,
    ArrowDownIcon,
} from '@heroicons/react/24/outline';
import { fetchAllOrdersAsync, updateOrderAsync, selectOrders, selectTotalOrders } from '../../orders/orderSlice';
import { ITEMS_PER_PAGE, discountedPrice } from '../../../app/constant';

export default function AdminOrders() {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const orders = useSelector(selectOrders);
    console.log("AdminOrders:",orders);
    const totalOrders = useSelector(selectTotalOrders);
    const [editableOrderId, setEditableOrderId] = useState(-1);
    const [sort, setSort] = useState({});

    const handleEdit = (order) => {
        setEditableOrderId(order.id);
    };

    const handleShow = (order) => {
        console.log("Show");
    };

    const handleUpdate = (e, order) => {
        const updatedOrder = { ...order, status: e.target.value };
        dispatch(updateOrderAsync(updatedOrder));
        setEditableOrderId(-1);
    };


    const chooseColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-purple-200 text-purple-600';
            case 'dispatched':
                return 'bg-yellow-200 text-yellow-600';
            case 'delivered':
                return 'bg-green-200 text-green-600';
            case 'cancelled':
                return 'bg-red-200 text-red-600';
            default:
                return 'bg-purple-200 text-purple-600';
        }
    };

    const handlePage = (page) => {
        setPage(page)
    }

    const handleSort = (sortOption) => {
        const sort = { _sort: sortOption.sort, _order: sortOption.order };
        setSort(sort);
    };

    useEffect(() => {
        const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
        dispatch(fetchAllOrdersAsync({ sort, pagination }));
    }, [dispatch, page, sort]);


    return (
        <div className="overflow-x-auto">
            <div className="bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
                <div className="w-full">
                    <div className="bg-white shadow-md rounded my-6">
                        <table className="min-w-max w-full table-auto">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th
                                        onClick={(e) => handleSort({
                                            sort: 'id',
                                            order: sort?._order === 'asc' ? 'desc' : 'asc'
                                        })}
                                        className="py-3 px-6 text-left cursor-pointer"

                                    >
                                        Order# {' '}
                                        {sort._sort === 'id' &&
                                            (sort._order === 'asc' ? (
                                                <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                                            ) : (
                                                <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                                            ))}
                                    </th>
                                    <th className="py-3 px-6 text-left">Items</th>
                                    <th
                                        onClick={(e) => handleSort({
                                            sort: 'totalAmount',
                                            order: sort?._order === 'asc' ? 'desc' : 'asc'
                                        })}
                                        className="py-3 px-6 text-left cursor-pointer"

                                    >
                                        Total Amount {' '}
                                        {sort._sort === 'totalAmount' &&
                                            (sort._order === 'asc' ? (
                                                <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                                            ) : (
                                                <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                                            ))}
                                    </th>
                                    <th className="py-3 px-6 text-center">Shipping Address</th>
                                    <th className="py-3 px-6 text-center">Status</th>
                                    <th className="py-3 px-6 text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="text-gray-600 text-sm font-light">
                                {orders && orders?.map((order, index) => (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={index}>
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="mr-2"></div>
                                                <span className="font-medium">{order.id}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            {order.cartItems.map((item, index) => (
                                                <div className="flex items-center" key={index}>
                                                    <div className="mr-2">
                                                        <img
                                                            alt={item.product.title}
                                                            className="w-6 h-6 rounded-full"
                                                            src={item.product.thumbnail}
                                                        />
                                                    </div>
                                                    <span>
                                                        {item.product.title} - #{item.quantity} - $
                                                        {discountedPrice(item.product)}
                                                    </span>
                                                </div>
                                            ))}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex items-center justify-center">
                                                ${order.totalAmount}
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="">
                                                <div>
                                                    <strong>{order.selectAddress.name}</strong>,
                                                </div>
                                                <div>{order.selectAddress.street},</div>
                                                <div>{order.selectAddress.city}, </div>
                                                <div>{order.selectAddress.state}, </div>
                                                <div>{order.selectAddress.pinCode}, </div>
                                                <div>{order.selectAddress.phone}, </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            {order.id === editableOrderId ? (
                                                <select onChange={(e) => handleUpdate(e, order)}>
                                                    <option value="pending">Pending</option>
                                                    <option value="dispatched">Dispatched</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            ) : (
                                                <span
                                                    className={`${chooseColor(
                                                        order.status
                                                    )} py-1 px-3 rounded-full text-xs`}
                                                >
                                                    {order.status}
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex item-center justify-center">
                                                <div className="w-6 mr-4 transform hover:text-purple-500 hover:scale-120">
                                                    <EyeIcon
                                                        className="w-6 h-6"
                                                        onClick={(e) => handleShow(order)}
                                                    ></EyeIcon>
                                                </div>
                                                <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-120 cursor-pointer">
                                                    <PencilIcon
                                                        className="w-6 h-6"
                                                        onClick={(e) => handleEdit(order)}
                                                    ></PencilIcon>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Pagination
                page={page}
                setPage={setPage}
                handlePage={handlePage}
                totalItems={totalOrders}
            ></Pagination>
        </div>
    );
}

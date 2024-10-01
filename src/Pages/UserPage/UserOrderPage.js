import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import { UserOrders } from '../../Components/UserOrder/UserOrders';

export default function UserOrderPage() {
    return (
        <div>
            <Navbar>
                <UserOrders></UserOrders>
            </Navbar>
        </div>
    );
}

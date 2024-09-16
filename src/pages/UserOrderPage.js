import React from 'react';
import Navbar from '../features/navbar/Navbar';
import { UserOrders } from '../features/user/components/UserOrders';

export default function UserOrderPage() {
    return (
        <div>
            <Navbar>
                <UserOrders></UserOrders>
            </Navbar>
        </div>
    );
}

import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import AdminOrders from '../../Components/AdminOrders/AdminOrders'

export default function AdminOrdersPage() {
    return (
        <div>
            <Navbar>
                <AdminOrders></AdminOrders>
            </Navbar>
        </div>
    )
}

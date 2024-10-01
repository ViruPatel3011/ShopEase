import React from 'react'
import Navbar from '../../Components/Navbar/Navbar';
import AdminProductDetail from '../../Components/AdminProduct/AdminProductDetail';

export default function AdminProductDetailPage() {
    return (
        <div>
            <Navbar>
                <AdminProductDetail></AdminProductDetail>
            </Navbar>
        </div>
    )
}

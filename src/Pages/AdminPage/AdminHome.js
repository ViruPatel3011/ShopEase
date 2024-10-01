import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import AdminProductList from '../../Components/AdminProduct/AdminProductList';
import Footer from '../../Common/Footer';

export default function AdminHome() {
    return (
        <div>
            <Navbar>
                <AdminProductList></AdminProductList>
            </Navbar>
            <Footer></Footer>
        </div>
    )
}

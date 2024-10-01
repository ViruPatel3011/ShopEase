import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import ProductForm from '../../Components/AdminProduct/ProductForm'

export default function AdminProductFormPage() {
  return (
    <div>
        <Navbar>
            <ProductForm></ProductForm>
        </Navbar>
    </div>
  )
}

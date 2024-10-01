import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import ProductList from '../../Components/Product/ProductList'
import Footer from '../../Common/Footer'

function Home() {
  return (
    <div>
      <Navbar>
        <ProductList></ProductList>
      </Navbar>
      <Footer></Footer>
    </div>
  )
}

export default Home

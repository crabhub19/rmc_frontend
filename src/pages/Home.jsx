import React, { lazy } from 'react'
import Products from '../components/products/Products'
const Home = () => {
  return (
   <>
    <section className="flex items-center justify-center h-96 bg-theme">
      <h1 className="text-7xl text-white">RAJSHAHI MEDICAL CARE</h1>
    </section>
    <Products/>
   </>
  )
}

export default Home
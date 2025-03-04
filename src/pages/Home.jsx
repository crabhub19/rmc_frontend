import React, { useEffect } from 'react'
import Products from '../components/products/Products'
import { useDispatch } from 'react-redux'
import { getProducts } from '../features/product/ProductSlice'
const Home = () => {
  return (
   <>
    <section className="flex items-center justify-center h-96 bg-theme shadow-inner flex-col">
      <h1 className="text-7xl text-white text-center">RAJSHAHI MEDICAL CARE</h1>
      <button onClick={() => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  }} className='mt-5 h-10 w-40 rounded-full bg-primary hover:bg-primary-light text-theme'>Shop Now</button>
    </section>
    <div id='products'>
    <Products/>
    </div>
   </>
  )
}

export default Home
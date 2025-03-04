import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CirclesWithBar, DNA } from "react-loader-spinner";
import ProductsItem from "./ProductsItem";
import { ProductPagination } from "./ProductPagination";

export default function Products() {
  const {
    products,
    productStatus,
    productNext,
    productPrevious,
    productCount,
  } = useSelector((state) => state.product);
  const productRef = useRef(null);
  return (
    <>
        {productStatus === "loading" ? (
          <div className="flex justify-center items-center pt-5">
            <CirclesWithBar
                height="400"
                width="400"
                color="#008000"
                outerCircleColor="#008000"
                innerCircleColor="#008000"
                barColor="#008000"
                ariaLabel="circles-with-bar-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                />
          </div>
        ):(
          <>
          <section className="" ref={productRef}>
            <h1 className="text-4xl text-theme text-center py-12 shadow-sm">Our Products</h1>
            <div className="container mx-auto grid  grid-cols-2 gap-3 px-5 pb-10 lg:grid-cols-4 py-5">
            {products.map((product) => (
              <ProductsItem key={product.id} product={product} />
            ))}
            </div>

          </section>
          </>
        )
      }
        <div className="pb-12" >
          <ProductPagination productRef={productRef}  productNext={productNext} productPrevious={productPrevious} productCount={productCount}/>
        </div>
    </>
  );
}

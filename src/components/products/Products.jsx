import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CirclesWithBar, DNA } from "react-loader-spinner";
import ProductsItem from "./ProductsItem";

export default function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    products,
    productStatus,
    ProductNext,
    ProductPrevious,
    ProductCount,
  } = useSelector((state) => state.product);
  return (
    <>
        {productStatus === "loading" && (
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
        )}
      <section className="container mx-auto grid max-w-[1200px] grid-cols-2 gap-3 px-5 pb-10 lg:grid-cols-4 py-5">
        {products.map((product) => (
          <ProductsItem key={product.id} product={product} />
        ))}
      </section>
    </>
  );
}

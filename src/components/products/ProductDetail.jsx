import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetail } from "../../features/product/ProductDetailSlice";
import { toast } from "react-toastify";
import { CirclesWithBar } from "react-loader-spinner";
import ProductsItem from "./ProductsItem";
export default function ProductDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  const { productDetailStatus, productDetailData, productDetailDetail } =
    useSelector((state) => state.productDetail);
  useEffect(() => {
    dispatch(getProductDetail(slug)).then((res) => {
      if (getProductDetail.rejected.match(res)) {
        navigate("/");
        toast.error(res.payload.detail);
      }
    });
  }, [slug]);
  return (
    <>
      {productDetailStatus === "loading" ? (
        <>
          <div className="flex justify-center items-center pt-5 min-h-screen">
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
        </>
      ) : (
        <>
          <section className="py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row -mx-4">
                <div className="md:flex-1 px-4">
                  <div className="h-[460px] rounded-lg mb-4 shadow-lg">
                    <img
                      className="w-full h-full object-cover"
                      src={productDetailData?.image_url}
                      alt={productDetailStatus?.name}
                    />
                  </div>
                  <div className="flex -mx-2 mb-4">
                    <div className="w-1/2 px-2">
                      <button className="w-full bg-theme text-white py-2 px-4  font-bold hover:bg-theme-light">
                        Add to Cart
                      </button>
                    </div>
                    <div className="w-1/2 px-2">
                      <button className="w-full bg-primary-dark text-white py-2 px-4  font-bold hover:bg-primary-light">
                        Add to Wishlist
                      </button>
                    </div>
                  </div>
                </div>
                <div className="md:flex-1 px-4">
                  <h2 className="text-2xl font-bold text-gray-800  mb-2">
                    {productDetailData?.name}
                  </h2>
                  {productDetailData?.category && (
                    <div>
                      <span className="font-bold text-gray-700 ">
                        Category:
                      </span>
                      <span className="text-gray-600 ">
                        {productDetailData?.category?.name}
                      </span>
                    </div>
                  )}
                  {productDetailData?.brand && (
                    <div>
                      <div>
                        <span className="font-bold text-gray-700 ">Brand:</span>
                        <span className="text-gray-600 ">
                          {productDetailData?.brand?.name}
                        </span>
                      </div>
                      <img
                        className=" h-24 object-cover"
                        src={productDetailData?.brand?.image_url}
                        alt=""
                      />
                    </div>
                  )}

                  {productDetailData?.details && (
                    <div>
                      <span className="font-bold text-gray-700 ">
                        Product Description:
                      </span>
                      <p className="text-gray-600  text-sm mt-2">
                        {productDetailData?.details}
                      </p>
                    </div>
                  )}
                  <div className="flex mb-4">
                    <div className="mr-4">
                      <span className="font-bold text-gray-700 ">Price:</span>
                      <span className="text-gray-600 ">
                        {productDetailData?.price} tk
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <section className="container mx-auto grid max-w-[1200px] grid-cols-2 gap-3 px-5 pb-10 lg:grid-cols-4 py-5">
                {productDetailData?.similar_products.map((product) => (
                  <ProductsItem key={product.id} product={product} />
                ))}
            </section>
          </section>
        </>
      )}
    </>
  );
}

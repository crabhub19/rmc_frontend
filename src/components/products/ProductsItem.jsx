import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductsItem(props) {
  const { product } = props;
  const navigate = useNavigate()
  const handleDetailPageClick = (slug) =>{
    navigate(`/product_detail/${slug}`)
    console.log("click");
    
  }
  return (
    <div className="relative flex flex-col shadow-md">
      <div className="overflow-hidden cursor-pointer" onClick={()=>{handleDetailPageClick(product.slug)}}>
        <img
          className="hover:scale-110 h-full"
          src={product?.image_url}
          alt={product?.name}
        />
      </div>

      <div>
        <div className="px-5">
        <p className="mt-2">{product?.name}</p>
        <p className="font-medium text-theme">{product?.price}</p>
        </div>

        <div>
          <button className="mt-5 h-10 w-full bg-theme hover:bg-theme-light text-white">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

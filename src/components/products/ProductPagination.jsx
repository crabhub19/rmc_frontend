import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getProducts } from '../../features/product/ProductSlice';

export const ProductPagination = (props) => {
  const { productNext, productPrevious, productCount, productRef} = props;
  const dispatch = useDispatch();
  const totalPages = productCount ? Math.ceil(productCount / 10) : 1; 

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getProducts(currentPage)).then((response) => {
      if (currentPage !== 1) {
        productRef.current?.scrollIntoView({ behavior: 'smooth' })
      }
    })
  }, [dispatch, currentPage]);

  const handleNextPage = () => {
    if (productNext) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (productPrevious) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  return (
    <>

  <ol className="flex justify-center gap-2 mt-5 text-sm font-medium">
      {/* Previous Button */}
      <li>
        <button
          onClick={handlePrevPage}
          disabled={!productPrevious}
          className={`inline-flex items-center justify-center size-8 rounded-sm border ${
            productPrevious ? "bg-white text-gray-900" : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
      </li>

      {/* Page Numbers */}
      {[...Array(totalPages)].map((_, index) => (
        <li key={index}>
          <button
            onClick={() => {setCurrentPage(index + 1)}}
            className={`block size-8 rounded-sm border text-center leading-8 ${
              currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-white text-gray-900"
            }`}
          >
            {index + 1}
          </button>
        </li>
      ))}

      {/* Next Button */}
      <li>
        <button
          onClick={handleNextPage}
          disabled={!productNext}
          className={`inline-flex items-center justify-center size-8 rounded-sm border ${
            productNext ? "bg-white text-gray-900" : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </li>
    </ol>
    </>
  )
}

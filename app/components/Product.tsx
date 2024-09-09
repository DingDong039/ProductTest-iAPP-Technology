// app/components/Product.tsx

import { FC } from "react";
import { ProductType } from "../types";

interface ProductProps {
  product: ProductType;
  onAddToCart: (product: ProductType) => void;
}

const renderStars = (rate: number) => {
  const fullStars = Math.floor(rate);
  const hasHalfStar = rate % 1 >= 0.5;
  const totalStars = 5;

  return Array.from({ length: totalStars }, (_, i) => {
    if (i < fullStars) {
      return (
        <span key={i} className="text-yellow-500">
          ★
        </span>
      );
    }
    if (hasHalfStar && i === fullStars) {
      return (
        <span key={i} className="text-yellow-500">
          ☆
        </span>
      );
    }
    return (
      <span key={i} className="text-gray-400">
        ☆
      </span>
    );
  });
};

const Product: FC<ProductProps> = ({ product, onAddToCart }) => {
  return (
    <>
      <div className="relative border p-4 rounded shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 hover:z-10">
        <div className="overflow-hidden rounded">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-cover transition-transform duration-300 transform hover:scale-110"
          />
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-bold">{product.title}</h2>
          <p className="text-green-600 font-bold">${product.price}</p>
          <p className="text-gray-600 mt-2">{product.category}</p>
          <p className="text-gray-500 mt-1">{product.description}</p>
          <div className="mt-2 flex items-center space-x-1">
            {renderStars(product.rating.rate)}
          </div>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default Product;

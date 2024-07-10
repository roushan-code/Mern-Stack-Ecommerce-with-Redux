import React from 'react';
import { Link } from 'react-router-dom';
import { Rating, ThinStar } from '@smastrom/react-rating'


const ProductCard = ({ product }) => {
  const myStyle = {
    itemShapes: ThinStar,
    activeFillColor: '#ffb23f',
    inactiveFillColor: 'rgba(20,20,20,0.1)',
};
  return (
    <Link className='productCard' to={`/product/${product && product._id}`}>
      <img src={product && product.images[0].url} loading="lazy" alt={product && product.name} />
      <p>{product && product.name}</p>
      
      <div>
      <Rating readOnly itemStyles={myStyle} maxWidth={window.innerWidth < 600 ? 20 : 25}
        value={product && product.ratings} halfFillMode="svg" /> <span>({product && product.numOfReviews} Reviews)</span>
      </div>
      <span>{`₹${product && product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
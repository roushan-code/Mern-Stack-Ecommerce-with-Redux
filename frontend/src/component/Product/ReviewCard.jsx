import { Rating, ThinStar } from '@smastrom/react-rating'
import React from "react";
import profilePng from "../../images/Profile.png";

const ReviewCard = ({ review }) => {
    const myStyle = {
        itemShapes: ThinStar,
        activeFillColor: 'tomato',
  inactiveFillColor: 'rgba(20,20,20,0.1)',
      };
  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <Rating readOnly itemStyles={myStyle} maxWidth={ window.innerWidth < 600 ? 20 : 25}
        value={review.rating} halfFillMode="svg"/>
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;

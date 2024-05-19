import { Rating, ThinStar } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import React, { Fragment, useEffect, useState } from 'react';
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addItemsToCart } from "../../actions/cartAction"
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';


import { NEW_REVIEW_RESET } from "../../constants/productConstants";


import ReviewCard from "./ReviewCard.jsx";
import Loader from '../layout/Loader/loader.jsx';

const ProductDetails = () => {

    const dispatch = useDispatch();
    


    const { id } = useParams();


    const { product, loading, error } = useSelector((state) => state.productDetails);

    let pro = { ...product };

    const { success, error: reviewError } = useSelector(
        (state) => state.newReview
    );



    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");



    const increaseQuantity = () => {
        if (product.Stock <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty);
    }
    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        toast.success("Item Added to Cart");
    }

    // console.log(pro.ratings)

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };

    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);

        dispatch(newReview(myForm));

        setOpen(false);
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }
        if (reviewError) {
            toast.error(reviewError);
            dispatch(clearErrors());
        }

        if (success) {
            toast.success("Review Submitted Successfully");
            dispatch({ type: NEW_REVIEW_RESET });
        }
        dispatch(getProductDetails(id));
    }, [dispatch, id, error,  reviewError, success]);


    const myStyle = {
        itemShapes: ThinStar,
        activeFillColor: 'tomato',
        inactiveFillColor: 'rgba(20,20,20,0.1)',
    };
    return (

        <Fragment>
            {loading ? (<Loader />) : (<Fragment>
                <div className="ProductDetails">
                    <div>
                        <Carousel>
                            {product && product.images &&
                                product.images.map((item, i) => (
                                    <img
                                        className='CarouselImage'
                                        src={item.url}
                                        key={item.url}
                                        alt={`${i} Slide`} />
                                ))
                            }
                        </Carousel>
                    </div>
                    <div>
                        <div className="detailsBlock-1">
                            <h2>{pro.name}</h2>
                            <p>Product # {pro._id}</p>
                        </div>
                        <div className="detailsBlock-2">
                            <Rating readOnly itemStyles={myStyle} maxWidth={window.innerWidth < 600 ? 20 : 25}
                                value={pro.ratings} halfFillMode="svg" />
                            <span> ({pro.numOfReviews} Reviews) </span>
                        </div>
                        <div className="detailsBlock-3">
                            <h1> {`₹${pro.price}`} </h1>
                            <div className="detailsBlock-3-1">
                                <div className="detailsBlock-3-1-1">
                                    <button onClick={decreaseQuantity}>-</button>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        readOnly />
                                    <button onClick={increaseQuantity}>+</button>
                                </div>{" "}
                                <button disabled={pro.Stock < 1 ? true : false} onClick={addToCartHandler}>Add to Cart</button>
                            </div>
                            <p>
                                Status:{" "}
                                <b className={pro.Stock < 1 ? "redColor" : "greenColor"}>
                                    {pro.Stock < 1 ? "OutOfStock" : "InStock"}
                                </b>
                            </p>
                        </div>
                        <div className="detailsBlock-4">
                            Description : <p>{pro.description}</p>
                        </div>
                        <button onClick={submitReviewToggle} className='submitReview'>Submit Review</button>
                    </div>
                </div>

                <h3 className='reviewsHeading' >REVIEWS</h3>

                <Dialog
                    aria-labelledby="simple-dialog-title"
                    open={open}
                    onClose={submitReviewToggle}
                >
                    <DialogTitle>Submit Review</DialogTitle>
                    <DialogContent className="submitDialog">
                        <Rating
                            onChange={setRating}
                            value={rating}
                            size="large"
                        />

                        <textarea
                            className="submitDialogTextArea"
                            cols="30"
                            rows="5"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                    </DialogContent>
                    <DialogActions>
                        <button
                            className="MuiButtonBase-root MuiButton-root MuiButton-text"
                            onClick={submitReviewToggle}
                            color="secondary"
                        >
                            <span class="MuiButton-label">Cancel</span>
                            <span class="MuiTouchRipple-root"></span>
                        </button>

                        <button
                            className="MuiButtonBase-root MuiButton-root MuiButton-text"
                            onClick={reviewSubmitHandler}
                            color="primary"
                        >
                            <span class="MuiButton-label">Submit</span>
                            <span class="MuiTouchRipple-root"></span>
                        </button>
                    </DialogActions>
                </Dialog>

                {product && product.reviews && product.reviews[0] ? (
                    <div className="reviews">
                        {product && product.reviews &&
                            product.reviews.map((review) => (
                                <ReviewCard key={review._id} review={review} />
                            ))}
                    </div>
                ) : (
                    <p className="noReviews">No Reviews Yet</p>
                )}
            </Fragment>)}
        </Fragment>
    );
}


export default ProductDetails
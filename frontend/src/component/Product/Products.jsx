import { useParams } from "react-router-dom";
import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from '@mui/material/Slider';
import { toast } from 'react-toastify';
import MetaData from "../layout/Metadata";

const categories = [
  "Laptop",
  "Footwear",
  "Electronics",
  "Watch",
  "Attire",
  "Camera",
  "SmartPhones",
];
const Products = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 150000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

const {
products,
loading,
error,
productsCount,
resultPerPage,
filteredProductsCount,
} = useSelector((state)=>state.products);
const {keyword} = useParams();
const setCurrentPageNo = (e)=>{
  setCurrentPage(e);
};
const priceHandler = (event, newPrice)=>{
  setPrice(newPrice);
}

let count = filteredProductsCount;
  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  },[dispatch, keyword, currentPage,price, category, ratings, error]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <div className="filterBox">
            <h2 className="h22">Price</h2>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-label="Small"
              min={0}
              max={150000}
            />
            <h2 className="h22">Categories</h2>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            <fieldset>
              <h2 className="h22">Ratings Above</h2>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>
          <h2 className="h22 productsHeading">Products</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product && product._id} product={product} />
              ))}
          </div>
          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default Products
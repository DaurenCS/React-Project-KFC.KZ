import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FoodList.css"; // Import the corresponding CSS file
import { useAuth } from "hooks/use-auth"
import { useCart, useGetCategories, useGetFoodList } from "hooks/api_hooks";
import Loader from "components/Loader/Loader";
import { Link, Element } from 'react-scroll';
import StickyBox from "react-sticky-box";
import AdvertisementSlider from "components/Advertisement/Advertisement";

function FoodList() {

  const { isAuth } = useAuth();
  const { handleAddItem, isLoaded } = useCart();

  const { foodList: foodData, isLoaded: foodListLoad } = useGetFoodList();

  const navigate = useNavigate()

  const categories = useGetCategories();


  const handleAddToCart = (food_id) => {
    if (isAuth) {
      handleAddItem(food_id);
    }
    else {
      navigate("/login")
    }
  }

  return (
    <div className="food-list">

      {!foodListLoad && <Loader />}

      <div className="SideBar">
        <div class="namesofcategory" >
          {categories.map((category) => (
            <div key={category.id} className="category">
              {/* <img className="category-image" src={category.photo} /> */}
              <Link spy={true} to={category.name} smooth={true} duration={600} offset={-142} activeClass="active">{category.name} </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="food-item">
        {categories.map((category) => (
          <div key={category.id} id={category.name}className="food-items">
            <div className="name-category">
              <h2>{category.name}</h2>
            </div>
            <div className="foods-by-category">
              {foodData.filter((foodItem) =>
                foodItem.special_food_id.name === category.name).map((foodItem) => (
                  <div className="food-card" key={foodItem.id}>
                    <div className="food-info" onClick={() => {
                      navigate("/foodlist/" + foodItem.id, {
                        state: {
                          foodInfo: foodItem
                        }
                      })
                    }} >
                      <img
                        src={foodItem.photo}
                        alt={foodItem.name}
                        className="food-image"
                      />
                      <div className="food-details">
                        <h2 className="food-name">{foodItem.name}</h2>
                        <p  className="food-description">{foodItem.description}</p>
                      </div>
                    </div>
                    {!isLoaded && <div className="loading-button"><div className="spinner"></div></div>}
                    {isLoaded && <button className="button" onClick={() => { handleAddToCart(foodItem.id) }}><p className="food-price">{foodItem.price.toFixed(2)}₸</p></button>}
                  </div>
                ))

              }
            </div>
          </div>
        ))}
      </div>

      <AdvertisementSlider />
    </div>
  );
}

export default FoodList;

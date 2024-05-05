import React, { useState, useEffect } from "react";
import "./FoodCard.css"; // Import the corresponding CSS file 
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { InputNumber, Checkbox } from 'antd';
import { useCart, useGetBevList, useGetFood } from "hooks/api_hooks";
import Loader from "components/Loader/Loader";

function FoodCard() {

  // const { state } = useLocation()
  // const food = state.foodInfo

  const { handleAddItems } = useCart();

  let { id } = useParams();

  const { food, isLoaded } = useGetFood(id);

  const navigate = useNavigate();

  const [foodToAddList, setFoodToAddList] = useState([]);

  const [price, setPrice] = useState(0);


  const { bevList: foodlist, isLoaded: additionsLoad } = useGetBevList();

  useEffect(() => {
    setPrice(food.price)
  }, [food.price, setPrice])

  const handleAddButton = (food_id) => {
    console.log(foodToAddList)
    handleAddItems([...foodToAddList, food_id]);
    navigate("/cart")
  }


  return (<>
    {!isLoaded && <Loader />}
    {isLoaded &&
      <div className="food">
        <div className="c1">
          <div className="description">
            <h3>{food.name}</h3>
            <img className="foodCardPhoto" src={food.photo} alt={food.name} />
            <h3>{food.description}</h3>

          </div>
          <div>
            {additionsLoad && foodlist.map((food) => (
              <div key={food.id} className="options">
                <Checkbox onChange={(e) => {
                  console.log(e.target.checked)
                  if (e.target.checked){
                    setPrice(price + food.price)
                    setFoodToAddList((prevList) => [...prevList, food.id])
                  }
                  else{
                    setPrice(price - food.price)
                    setFoodToAddList((prevList) => prevList.filter((prevFood) => prevFood !== food.id))
                  }
                  console.log(foodToAddList)
                }}>
                  {food.name}
                </Checkbox>
              </div>
            ))}
          </div>
        </div>
        <hr />
        <div className="Price">
          <div>
            <div>Price: {price}₸</div>
          </div>
          <div className="button" onClick={() => handleAddButton(food.id)}>
            Add to Cart
          </div>
        </div>

      </div>
    }
  </>
  )
}

export default FoodCard;
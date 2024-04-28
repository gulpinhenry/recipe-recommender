import React from "react";
import { useState, useEffect } from "react";
import "./Meal.css";
import { FaUtensilSpoon } from "react-icons/fa";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { useParams } from "react-router-dom";

const MealSingle = ({}) => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    fetch(`/api/post/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setMeal(data.data);
      })
      .catch((error) =>
        console.error("There was an error fetching the posts:", error)
      );
  }, []);

  let tags = meal?.recipe?.foodCategories;
  console.log(tags);
  // let ingredients = meal?.recipe?.ingredients?.spplit;
  let ingredients = meal?.recipe?.ingredients;
  let instructions = meal?.recipe?.instructions?.split(/(?=\d\.)/).map(step => step.trim()).filter(step => step !== "");
  instructions = instructions?.filter((instruction) => instruction.length > 1);

  return (
    <section className="sc-details bg-white">
      <div className="details-head grid">
        {/* <div className="details-img">
          <img src={meal?.thumbnail} alt="" className="img-cover" />
        </div> */}

        <div className="details-intro">
          <h3 className="title text-orange">{meal?.recipe?.name}</h3>

          <div className="tags flex align-start flex-wrap">
            <h6 className="fs-16">Categories:</h6>
            <ul className="flex align-center flex-wrap">
              {tags?.map((tag, idx) => (
                <li key={idx} className="fs-14">
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          <div className="ingredients my-5 px-3 py-3">
            <h6 className="fs-16 text-white">Ingredients</h6>
            <ul className="grid">
              {ingredients?.map((ingredient, idx) => (
                <li key={idx} className="flex align-center">
                  <span className="li-dot">{idx + 1}</span>
                  <span className="text-capitalize text-white fs-15">
                    {ingredient}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="details-body">
        {/* <div className="measures my-4">
          <h6 className="fs-16">Measure:</h6>
          <ul className="grid">
            {meal?.measures?.map((measure, idx) => (
              <li key={idx} className="fs-14 flex align-end">
                <span className="li-icon fs-12 text-orange">
                  <FaUtensilSpoon />
                </span>
                <span className="li-text fs-15 fw-6 op-09">{measure}</span>
              </li>
            ))}
          </ul>
        </div> */}

        <div className="instructions my-4">
          <h6 className="fs-16">Instructions:</h6>
          <ul className="grid">
            {instructions?.map((instruction, idx) => (
              <li key={idx} className="fs-14">
                <AiOutlineCheckSquare
                  size={18}
                  className="text-orange li-icon"
                />
                <span className="li-text fs-16 fw-5 op-09">{instruction}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default MealSingle;

import React from 'react';
import "./Meal.css";
import { FaUtensilSpoon } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BiChevronsRight } from "react-icons/bi";
import { AiOutlineCheckSquare } from 'react-icons/ai';

const MealSingle = ({}) => {
  // console.log(meal);
  let meal = {
    "id": "52874",
    "title": "Beef and Mustard Pie",
    "category": "Beef",
    "area": "British",
    "thumbnail": "https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg",
    "instructions": "Preheat the oven to 150C/300F/Gas 2.\r\nToss the beef and flour together in a bowl with some salt and black pepper.\r\nHeat a large casserole until hot, add half of the rapeseed oil and enough of the beef to just cover the bottom of the casserole.\r\nFry until browned on each side, then remove and set aside. Repeat with the remaining oil and beef.\r\nReturn the beef to the pan, add the wine and cook until the volume of liquid has reduced by half, then add the stock, onion, carrots, thyme and mustard, and season well with salt and pepper.\r\nCover with a lid and place in the oven for two hours.\r\nRemove from the oven, check the seasoning and set aside to cool. Remove the thyme.\r\nWhen the beef is cool and you're ready to assemble the pie, preheat the oven to 200C/400F/Gas 6.\r\nTransfer the beef to a pie dish, brush the rim with the beaten egg yolks and lay the pastry over the top. Brush the top of the pastry with more beaten egg.\r\nTrim the pastry so there is just enough excess to crimp the edges, then place in the oven and bake for 30 minutes, or until the pastry is golden-brown and cooked through.\r\nFor the green beans, bring a saucepan of salted water to the boil, add the beans and cook for 4-5 minutes, or until just tender.\r\nDrain and toss with the butter, then season with black pepper.\r\nTo serve, place a large spoonful of pie onto each plate with some green beans alongside.",
    "source": "https://www.bbc.co.uk/food/recipes/beef_and_mustard_pie_58002",
    "tags": "Meat,Pie",
    "youtube": "https://www.youtube.com/watch?v=nMyBC9staMU",
    "ingredients": [
        "Beef",
        "Plain Flour",
        "Rapeseed Oil",
        "Red Wine",
        "Beef Stock",
        "Onion",
        "Carrots",
        "Thyme",
        "Mustard",
        "Egg Yolks",
        "Puff Pastry",
        "Green Beans",
        "Butter",
        "Salt",
        "Pepper"
    ],
    "measures": [
        "1kg",
        "2 tbs",
        "2 tbs",
        "200ml",
        "400ml",
        "1 finely sliced",
        "2 chopped",
        "3 sprigs",
        "2 tbs",
        "2 free-range",
        "400g",
        "300g",
        "25g",
        "pinch",
        "pinch"
    ]
}
  let tags = meal?.tags?.split(',');
  console.log(meal);
  let instructions = meal?.instructions?.split('\r\n');
  instructions = instructions?.filter(instruction => instruction.length > 1);

  return (
        <section className='sc-details bg-white'>
          <div className='details-head grid'>
            <div className='details-img'>
              <img src = {meal?.thumbnail} alt = "" className='img-cover' />
            </div>

            <div className='details-intro'>
              <h3 className='title text-orange'>{meal?.title}</h3>


              <div className='tags flex align-start flex-wrap'>
                <h6 className='fs-16'>Tags:</h6>
                <ul className='flex align-center flex-wrap'>
                  {
                    tags?.map((tag, idx) => (<li key = {idx} className = "fs-14">{tag}</li>))
                  }
                </ul>
              </div>

              <div className='ingredients my-5 px-3 py-3'>
                <h6 className='fs-16 text-white'>Ingredients</h6>
                <ul className='grid'>
                  {
                    meal?.ingredients?.map((ingredient, idx) => (
                      <li key = {idx} className = "flex align-center">
                        <span className='li-dot'>{idx + 1}</span>
                        <span className='text-capitalize text-white fs-15'>{ingredient}</span>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>

          <div className='details-body'>
            <div className='measures my-4'>
              <h6 className='fs-16'>Measure:</h6>
              <ul className='grid'>
                {
                  meal?.measures?.map((measure, idx) => (
                    <li key = {idx} className = "fs-14 flex align-end">
                      <span className='li-icon fs-12 text-orange'>
                        <FaUtensilSpoon />
                      </span>
                      <span className='li-text fs-15 fw-6 op-09'>{measure}</span>
                    </li>
                  ))
                }
              </ul>
            </div>

            <div className='instructions my-4'>
              <h6 className='fs-16'>Instructions:</h6>
              <ul className='grid'>
                {
                  instructions?.map((instruction, idx) => (
                    <li key = {idx} className = "fs-14">
                      <AiOutlineCheckSquare size = {18} className = "text-orange li-icon" />
                      <span className='li-text fs-16 fw-5 op-09'>{instruction}</span>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </section>
  )
}

export default MealSingle
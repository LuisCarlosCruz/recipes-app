import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import fetchRecipeId from '../services/fetchRecipeId';
import CopyToClipboardFunc from './CopyToClipboard';

const COMIDAS = 'comidas';

export default function InProgress() {
  const [keyObject, setKeyObject] = useState('');
  // objeto da receita, com base no URL
  const [recipeURL, setRecipeURL] = useState([]);
  // objeto passado como prop do componente CopyToClipboard
  const [objCopy, setObjCopy] = useState({
    id: 0,
    type: '',
  });

  const { pathname } = useLocation();
  const idRecipeByPathname = pathname.split('/')[2];
  console.log(idRecipeByPathname);
  const pageNameByPathname = pathname.split('/')[1];

  useEffect(() => {
    setKeyObject(pathname.includes('/comidas') === true ? 'meals' : 'drinks');
    setObjCopy(pathname.includes('/comidas') === true
      ? { id: idRecipeByPathname, type: 'Meal' }
      : { id: idRecipeByPathname, type: 'Drink' });

    const fetchId = async () => {
      await fetchRecipeId(idRecipeByPathname, setRecipeURL);
    };
    fetchId();
  }, []);

  // ============ OBTÉM INGREDIENTES & QUANTIDADES ================ //
  const listIngredients = [];
  const listQuantity = [];

  console.log(recipeURL[keyObject]);
  if (recipeURL[keyObject]) {
    const arrayObj = Object.entries(recipeURL[keyObject][0]);
    console.log(arrayObj);

    const getIngredients = () => {
      // INGREDIENTES
      const ingredients = arrayObj
        .filter((item) => item[0].includes('strIngredient'));
      ingredients.forEach((item) => {
        if (item[1] !== '' && item[1] !== null) {
          listIngredients.push(item[1]);
        }
      });

      // QUANTIDADES
      const quantity = arrayObj
        .filter((item) => item[0].includes('strMeasure'));
      quantity.forEach((item) => {
        if (item[1] !== '' && item[1] !== null) {
          listQuantity.push(item[1]);
        }
      });

      console.log(listQuantity);
    };
    getIngredients();
  }
  // =========================== // ============================== //

  return (
    <div className="inProgress-componet">
      {
        recipeURL[keyObject]
          && recipeURL[keyObject].map((item, index) => (
            <div className="elements" key={ index }>

              <div className="recipe-image">
                <img
                  data-testid="recipe-photo"
                  src={ pageNameByPathname === COMIDAS
                    ? item.strMealThumb : item.strDrinkThumb }
                  alt="foto da receita"
                />
              </div>

              <div className="recipe-title">
                <h2
                  data-testid="recipe-title"
                >
                  { pageNameByPathname === COMIDAS ? item.strMeal : item.strDrink }
                </h2>
              </div>

              <div className="recipe-category">
                <h5 data-testid="recipe-category">
                  {
                    pageNameByPathname === COMIDAS
                      ? item.strCategory
                      : `${item.strCategory} - ${item.strAlcoholic}`
                  }
                </h5>
              </div>

              <div className="recipe-share-btn">
                <CopyToClipboardFunc recipe={ objCopy } index={ index } />
              </div>
              <div></div>

            </div>
          ))
      }
    </div>
  );
}

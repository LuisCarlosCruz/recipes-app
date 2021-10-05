import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import fetchRecipeId from '../services/fetchRecipeId';

// const COMIDAS = 'comidas';

export default function InProgress() {
  const [keyObject, setKeyObject] = useState('');
  // objeto da receita, com base no URL
  const [recipeURL, setRecipeURL] = useState([]);

  const { pathname } = useLocation();
  const idRecipeByPathname = pathname.split('/')[2];
  console.log(idRecipeByPathname);
  const pageNameByPathname = pathname.split('/')[1];

  useEffect(() => {
    setKeyObject(pathname.includes('/comidas') === true ? 'meals' : 'drinks');

    const fetchId = async () => {
      await fetchRecipeId(idRecipeByPathname, setRecipeURL);
    };
    fetchId();
  }, []);

  // ============ OBTÉM INGREDIENTES & QUANTIDADES ================ //
  const listIngredients = [];
  const listQuantity = [];

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
    <div>InProgress component!</div>
  );
}

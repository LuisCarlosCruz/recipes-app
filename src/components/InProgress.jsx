import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import fetchRecipeId from '../services/fetchRecipeId';
import CopyToClipboardFunc from './CopyToClipboard';

import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import getIngredients from '../utils/getIngredientes';
import Context from '../context/Context';

const COMIDAS = 'comidas';
const KEY_DONE_RECIPES = 'doneRecipes';

export default function InProgress() {
  const { recipeInProgress, setRecipeInProgress, linkCopied } = useContext(Context);

  // chave que define o tipo da receita: 'meals' ou 'drinks'
  const [keyObject, setKeyObject] = useState('');
  // objeto da receita, com base no URL
  const [recipeURL, setRecipeURL] = useState([]);
  // objeto passado como prop do componente CopyToClipboard
  const [objCopy, setObjCopy] = useState({
    id: 0,
    type: '',
  });
  const [listIngredients, setListIngredients] = useState([]);
  const [listQuantity, setListQuantity] = useState([]);

  const { pathname } = useLocation();
  const idRecipeByPathname = pathname.split('/')[2];
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
    // getIngredients(recipeURL, keyObject, setListIngredients, setListQuantity);
  }, []);

  // === OBTÉM INGREDIENTES & QUANTIDADES E SETA NOS RESPECTIVOS ESTADOS === //
  useEffect(() => {
    getIngredients(recipeURL, keyObject, setListIngredients, setListQuantity);
    // SETA A RECEITA QUE ESTÁ EM ANDAMENTO NO ESTADO ṔARA SER USADO NO BOTÃO DE FINALIZAR RECEITA
    setRecipeInProgress(recipeURL[keyObject]);
  }, [keyObject, recipeURL]);

  return (
    <div className="inProgress-componet">
      {
        recipeURL[keyObject]
          && recipeURL[keyObject].map((item, index) => (
            <div className="elements" key={ index }>

              <div className="recipe-image">
                <img
                  data-testid="recipe-photo"
                  src={
                    pageNameByPathname === COMIDAS
                      ? item.strMealThumb
                      : item.strDrinkThumb
                  }
                  alt="foto da receita"
                />
              </div>

              <div className="recipe-title">
                <h2 data-testid="recipe-title">
                  {
                    pageNameByPathname === COMIDAS
                      ? item.strMeal
                      : item.strDrink
                  }
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

              <div className="recipe-share-btn" data-testid="share-btn">
                {
                  linkCopied
                    ? (
                      <div className="alert alert-success" role="alert">
                        Link copiado!
                      </div>
                    ) : null
                }
                <CopyToClipboardFunc recipe={ objCopy } index={ index } />
              </div>

              <div className="recipe-favorite-btn">
                <button
                  data-testid="favorite-btn"
                  type="button"
                >
                  <img src={ whiteHeartIcon } alt="favoritas" />
                </button>
              </div>

              <div className="recipe-ingredients">
                <h4>Ingredients</h4>
                <ul className="list-ingredients">
                  {
                    listIngredients.map((ingredient, i) => (
                      <li data-testid={ `${i}-ingredient-step` } key={ i }>
                        { ingredient }
                        { ' - ' }
                        { listQuantity[i] }
                      </li>
                    ))
                  }
                </ul>
              </div>

              <div className="recipe-instruction">
                <h4>Instructions</h4>
                <p data-testid="instructions">{ item.strInstructions }</p>
              </div>

              <div className="recipe-finish-button">
                <button
                  data-testid="finish-recipe-btn"
                  type="button"
                  onClick={ () => {
                    // const recipeFinish = {
                    //   id: idRecipeByPathname,
                    //   idMeal: idRecipeByPathname,
                    //   strMealThumb: item.strMealThumb,
                    //   strCategory: item.strCategory,
                    //   strMeal: item.strMeal,
                    //   strTags: item.strTags,
                    //   strArea: item.strArea,
                    //   date: '23/06/2020',
                    //   type: objCopy.type,
                    // };
                    // setRecipeInProgress([...recipeInProgress, recipeFinish]);
                    localStorage.setItem(KEY_DONE_RECIPES, JSON.stringify(recipeInProgress));
                    console.log(recipeInProgress);
                  } }
                >
                  Finalizar receita
                </button>
              </div>

            </div>
          ))
      }
    </div>
  );
}

// const RECEITAS_MOCK = [
//   {
//     id: 52771,
//     idMeal: 52771,
//     strMealThumb: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
//     strCategory: 'Vegetarian',
//     strMeal: 'Spicy Arrabiata Penne',
//     strTags: 'Pasta, Curry, Macarrão',
//     strArea: 'Italian',
//     date: '23/06/2020',
//     type: 'Meal',
//   },
//   {
//     id: 178319,
//     idDrink: 178319,
//     strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
//     strCategory: 'Ordinary Drink',
//     strAlcoholic: 'Alcoholic',
//     strDrink: 'Aquamarine',
//     strTags: '',
//     date: '23/06/2020',
//     type: 'Drink',
//   },
// ]

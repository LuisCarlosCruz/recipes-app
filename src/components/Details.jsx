import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import fetchRecipeId from '../services/fetchRecipeId';
import RecomendationDetails from './RecomendationDetails';
import '../App.css';

import Footer from './Footer';
import Header from './Header';

export default function Details() {
  const [keyPath, setKeyPath] = useState('');
  const [recipeURL, setRecipeURL] = useState([]);
  const [statusBtn] = useState(false);
  const [statusRecipeProgress] = useState(false);

  const { pathname } = useLocation();
  const idPath = pathname.split('/')[2];
  const pagName = pathname.split('/')[1];
  // ========================================================

  useEffect(() => {
    setKeyPath(pathname.includes('/comidas') === true ? 'meals' : 'drinks');
    const fetchId = async () => {
      await fetchRecipeId(idPath, setRecipeURL);
    };
    fetchId();
  }, []);

  // =========PEGA INGREDIENTES & QUANTIDADE ===================
  const ingredFilter = [];
  const ingredFilterQtd = [];

  if (recipeURL[keyPath]) {
    const array = Object
      .entries(recipeURL[keyPath][0]);

    const getIngredients = () => {
      const newArray = array.filter((item) => item[0].includes('strIngredient'));
      newArray.filter((item) => ingredFilter.push(item[1]));
      //  ====
      const newArray2 = array.filter((item) => item[0].includes('strMeasure'));
      newArray2.filter((item) => ingredFilterQtd.push(item[1]));
    };
    getIngredients();
  }
  // ===========================================================

  return (
    <div>
      <Header />
      {
        recipeURL[keyPath]
          && recipeURL[keyPath].map((item, index) => (
            <div key={ index }>
              <img
                src={ pagName === 'comidas' ? item.strMealThumb : item.strDrinkThumb }
                width="200px"
                alt="foto-da-receita"
                data-testid="recipe-photo"
              />
              <h2
                data-testid="recipe-title"
              >
                { pagName === 'comidas' ? item.strMeal : item.strDrink }
              </h2>
              <h5 data-testid="recipe-category">
                {
                  pagName === 'bebidas'
                    ? `${item.strCategory} ${item.strAlcoholic}` : item.strCategory
                }
              </h5>
              <div data-testid="share-btn">
                <Link to="/">
                  <img src={ shareIcon } alt="icon-share" />
                </Link>
              </div>
              <div data-testid="favorite-btn">
                <Link to="/">
                  <img src={ whiteHeartIcon } alt="icon-favorite" />
                </Link>
              </div>
              <h5 data-testid="recipe-category">{ item.strCategory }</h5>
              <h4>Ingredient</h4>
              <ul>
                {
                  ingredFilter
                    .map((ingred, i) => (
                      ingred !== '' ? (
                        <li
                          key={ i }
                          data-testid={ `${i}-ingredient-name-and-measure` }
                        >
                          { ingred }
                          { ingredFilterQtd[i] }
                        </li>) : ''))
                }
              </ul>
              <h4>Instructions</h4>
              <p data-testid="instructions">{ item.strInstructions }</p>
              <div>
                <a data-testid="video" href={ item.strYoutube }>VÍDEO</a>
              </div>
              <h4>Recomendamos</h4>
              <RecomendationDetails idPath={ idPath } pagName={ pagName } />
              <br />
            </div>
          ))
      }
      <button
        type="button"
        data-testid="start-recipe-btn"
        className={ statusBtn === true ? 'btnIncialRecipeOn' : 'btnIncialRecipeOff' }
      >
        { statusRecipeProgress === true ? 'Iniciar Receita' : 'Continuar Receita'}
      </button>
      <Footer />
    </div>
  );
}

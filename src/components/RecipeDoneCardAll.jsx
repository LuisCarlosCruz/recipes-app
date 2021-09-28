import React, { useContext } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import Context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';

// RENDERIZA TODAS AS RECEITAS FEITAS

export default function RecipeDoneCard() {
  const {
    allRecipesDone, copied, setCopied,
  } = useContext(Context);

  function renderTags(stringTags) {
    if (stringTags) {
      const separator = /,\s*/; // ,' '
      const allTags = stringTags.split(separator); // cria um array de tags
      return allTags;
    }
    return '';
  }

  // function getLink(recipe) {
  //   const linkToCopy = recipe.type === 'Meal'
  //     ? `http://localhost:3000/comidas/${recipe.idMeal}`
  //     : `http://localhost:3000/bebidas/${recipe.idDrink}`;

  //   setCopied(true);
  //   setLinkCopied(linkToCopy);
  // }

  if (allRecipesDone.length !== 0) {
    return (
      allRecipesDone
        .map((recipe, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
            className="recipe-done-card"
          >
            <div className="recipe-card-img">
              <Link
                to={
                  recipe.type === 'Meal'
                    ? `/comidas/${recipe.idMeal}`
                    : `/bebidas/${recipe.idDrink}`
                }
              >
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe[`str${recipe.type}Thumb`] }
                  alt="thumbnail"
                />
              </Link>
            </div>

            <div className="recipe-card-category">
              <div
                data-testid={ `${index}-horizontal-top-text` }
              >
                {
                  recipe.type === 'Meal'
                    ? `${recipe.strArea} - ${recipe.strCategory}`
                    : `${recipe.strAlcoholic}`
                }
              </div>
            </div>

            <div className="recipe-card-title">
              <Link
                to={
                  recipe.type === 'Meal'
                    ? `/comidas/${recipe.idMeal}`
                    : `/bebidas/${recipe.idDrink}`
                }
              >
                <h4 data-testid={ `${index}-horizontal-name` }>
                  {recipe[`str${recipe.type}`]}
                </h4>
              </Link>
            </div>

            <div className="recipe-card-date">
              <div data-testid={ `${index}-horizontal-done-date` }>
                {`Feita em: ${recipe.date}`}
              </div>
            </div>

            <div className="recipe-card-tags">
              <div
                data-testid={ `${index}-${renderTags(recipe.strTags)[0]}-horizontal-tag` }
              >
                {renderTags(recipe.strTags)[0]}
              </div>
              <div
                data-testid={ `${index}-${renderTags(recipe.strTags)[1]}-horizontal-tag` }
              >
                {renderTags(recipe.strTags)[1]}
              </div>
            </div>

            {/* <div className="recipe-card-share-btn">
                <a
                  href={
                    recipe.type === 'Meal'
                      ? `/comidas/${recipe.idMeal}`
                      : `/bebidas/${recipe.idDrink}`
                  }
                  src={ shareIcon }
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ () => {} }
                >
                  <img src={ shareIcon } alt="share" />
                </a>
              </div> */}
            <div className="recipe-card-share-btn">
              <CopyToClipboard
                text={
                  recipe.type === 'Meal'
                    ? `http://localhost:3000/comidas/${recipe.idMeal}`
                    : `http://localhost:3000/bebidas/${recipe.idDrink}`
                }
              >
                <button
                  data-testid={ `${index}-horizontal-share-btn` }
                  type="button"
                  src={ shareIcon }
                  onClick={ () => setCopied(true) }
                >
                  <img src={ shareIcon } alt="share" />
                  { copied ? <span> Link copiado!</span> : null }
                </button>
              </CopyToClipboard>
            </div>

          </div> // end <div> principal
        )) // end map()
    ); // end return() do if
  } // end if

  return <div>Você ainda não concluiu nenhuma receita.</div>;
} // end function

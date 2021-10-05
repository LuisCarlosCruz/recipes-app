import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Context from '../context/Context';
import useCurrentPage from '../context/hooks/useCurrentPage';

export default function ExplorarBebidasIngredientes() {
  useCurrentPage('Explorar Bebidas por Ingredientes');
  const [ingredient, setIngredient] = useState([]);
  const { setFilteredDrinkIngredients } = useContext(Context);
  const twelve = 12;
  const history = useHistory();

  useEffect(() => {
    const fetchIngredients = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
      const data = await response.json();
      const { drinks } = data;
      const drinksCards = drinks.slice(0, twelve);
      setIngredient(drinksCards);
    };
    fetchIngredients();
  }, []);

  const getDrinksFromIngredients = async (ingredientName) => {
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientName}`;
    console.log(endpoint);
    const { drinks } = await fetch(endpoint).then((response) => response.json());
    const twelveFilteredCards = drinks.slice(0, twelve);
    setFilteredDrinkIngredients(twelveFilteredCards);
    history.push('/bebidas');
  };

  return (
    <div className="page">
      <div className="ingredient-card">
        { ingredient.map((drink, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${index}-ingredient-card` }
            name={ drink.strIngredient1 }
            onClick={ (e) => getDrinksFromIngredients(e.target.alt) }
          >
            <div className="card-image">
              <img
                name={ drink.strIngredient }
                src={ `https://www.thecocktaildb.com/images/ingredients/${drink.strIngredient1}-Small.png` }
                data-testid={ `${index}-card-img` }
                alt={ drink.strIngredient1 }
              />
            </div>
            <div className="card-title">
              <p data-testid={ `${index}-card-name` }>
                { drink.strIngredient1 }
              </p>
            </div>
          </button>
        )) }
      </div>
      <Footer />
    </div>
  );
}

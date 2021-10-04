import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import Footer from '../components/Footer';
import useCurrentPage from '../context/hooks/useCurrentPage';

export default function ExplorarComidasIngredientes() {
  useCurrentPage('Explorar Comidas por Ingredientes');
  const [ingredients, setIngredients] = useState([]);
  const { setFilteredFoodIngredients } = useContext(Context);
  // const [recipes, setRecipes] = useState([]);
  const history = useHistory();
  const twelve = 12;

  useEffect(() => {
    const fetchIngredients = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const data = await response.json();
      const { meals } = data;
      const twelveCards = meals.slice(0, twelve);
      setIngredients(twelveCards);
    };
    fetchIngredients();
  }, []);

  const getMealsFromIngredients = async (ingredientName) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`);
    const data = await response.json();
    const { meals } = data;
    const allCards = meals.slice(0, twelve);
    setFilteredFoodIngredients(allCards);
    history.push('/comidas');
  };

  return (
    <div className="page">
      <div className="ingredient-card">
        { ingredients.map((item, index) => (
          <button
            key={ index }
            type="button"
            name={ item.strIngredient }
            data-testid={ `${index}-ingredient-card` }
            onClick={ (e) => getMealsFromIngredients(e.target.alt) }
          >
            <div className="card-image">
              <img
                name={ item.strIngredient }
                src={ `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png` }
                data-testid={ `${index}-card-img` }
                alt={ item.strIngredient }
              />
            </div>
            <div className="card-title">
              <p data-testid={ `${index}-card-name` }>
                { item.strIngredient }
              </p>
            </div>
          </button>
        ))}
      </div>
      <Footer />
    </div>
  );
}

import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HomeRecipeCard from '../components/HomeRecipeCard';
import Context from '../context/Context';
import useCurrentPage from '../context/hooks/useCurrentPage';
import { fetchAllRecipes } from '../services';

function Bebidas() {
  useCurrentPage('Bebidas');

  const history = useHistory();

  const {
    setAllRecipes,
    apiRadio,
    filter,
    filteredDrinkIngredients,
  } = useContext(Context);

  useEffect(() => {
    async function getRecipes() {
      const quantidade = 12;
      const { drinks } = await fetchAllRecipes('drinks');
      setAllRecipes(drinks.slice(0, quantidade));
    }

    getRecipes();
  }, [setAllRecipes]);

  // NAO TENTE ENTENDER ESSE EFFECT !!
  // PRO SEU PROPRIO BEM
  useEffect(() => {
    const quantidade = 12;
    if (filter === true && apiRadio.drinks !== null) {
      setAllRecipes(apiRadio.drinks.slice(0, quantidade));
      if (window.location.pathname === '/bebidas' && apiRadio.drinks.length === 1) {
        const id = apiRadio.drinks[0].idDrink;
        history.push(`/bebidas/${id}`);
      }
    }
    if (apiRadio !== undefined && apiRadio.drinks === null) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }, [apiRadio]);

  if (filteredDrinkIngredients.length > 0) {
    return (
      <div>
        <Header showSearch />
        { filteredDrinkIngredients.map((drink, index) => (
          <Link
            key={ index }
            to={ `/bebidas/${drink.idDrink}` }
          >
            <div data-testid={ `${index}-recipe-card` }>
              <img
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
                data-testid={ `${index}-card-img` }
              />
              <span data-testid={ `${index}-card-name` }>
                {' '}
                { drink.strDrink }
                {' '}
              </span>
            </div>
          </Link>
        )) }
        <Footer />
      </div>
    );
  }
  return (
    <div className="page">
      <Header showSearch />
      <div className="home-cards">
        <HomeRecipeCard />
      </div>
      <Footer />
    </div>
  );
}

export default Bebidas;

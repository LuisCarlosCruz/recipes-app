import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import CategoryFilter from '../components/CategoryFilter';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HomeRecipeCard from '../components/HomeRecipeCard';
import Context from '../context/Context';
import useCurrentPage from '../context/hooks/useCurrentPage';
import { fetchAllRecipes, fetchByCategory, fetchCategories } from '../services';

function Bebidas() {
  useCurrentPage('Bebidas');

  const {
    setAllRecipes,
    setCategories,
    selectedCategory,
    apiRadio,
    filter,
    filteredDrinkIngredients,
  } = useContext(Context);

  const history = useHistory();

  useEffect(() => {
    async function getCategories() {
      const quantidade = 5;
      const { drinks } = await fetchCategories('drinks');
      setCategories(drinks.slice(0, quantidade));
    }

    async function getAllRecipes() {
      const quantidade = 12;
      const { drinks } = await fetchAllRecipes('drinks');
      console.log('console abaixo em bebidas linhas 18,19');
      console.log(drinks);
      setAllRecipes(drinks.slice(0, quantidade));
    }

    async function getByCategory() {
      const quantidade = 12;
      const { drinks } = await fetchByCategory('drinks', selectedCategory);
      setAllRecipes(drinks.slice(0, quantidade));
    }

    getCategories();

    if (selectedCategory === 'All') {
      getAllRecipes();
    } else {
      getByCategory();
    }
  }, [selectedCategory]);

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
      <div className="categories-filter">
        <CategoryFilter />
      </div>
      <div className="home-cards">
        <HomeRecipeCard />
      </div>
      <Footer />
    </div>
  );
}

export default Bebidas;

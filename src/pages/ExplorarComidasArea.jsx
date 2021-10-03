import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import useCurrentPage from '../context/hooks/useCurrentPage';

export default function ExplorarComidasArea() {
  useCurrentPage('Explorar Comidas por Local de Origem');
  const [areas, setAreas] = useState([]);
  const [cards, setCards] = useState([]);
  const [filterCards, setFilterCards] = useState([]);
  const [ready, setReady] = useState(false);
  const twelve = 12;

  useEffect(() => {
    const fetchArea = async () => {
      const all = 'All';
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const data = await response.json();
      const allAreas = [...data.meals, { strArea: all }];
      setAreas(allAreas);
    };
    fetchArea();
  }, []);

  useEffect(() => {
    const fetchCards = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      const { meals } = data;
      const mealCards = meals.slice(0, twelve);
      setCards(mealCards);
    };
    fetchCards();
  }, []);

  const handleFilter = async ({ target }) => {
    const all = 'All';

    if (target.value === all) {
      setFilterCards(cards);
    } else {
      const filtered = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${target.value}`;
      const response = await fetch(filtered);
      const data = await response.json();
      const { meals } = data;
      const twelveCards = meals.slice(0, twelve);
      setFilterCards(twelveCards);
      setReady(true);
    }
  };

  if (!ready) {
    return (
      <div className="page">
        <select
          data-testid="explore-by-area-dropdown"
          onChange={ (e) => handleFilter(e) }
        >
          { areas.map((area, index) => (
            <option
              key={ index }
              data-testid={ `${area.strArea}-option` }
            >
              { area.strArea }
            </option>
          ))}
        </select>
        { cards.map((card, index) => (
          <Link key={ card.id } to={ `/comidas/${card.idMeal}` }>
            <div data-testid={ `${index}-recipe-card` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ card.strMealThumb }
                alt="Food thumb"
              />
              <span data-testid={ `${index}-card-name` }>{card.strMeal}</span>
            </div>
          </Link>
        )) }
        <Footer />
      </div>
    );
  }

  if (ready) {
    return (
      <div className="page">
        <select
          data-testid="explore-by-area-dropdown"
          onChange={ (e) => handleFilter(e) }
        >
          { areas.map((area, index) => (
            <option
              key={ index }
              data-testid={ `${area.strArea}-option` }
            >
              { area.strMeal }
            </option>
          )) }
        </select>
        { filterCards.map((filteredCard, index) => (
          <Link key={ index } to={ `/comidas/${filteredCard.idMeal}` }>
            <div data-testid={ `${index}-recipe-card` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ filteredCard.strMealThumb }
                alt="Food Thumb"
              />
              <span data-testid={ `${index}-card-name` }>
                { filteredCard.strMeal }
              </span>
            </div>
          </Link>
        )) }
      </div>
    );
  }
}

// Source: https://github.com/tryber/sd-07-project-recipes-app/pull/990/files //

import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import fetchRecomendation from '../services/fetchRecomendation';
import '../App.css';
import Context from '../context/Context';

// idPath & pahName vem do componente Details
function RecomendationDetails({ idPath, pagName }) {
  const { rec, setRec, key, setKey } = useContext(Context);

  useEffect(() => {
    fetchRecomendation(idPath, setRec);
    setKey(pagName === 'comidas' ? 'drinks' : 'meals');
  }, []);

  const NUM = 6;

  return (
    <div className="items">
      { rec[key] !== undefined
        ? rec[key].slice(0, NUM)
          .map((item, index) => (
            <div
              className="item"
              key={ index }
              data-testid={ `${index}-recomendation-card` }
            >
              <div className="img">
                <img
                  src={ pagName === 'bebidas' ? item.strMealThumb : item.strDrinkThumb }
                  alt="foto-recomendada"
                  data-testid="recipe-photo"
                  width="70px"
                />
                <p>
                  { pagName === 'comidas'
                    ? `${item.strCategory} ${item.strAlcoholic}` : item.strCategory }
                </p>
                <h5
                  data-testid={ `${index}-recomendation-title` }
                >
                  {
                    pagName === 'bebidas' ? item.strMeal : item.strDrink
                  }
                </h5>
              </div>
            </div>
          )) : '' }
    </div>
  );
}

RecomendationDetails.propTypes = {
  idPath: PropTypes.string.isRequired,
  pagName: PropTypes.string.isRequired,
};

export default RecomendationDetails;

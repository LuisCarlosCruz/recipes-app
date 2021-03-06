import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

function Footer() {
  return (
    <footer
      data-testid="footer"
      className="footer"
    >
      <a
        href="/bebidas"
        src={ drinkIcon }
        data-testid="drinks-bottom-btn"
        className="footer-icon"
      >
        <img src={ drinkIcon } alt="Drinks" />
      </a>

      <a
        href="/explorar"
        src={ exploreIcon }
        data-testid="explore-bottom-btn"
        className="footer-icon"
      >
        <img src={ exploreIcon } alt="Explore" />
      </a>

      <a
        href="/comidas"
        src={ mealIcon }
        data-testid="food-bottom-btn"
        className="footer-icon"
      >
        <img src={ mealIcon } alt="Food" />
      </a>
    </footer>
  );
}

export default Footer;

// - Não tem footer na tela de login
// - Tem footer na tela de principal de receitas de comidas [OK]
// - Tem footer na tela de principal de receitas de bebidas [OK]
// - Não tem footer na tela de detalhes de uma receita de comida
// - Não tem footer na tela de detalhes de uma receita de bebida
// - Não tem footer na tela de receita em processo de comida
// - Não tem footer na tela de receita em processo de bebida
// - Tem footer na tela de explorar [OK]
// - Tem footer na tela de explorar comidas [OK]
// - Tem footer na tela de explorar comidas por ingrediente [OK]
// - Tem footer na tela de explorar comidas por local de origem [OK]
// - Tem footer na tela de explorar bebidas [OK]
// - Tem footer na tela de explorar bebidas por ingrediente
// - Tem footer na tela de perfil [OK]
// - Não tem footer na tela de receitas feitas
// - Não tem footer na tela de receitas favoritas

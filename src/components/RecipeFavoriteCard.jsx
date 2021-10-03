import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';

import RecipeFavoriteCardAll from './RecipeFavoriteCardAll';
import RecipeFavoriteCardFilter from './RecipeFavoriteCardFilter';

export default function RecipeFavoriteCard() {
  const {
    favoritesRecipes,
    filterFavoritesRecipes,
    setFavoritesRecipes,
  } = useContext(Context);

  useEffect(() => {
    // CONST CRIADA PARA FINS DE TESTE. DEVE SER SETADA NO BOTÃO DE "FAVORITAR RECEITA"
    const RECEITAS_FAV_MOCK = [
      {
        id: 52771,
        type: 'Meal',
        area: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      },
      {
        id: 178319,
        type: 'Drink',
        area: '',
        category: 'Ordinary Drink',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      },
    ];
    // AS 'RECEITAS FAVORITAS' SÃO SETADAS NO LOCAL STORAGE NAS PÁGS: DETALHES E PROGRESSO
    // APAGAR ESSE SET ITEM, APÓS A IMPLEMENTAÇÃO DE FAVORITAR RECEITA ESTIVER CONCLUÍDA
    localStorage.setItem('favoriteRecipes', JSON.stringify(RECEITAS_FAV_MOCK));

    // POIS O CORRETO É:
    // 1.OBTER OS DADOS DO LOCALSTORAGE
    const recipesFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    // 2.SETAR ESSES DADOS NO ESTADO, USANDO setFavoritesRecipes()
    setFavoritesRecipes(recipesFavorites);
    // NO ENTANTO ISSO VAI OCORRER TODA VEZ QUE A PÁGINA FOR CARREGADA, ISSO ATRAPALHA O TESTE DO
    // BOTÃO DISLIKE, POIS O CYPRESS RECARREGA A PÁGINA, OU SEJA, ACESSANDO A PÁGINA NOVAMENTE O
    // LOCAL STORAGE É SETADO AQUI DE NOVO. O CYPRESS VERIFICA SE AO ACESSAR A PÁGINA O ARRAY ESTÁ
    // VAZIO, OU SEJA, NÃO TEM MAIS NENHUMA RECEITA FAVORITA.
    // OBS.: A LÓGICA CRIADA NO BOTÃO DISLIKE ESTÁ FUNCIONANDO, MAS COMO O LOCAL STORAGE É SETADO
    // DE NOVO AQUI, O TESTE NÃO PASSA.
    // COMO RESOLVER??? O SET NÃO PODE OCORRER AQUI. SÓ VAI DAR CERTO, QUANDO O SET FOR FEITO NAS PÁGINAS CERTAS
  }, [setFavoritesRecipes]);

  if (filterFavoritesRecipes.length !== 0) return (<RecipeFavoriteCardFilter />);

  if (favoritesRecipes.length !== 0) return (<RecipeFavoriteCardAll />);

  return (<p>Você não favoritou nenhuma receita.</p>);
}

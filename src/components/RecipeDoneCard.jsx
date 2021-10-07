import React, { useContext } from 'react';
import Context from '../context/Context';
import RecipeDoneCardFilter from './RecipeDoneCardFilter';
import RecipeDoneCardAll from './RecipeDoneCardAll';

export default function RecipeDoneCard() {
  const {
    allRecipesDone,
    // setAllRecipesDone,
    filterRecipeDone,
  } = useContext(Context);

  // useEffect(() => {
  //   // recuperar do local storage
  //   const recipeDone = JSON.parse(localStorage.getItem('doneRecipes'));
  //   // setar no estado
  //   setAllRecipesDone(recipeDone);
  // }, [setAllRecipesDone]);

  // RETORNA COMPONENTE COM AS RECEITAS FILTRADAS
  if (filterRecipeDone.length !== 0) return (<RecipeDoneCardFilter />);

  // RETORNA COMPONENTE COM TODAS AS RECEITAS FEITAS
  if (allRecipesDone.length !== 0) return (<RecipeDoneCardAll />);

  return <p>Você não finalizou nenhuma receita</p>;
} // end function

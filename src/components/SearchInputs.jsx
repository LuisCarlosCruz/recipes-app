import React, { useContext } from 'react';
import Context from '../context/Context';
import searchBarTextFetch from '../services/searchBarTextFetch';

function SearchInputs() {
  const {
    inputRadio,
    inputText,
    setInputRadio,
    setInputText,
    setApiRadio,
    setFilter,
  } = useContext(Context);

  const handleClickFiltrarReceita = () => {
    searchBarTextFetch(inputRadio, inputText, setApiRadio);
    setFilter(true);
  };

  return (
    <div className="search-inputs">
      <label htmlFor="buscaTexto" className="search-input">
        <input
          type="text"
          id="buscaTexto"
          placeholder="Buscar Receita"
          data-testid="search-input"
          onChange={ (e) => setInputText(e.target.value) }
        />
      </label>

      <div className="search-radios">
        <label htmlFor="ingredient">
          <input
            type="radio"
            id="ingredient"
            name="busca"
            value="Ingrediente"
            data-testid="ingredient-search-radio"
            onChange={ (e) => setInputRadio(e.target.value) }
          />
          Ingrediente
        </label>
        {/* --------------------------- */}
        <label htmlFor="name">
          <input
            type="radio"
            id="name"
            name="busca"
            value="Nome"
            data-testid="name-search-radio"
            onChange={ (e) => setInputRadio(e.target.value) }
          />
          Nome
        </label>
        {/* --------------------------- */}
        <label htmlFor="letra">
          <input
            type="radio"
            id="letra"
            name="busca"
            value="Primeira letra"
            data-testid="first-letter-search-radio"
            onChange={ (e) => setInputRadio(e.target.value) }
          />
          Primeira Letra
        </label>

      </div>

      <button
        type="submit"
        data-testid="exec-search-btn"
        onClick={ handleClickFiltrarReceita }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchInputs;

export default function fetchRecomendation(idPath, setRec) {
  switch (window.location.pathname) {
  case `/bebidas/${idPath}`:
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((resp) => setRec(resp));
    break;
  case `/comidas/${idPath}`:
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((response) => setRec(response));
    break;
  default:
    break;
  }
}

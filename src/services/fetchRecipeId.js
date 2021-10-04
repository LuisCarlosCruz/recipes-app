export default function fetchRecipeId(id, setRecipeURL) {
  switch (window.location.pathname) {
  case `/bebidas/${id}`:
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((resp) => setRecipeURL(resp));
    break;
  case `/comidas/${id}`:
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((response) => setRecipeURL(response));
    break;
  default:
    break;
  }
}

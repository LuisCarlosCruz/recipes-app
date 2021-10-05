// ============ OBTÉM INGREDIENTES & QUANTIDADES ================ //
export default function getIngredients(
  recipeURL,
  keyObject,
  setListIngredients,
  setListQuantity,
) {
  const listIngredients = [];
  const listQuantity = [];

  if (recipeURL[keyObject]) {
    const arrayObj = Object.entries(recipeURL[keyObject][0]);

    // INGREDIENTES
    const ingredients = arrayObj.filter((item) => item[0].includes('strIngredient'));
    ingredients.forEach((item) => {
      if (item[1] !== '' && item[1] !== null) {
        setListIngredients(listIngredients.push(item[1]));
      }
    });

    // QUANTIDADES
    const quantity = arrayObj.filter((item) => item[0].includes('strMeasure'));
    quantity.forEach((item) => {
      if (item[1] !== '' && item[1] !== null) setListQuantity(listQuantity.push(item[1]));
    });

    setListIngredients(listIngredients);
    setListQuantity(listQuantity);
    // getIngredients();
  }
  console.log('sou a função getingredients');
}

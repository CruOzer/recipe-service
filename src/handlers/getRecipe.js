import commonMiddleware from "../lib/commonMiddleware";

import { getRecipeById } from "../lib/getRecipeById";

async function getRecipes(event, context) {
  const { id } = event.pathParameters;
  const recipe = await getRecipeById(id);

  return {
    statusCode: 200,
    body: JSON.stringify(recipe),
  };
}

export const handler = commonMiddleware(getRecipes);

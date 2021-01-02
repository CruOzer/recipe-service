import commonMiddleware from "../lib/commonMiddleware";

import { getItemById } from "../lib/getItemById";

async function getRecipes(event, context) {
  const { id } = event.pathParameters;
  const recipe = await getItemById(id);

  return {
    statusCode: 200,
    body: JSON.stringify(recipe),
  };
}

export const handler = commonMiddleware(getRecipes);

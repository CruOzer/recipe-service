import commonMiddleware from "../lib/commonMiddleware";
import validator from "@middy/validator";

import createRecipeSchema from "../lib/schemas/createRecipeSchema";
import { createRecipeWithInfo } from "../lib/createRecipeWithInfo";

async function createRecipe(event, context) {
  // Get Data from request
  const { title } = event.body;
  const { description } = event.body;
  const author = "test@test.com";
  const { ingredients } = event.body;
  const { instructions } = event.body;

  // Create Recipe
  const recipe = await createRecipeWithInfo(
    title,
    description,
    author,
    instructions,
    ingredients
  );
  return {
    statusCode: 201,
    body: JSON.stringify(recipe),
  };
}

export const handler = commonMiddleware(createRecipe).use(
  validator({ inputSchema: createRecipeSchema })
);

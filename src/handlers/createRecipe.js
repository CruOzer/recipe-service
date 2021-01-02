import commonMiddleware from "../lib/commonMiddleware";
import validator from "@middy/validator";

import createRecipeSchema from "../lib/schemas/createRecipeSchema";
import { createItem } from "../lib/createItem";

async function createRecipe(event, context) {
  // Get Data from request
  const { title } = event.body;
  const { description } = event.body;
  const author = "test@test.com";
  const { data } = event.body;
  const type = "recipe";

  // Create Recipe
  const recipe = await createItem(title, description, author, type, data);
  return {
    statusCode: 201,
    body: JSON.stringify(recipe),
  };
}

export const handler = commonMiddleware(createRecipe).use(
  validator({ inputSchema: createRecipeSchema })
);

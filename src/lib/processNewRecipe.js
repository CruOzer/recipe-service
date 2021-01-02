import { createItem } from "../lib/createItem";
import { getItemByTitle } from "../lib/getItemByTitle";
import { updateData } from "../lib/updateData";

export async function processNewRecipe(recipe) {
  const categories = recipe.data.tags;
  const type = "category";

  // iterate throught all categories from the recipe
  await Promise.all(
    categories.map(async (categoryTitle) => {
      try {
        const items = await getItemByTitle(type, categoryTitle);

        if (items && items.length > 0) {
          // If category exists but recipe is not referenced, add reference to all available categories
          await Promise.all(
            items.map(async (el) => {
              const clone = [...el.data];
              if (!clone.includes(recipe.id)) {
                clone.push(recipe.id);
                await updateData(el.id, clone);
              }
            })
          );
        } else {
          // if category is not available create a new one
          // Create category with reference to recipe
          const data = [recipe.id];
          await createItem(
            categoryTitle,
            categoryTitle,
            recipe.author,
            type,
            data
          );
        }
      } catch (error) {
        console.error(error);
      }
    })
  );
}

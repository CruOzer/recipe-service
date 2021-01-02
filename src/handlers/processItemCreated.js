import { processNewRecipe } from "../lib/processNewRecipe";

async function processItemCreated(event, context) {
  const record = event.Records[0];
  const message = JSON.parse(record.body);
  const item = message.item;

  if (item.type == "recipe") {
    await processNewRecipe(item);
  }

  if (item.type === "category") {
  }
}

export const handler = processItemCreated;

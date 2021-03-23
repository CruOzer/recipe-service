import { v4 as uuid } from "uuid";
import AWS from "aws-sdk";
import createError from "http-errors";

import { sendInfoItemCreated } from "./sendInfoItemCreated";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function createRecipeWithInfo(
  title,
  description,
  author,
  instructions,
  ingredients
) {
  const now = new Date();
  // Create Object
  const item = {
    id: uuid(),
    title,
    description,
    author,
    instructions,
    ingredients,
    creationDate: now.toISOString(),
  };

  // Write to database
  try {
    await dynamoDb
      .put({
        TableName: process.env.RECIPES_TABLE_NAME,
        Item: item,
      })
      .promise();

    // Send Message
    await sendInfoItemCreated(item);
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  // return the created item
  return item;
}

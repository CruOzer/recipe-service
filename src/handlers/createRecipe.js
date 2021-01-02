import { v4 as uuid } from "uuid";
import AWS from "aws-sdk";
import commonMiddleware from "../lib/commonMiddleware";
import createError from "http-errors";
import validator from "@middy/validator";
import createRecipeSchema from "../lib/schemas/createRecipeSchema";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

async function createRecipe(event, context) {
  console.log(event.body);
  const { title } = event.body;

  const { description } = event.body;
  const now = new Date();
  const author = "test@test.com";
  const { data } = event.body;
  const type = "recipe";

  const recipe = {
    id: uuid(),
    title,
    description,
    type,
    author,
    data,
    creationDate: now.toISOString(),
  };

  try {
    await dynamoDb
    .put({
      TableName: process.env.RECIPES_TABLE_NAME,
      Item: recipe,
    })
    .promise();
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 201,
    body: JSON.stringify(recipe),
  };
}

export const handler = commonMiddleware(createRecipe).use(
  validator({ inputSchema: createRecipeSchema })
);

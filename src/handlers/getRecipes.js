import AWS from "aws-sdk";
import commonMiddleware from "../lib/commonMiddleware";
import createError from "http-errors";
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getRecipes(event, context) {
  let recipes;
  const params = {
    TableName: process.env.RECIPES_TABLE_NAME,
  };

  try {
    const result = await dynamodb.scan(params);
    recipes = result.Items;
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
  return {
    statusCode: 200,
    body: JSON.stringify(recipes),
  };
}

export const handler = commonMiddleware(getRecipes);

import AWS from "aws-sdk";
import createError from "http-errors";

const dynamodb = new AWS.DynamoDB.DocumentClient();

export async function getRecipeById(id) {
  let item;
  try {
    const result = await dynamodb
      .get({
        TableName: process.env.RECIPES_TABLE_NAME,
        Key: { id },
      })
      .promise();

    item = result.Item;
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  if (!item) {
    throw new createError.NotFound('Item with ID "${id}" not found.');
  }
  return item;
}

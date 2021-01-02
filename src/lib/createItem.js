import { v4 as uuid } from "uuid";
import AWS from "aws-sdk";
import createError from "http-errors";

import { sendInfoItemCreated } from "../lib/sendInfoItemCreated";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function createItem(title, description, author, type, data) {
  const now = new Date();
  // validate recipe-type
  if (type !== "recipe" && type !== "category")
    throw new createError.InternalServerError(
      `Type "${type}" unknown. Please use type "recipe" or "category"`
    );
  // Create Object
  const item = {
    id: uuid(),
    title,
    description,
    type,
    author,
    data,
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

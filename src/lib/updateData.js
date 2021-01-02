import AWS from "aws-sdk";

const dynamodb = new AWS.DynamoDB.DocumentClient();

export async function updateData(id, data) {
  const params = {
    TableName: process.env.RECIPES_TABLE_NAME,
    Key: { id },
    UpdateExpression: "set #data = :data",
    ExpressionAttributeValues: {
      ":data": data,
    },
    ExpressionAttributeNames: {
      "#data": "data",
    },
    ReturnValues: "ALL_NEW",
  };

  let updatedCategory;

  try {
    const result = await dynamodb.update(params).promise();
    updatedCategory = result.Attributes;
    return updatedCategory;
  } catch (error) {
    console.error(error);
  }
}

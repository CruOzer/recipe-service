import AWS from "aws-sdk";

const dynamodb = new AWS.DynamoDB.DocumentClient();

export async function getItemByTitle(type, title) {
  try {
    const params = {
      TableName: process.env.RECIPES_TABLE_NAME,
      IndexName: "typeAndTitleIndex",
      KeyConditionExpression: "#type = :type AND #title = :title",
      ExpressionAttributeValues: {
        ":type": type,
        ":title": title,
      },
      ExpressionAttributeNames: {
        "#type": "type",
        "#title": "title",
      },
    };

    const result = await dynamodb.query(params).promise();
    return result.Items;
  } catch (error) {
    console.error(error);
  }
}

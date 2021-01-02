import AWS from "aws-sdk";

const sqs = new AWS.SQS();

export async function sendInfoItemCreated(item) {
  const result = await sqs
    .sendMessage({
      QueueUrl: process.env.RECIPE_QUEUE_URL,
      MessageBody: JSON.stringify({
        item,
      }),
    })
    .promise();

  return result;
}

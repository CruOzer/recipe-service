async function infoItemCreated(event, context) {
  const record = event.Records[0];
  console.log(record);
}

export const handler = infoItemCreated;

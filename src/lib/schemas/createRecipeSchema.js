const schema = {
  properties: {
    body: {
      type: "object",
      properties: {
        title: {
          type: "string",
        },
        data: {
          type: "object",
          properties: {
            instructions: {
              type: "string",
            },
            ingredients: {
              type: "array",
            },
            tags: {
              type: "array",
            },
          },
          required: ["instructions"],
        },
      },
      required: ["title", "data"],
    },
  },
  required: ["body"],
};
export default schema;

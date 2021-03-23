const schema = {
  properties: {
    body: {
      type: "object",
      properties: {
        title: {
          type: "string",
        },
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
    },
    required: ["title", "instructions"],
  },
  required: ["body"],
};
export default schema;

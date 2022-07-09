export default {
  name: "card",
  title: "Card",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
      },
    },
    {
      name: "cardEffect",
      title: "Card effect:",
      type: "text",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
    },
    {
      name: "disappears",
      title: "Disappears?",
      type: "boolean",
      initialValue: false,
    },
  ],
};

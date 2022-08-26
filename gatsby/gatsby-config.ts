import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Deck of Many`,
    siteUrl: `https://www.yourdomain.tld`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-emotion", "gatsby-plugin-mdx", "gatsby-plugin-image", "gatsby-plugin-gatsby-cloud", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    },
    __key: "pages"
  },
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: "46tm32sl",
        dataset: "production",
        watchMode: false,
        token: process.env.SANITY_TOKEN,
      },
    },
  ]
};

export default config;

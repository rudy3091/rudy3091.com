module.exports = {
  pathPrefix: "/rudy3091.me",
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "rudy3091's page",
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "posts",
        path: `${__dirname}/posts/`,
      },
    },
    "gatsby-plugin-styled-components",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          `gatsby-remark-relative-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
  ],
};

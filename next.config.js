/** @type {import('next/dist/next-server/server/config-shared').NextConfig} */

const withTM = require("next-transpile-modules")(["react-children-utilities"]);
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer");

const config = {
  target: "serverless",
  eslint: {
    dirs: ['src'],
  },
  exportPathMap: async () => {
    return {
      "/": { page: "/" }
    };
  },
  trailingSlash: true,
  pageExtensions: ["tsx"],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });



    return config;
  },
};

module.exports = withTM(config);

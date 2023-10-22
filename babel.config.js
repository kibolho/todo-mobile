process.env.EXPO_ROUTER_APP_ROOT = __dirname + "/src/main/app";

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["expo-router/babel"],
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            "^@/tests/(.+)": "./tests/\\1",
            "^@/(.+)": "./src/\\1",
          },
          extensions: [".js", "jsx", ".ts", ".tsx", ".json"],
        },
      ],
    ],
  };
};

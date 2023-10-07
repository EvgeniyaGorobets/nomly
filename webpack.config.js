const createExpoWebpackConfigAsync = require("@expo/webpack-config");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: [
          "@gorhom/bottom-sheet",
          "@go_robots/react-native-paper-dropdown",
        ],
      },
    },
    argv
  );

  return config;
};

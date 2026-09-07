module.exports = (config) => {
  if (config.optimization) {
    // Consumers load main.js directly, so keep the Angular runtime and vendor
    // modules in that bundle instead of emitting additional entry chunks.
    delete config.optimization.runtimeChunk;
    delete config.optimization.splitChunks;
  }

  return config;
};

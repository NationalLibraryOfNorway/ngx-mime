module.exports = {
  proxy: [
    {
      forward: ['/catalog/'],
      target: 'localhost:4040',
      protocol: 'http',
    },
  ],
};

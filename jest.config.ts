const { getJestProjects } = require('@nx/jest');

export default {
  projects: getJestProjects(),
  moduleNameMapper: {
    d3: '<rootDir>/node_modules/d3/dist/d3.min.js',
  },
};

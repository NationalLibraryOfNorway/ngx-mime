// add all jest-extended matchers

require('ts-node').register({
  extends: '../tsconfig.json',
  transpileOnly: true,
  compilerOptions: {
    outDir: '../../dist/out-tsc',
    module: 'commonjs',
    target: 'es2022',
    types: ['node', '@axe-core/playwright', '@playwright/test'],
  },
});

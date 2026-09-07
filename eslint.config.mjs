import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import nxEslintPlugin from '@nx/eslint-plugin';
import eslintPluginTailwindcss from 'eslint-plugin-tailwindcss';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const workspaceRoot = dirname(fileURLToPath(import.meta.url));

const compat = new FlatCompat({
  baseDirectory: workspaceRoot,
  recommendedConfig: js.configs.recommended,
});

export default [
  {
    ignores: ['**/dist'],
  },
  {
    plugins: {
      '@nx': nxEslintPlugin,
      tailwindcss: eslintPluginTailwindcss,
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@typescript-eslint/member-ordering': ['error'],
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.component.ts'],
    rules: {
      // Angular ESLint 22 provides `inject-at-top`. Until this workspace moves
      // to Angular 22, allow components to keep injected dependencies first.
      '@typescript-eslint/member-ordering': 'off',
    },
  },
  ...compat
    .config({
      extends: ['plugin:@nx/typescript'],
    })
    .map((config) => ({
      ...config,
      files: ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts'],
      rules: {
        ...config.rules,
        '@angular-eslint/use-lifecycle-interface': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-this-alias': 'off',
        '@typescript-eslint/no-unused-expressions': [
          'error',
          {
            allowTernary: true,
          },
        ],
        'no-async-promise-executor': 'off',
        'no-empty': 'off',
        'prefer-const': 'off',
        'prefer-spread': 'off',
      },
    })),
  ...compat
    .config({
      extends: ['plugin:@nx/javascript'],
    })
    .map((config) => ({
      ...config,
      files: ['**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
      rules: {
        ...config.rules,
      },
    })),
  ...compat
    .config({
      extends: ['plugin:@angular-eslint/template/recommended'],
    })
    .map((config) => ({
      ...config,
      files: ['**/*.html'],
      settings: {
        ...config.settings,
        tailwindcss: {
          ...eslintPluginTailwindcss.configs.recommended.settings.tailwindcss,
          cssConfigPath: resolve(
            workspaceRoot,
            'apps/integration/src/tailwind.css',
          ),
        },
      },
      rules: {
        ...config.rules,
        ...eslintPluginTailwindcss.configs.recommended.rules,
        '@angular-eslint/template/prefer-control-flow': 'error',
        'tailwindcss/no-custom-classname': 'off',
        'tailwindcss/classnames-order': ['error'],
      },
    })),
];

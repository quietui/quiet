/* eslint-env node */

module.exports = {
  plugins: [
    '@typescript-eslint',
    'wc',
    'lit',
    'lit-a11y',
    'chai-expect',
    'chai-friendly',
    'import',
    'sort-imports-es6-autofix'
  ],
  extends: [
    'eslint:recommended',
    'plugin:wc/recommended',
    'plugin:wc/best-practice',
    'plugin:lit/recommended',
    'plugin:lit-a11y/recommended'
  ],
  env: {
    es2022: true,
    browser: true
  },
  parserOptions: {
    sourceType: 'module'
  },
  overrides: [
    {
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname
      },
      files: ['*.ts'],
      rules: {
        'default-param-last': 'off',
        'no-console': 'warn',
        'no-empty-function': 'off',
        'no-implied-eval': 'off',
        'no-invalid-this': 'off',
        'no-shadow': 'off',
        'no-throw-literal': 'off',
        'no-unused-expressions': 'off',
        '@typescript-eslint/array-type': 'warn',
        '@typescript-eslint/consistent-type-assertions': [
          'warn',
          { assertionStyle: 'as', objectLiteralTypeAssertions: 'never' }
        ],
        '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
        '@typescript-eslint/consistent-type-imports': 'warn',
        '@typescript-eslint/default-param-last': 'error',
        '@typescript-eslint/member-delimiter-style': 'warn',
        '@typescript-eslint/method-signature-style': 'warn',
        '@typescript-eslint/no-base-to-string': 'error',
        '@typescript-eslint/no-confusing-non-null-assertion': 'error',
        '@typescript-eslint/no-empty-function': 'warn',
        '@typescript-eslint/no-extraneous-class': 'error',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-implied-eval': 'error',
        '@typescript-eslint/no-invalid-this': 'error',
        '@typescript-eslint/no-invalid-void-type': 'error',
        '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-redundant-type-constituents': 'off',
        '@typescript-eslint/no-require-imports': 'error',
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/no-throw-literal': 'error',
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',
        '@typescript-eslint/no-unnecessary-condition': 'off',
        '@typescript-eslint/no-unnecessary-qualifier': 'warn',
        '@typescript-eslint/no-unused-expressions': 'error',
        '@typescript-eslint/non-nullable-type-assertion-style': 'warn',
        '@typescript-eslint/parameter-properties': 'error',
        '@typescript-eslint/prefer-for-of': 'warn',
        '@typescript-eslint/prefer-optional-chain': 'warn',
        '@typescript-eslint/prefer-regexp-exec': 'off',
        '@typescript-eslint/prefer-return-this-type': 'error',
        '@typescript-eslint/prefer-string-starts-ends-with': 'warn',
        '@typescript-eslint/prefer-ts-expect-error': 'warn',
        '@typescript-eslint/require-array-sort-compare': 'error',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/unified-signatures': 'warn'
      }
    },
    {
      files: ['**/*.cjs'],
      env: {
        node: true
      }
    },
    {
      extends: ['plugin:chai-expect/recommended', 'plugin:chai-friendly/recommended'],
      files: ['*.test.ts'],
      rules: {
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unused-expressions': 'off'
      }
    }
  ],
  rules: {
    'array-callback-return': 'error',
    'comma-dangle': 'off',
    'consistent-return': 'error',
    curly: 'off',
    'default-param-last': 'error',
    eqeqeq: 'error',
    'func-names': ['warn', 'never'],
    'import/extensions': [
      'error',
      'always',
      {
        ignorePackages: true,
        pattern: {
          js: 'always',
          ts: 'never'
        }
      }
    ],
    'import/no-duplicates': 'warn',
    'lit-a11y/click-events-have-key-events': 'off',
    'no-array-constructor': 'error',
    'no-bitwise': 'error',
    'no-constructor-return': 'error',
    'no-else-return': 'off',
    'no-empty-function': 'warn',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-floating-decimal': 'error',
    'no-implicit-coercion': 'off',
    'no-implicit-globals': 'error',
    'no-implied-eval': 'error',
    'no-invalid-this': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-multi-assign': 'warn',
    'no-new-func': 'error',
    'no-new-object': 'error',
    'no-new-wrappers': 'error',
    'no-new': 'error',
    'no-octal-escape': 'error',
    'no-proto': 'error',
    'no-restricted-imports': [
      'warn',
      {
        paths: [
          {
            name: '.',
            message: 'Usage of local index imports is not allowed.'
          },
          {
            name: './index',
            message: 'Import from the source file instead.'
          }
        ]
      }
    ],
    'no-return-assign': 'warn',
    'no-script-url': 'error',
    'no-self-compare': 'warn',
    'no-sequences': 'warn',
    'no-shadow': 'error',
    'no-template-curly-in-string': 'error',
    'no-throw-literal': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unused-expressions': 'warn',
    'no-useless-call': 'error',
    'no-useless-computed-key': 'warn',
    'no-useless-concat': 'error',
    'no-useless-rename': 'warn',
    'no-useless-return': 'warn',
    'no-var': 'error',
    'one-var': ['warn', 'never'],
    'operator-assignment': 'warn',
    'prefer-arrow-callback': 'warn',
    'prefer-const': 'warn',
    'prefer-numeric-literals': 'warn',
    'prefer-object-spread': 'warn',
    'prefer-promise-reject-errors': 'error',
    'prefer-rest-params': 'warn',
    'prefer-spread': 'warn',
    'prefer-template': 'off',
    radix: 'off',
    'require-await': 'error',
    'sort-imports-es6-autofix/sort-imports-es6': [
      2,
      {
        ignoreCase: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
      }
    ],
    'wc/guard-super-call': 'off'
  }
};

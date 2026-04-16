'use strict'

const neostandard = require('neostandard')

module.exports = [
  ...neostandard({
    ts: true
  }),
  {
    rules: {
      'comma-dangle': ['error', 'never'],
      'max-len': ['error', {
        code: 120,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
        ignoreComments: true,
        ignoreTrailingComments: true
      }]
    }
  }
]

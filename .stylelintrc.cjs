module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-idiomatic-order',
    'stylelint-config-recommended-vue/scss'
  ],
  plugins: [
    'stylelint-order',
    'stylelint-scss',
  ],
  rules: {
    'no-invalid-double-slash-comments': null,
    'import-notation': null,
    'string-quotes': 'single',
    "at-rule-no-unknown": [true, {
      "ignoreAtRules": ["function", "if", "each", "include", "mixin"]
    }]
  },
  overrides: [
    {
      files: ['*.vue', '**/*.vue'],
      "customSyntax": "postcss-html",
      rules: {
        'string-quotes': 'single',
        'selector-class-pattern': null,
        'no-descending-specificity': null,
        'custom-property-pattern': null,
        "at-rule-no-unknown": null,
        "scss/at-rule-no-unknown": true,
        "scss/dollar-variable-pattern": "\$",
        "scss/selector-no-redundant-nesting-selector": true,
      },
    },
  ],
}
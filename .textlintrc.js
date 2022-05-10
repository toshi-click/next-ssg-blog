/** @type {import('textlint/lib/config/config').Config */

const config = {
  filters: {},
  rules: {
    "ja-hiragana-fukushi": true,
    "ja-hiragana-hojodoushi": true,
    "ja-hiragana-keishikimeishi": true,
    "preset-ja-technical-writing": {
      "max": 200,
      "no-exclamation-question-mark": false,
      "max-kanji-continuous-len": {
        max: 10
      },
      "sentence-length": {
        max: 200
      },
    },
    "preset-ja-spacing": {
      "ja-space-between-half-and-full-width": {
        "space": "always"
      }
    },
    "spellcheck-tech-word": true,
  },
};

module.exports = config;

const postcss = require('postcss');

const pluginName = 'postcss-rem';
const functionName = 'rem';
const defaults = {
  baseline: 16,
  convert: 'rem',
  fallback: false
};

module.exports = postcss.plugin(pluginName, (opts = {}) => (root) => {
  const options = Object.assign({}, defaults, opts);
  const regexp = new RegExp('(?!\\W+)' + functionName + '\\(([^\(\)]+)\\)', 'g');

  const convert = (values, to) => values.replace(/(-?(?:\d+)?(?:\.?\d+)?)(rem|px)/g, (match, value, from) => {
    if (from === 'px' && to === 'rem') {
      return parseFloat(value) / options.baseline + to;
    }
    if (from === 'rem' && to === 'px') {
      return parseFloat(value) * options.baseline + to;
    }
    return match;
  });

  if (options.fallback && options.convert !== 'px') {
    root.walkDecls((decl) => {
      if (decl.value && decl.value.includes(functionName + '(')) {
        decl.cloneBefore({
          value: convert(decl.value.replace(regexp, '$1'), 'px')
        });
      }
    });
  }

  root.replaceValues(regexp, { fast: functionName + '(' }, (_, values) => convert(values, options.convert));
});

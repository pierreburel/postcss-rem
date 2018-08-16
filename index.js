const postcss = require('postcss');
const reduceFunctionCall = require('reduce-function-call');

const pluginName = 'postcss-rem';
const functionName = 'rem';
const defaults = {
  baseline: 16,
  convert: 'rem',
  fallback: false
};

module.exports = postcss.plugin(pluginName, (opts = {}) => (root) => {
  const options = Object.assign({}, defaults, opts);

  const convert = (values, to) => reduceFunctionCall(values, functionName, (values) => values.replace(/(-?(?:\d+)?(?:\.?\d+)?)(rem|px)/g, (match, value, from) => {
    if (from === 'px' && to === 'rem') {
      return parseFloat(value) / options.baseline + to;
    }
    if (from === 'rem' && to === 'px') {
      return parseFloat(value) * options.baseline + to;
    }
    return match;
  }));

  root.walkDecls((decl) => {
    if (decl.value && decl.value.includes(functionName + '(')) {
      if (options.fallback && options.convert !== 'px') {
        decl.cloneBefore({
          value: convert(decl.value, 'px')
        });
      }
      decl.value = convert(decl.value, options.convert);
    }
  });
});

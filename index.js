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

  const convert = (values, to) => values.replace(/(-?(?:\d+)?(?:\.?\d+)?)(rem|px)/g, (match, value, from) => {
    if (from === 'px' && to === 'rem') {
      return parseFloat(value) / options.baseline + 'rem';
    }
    if (from === 'rem' && to === 'px') {
      return parseFloat(value) * options.baseline + 'px';
    }
    return match;
  })

  root.walkDecls((decl) => {
    if (decl.value && decl.value.includes(functionName + '(')) {
      if (options.fallback && options.convert !== 'px') {
        decl.cloneBefore({
          value: reduceFunctionCall(decl.value, functionName, (values) => {
            return convert(values, 'px');
          })
        });
      }

      decl.value = reduceFunctionCall(decl.value, functionName, (values) => {
        return convert(values, options.convert);
      });
    }
  });
});

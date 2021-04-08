const pluginName = 'postcss-rem';
const functionName = 'rem';
const defaults = {
  baseline: 16,
  convert: 'rem',
  fallback: false,
  precision: 5
};

module.exports = (opts = {}) => {
  const options = {...defaults, ...opts};
  const regexp = new RegExp('(?!\\W+)' + functionName + '\\(([^\(\)]+)\\)', 'g');

  const rounded = (value, precision) => {
    precision = Math.pow(10, precision);
    return Math.floor(value * precision) / precision;
  };

  const convert = (values, to) => values.replace(/(\d*\.?\d+)(rem|px)/g, (match, value, from) => {
    if (from === 'px' && to === 'rem') {
      return rounded(parseFloat(value) / options.baseline, options.precision) + to;
    }
    if (from === 'rem' && to === 'px') {
      return rounded(parseFloat(value) * options.baseline, options.precision) + to;
    }
    return match;
  });

  return {
    postcssPlugin: pluginName,
    Once (root) {
      if (options.fallback && options.convert !== 'px') {
        root.walkDecls((decl) => {
          if (decl.value && decl.value.includes(functionName + '(')) {
            let values = decl.value.replace(regexp, '$1');
            decl.cloneBefore({
              value: convert(values, 'px')
            });
            decl.value = convert(values, 'rem');
          }
        });
      } else {
        root.replaceValues(regexp, { fast: functionName + '(' }, (_, values) => convert(values, options.convert));
      }
    }
  }
};

module.exports.postcss = true;

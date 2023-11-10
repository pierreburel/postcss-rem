const postcss = require('postcss');
const plugin = require('./');

async function run(input, output, options = {}) {
  const result = await postcss([plugin(options)]).process(input, { from: undefined })
  expect(result.css).toEqual(output);
  expect(result.warnings()).toHaveLength(0);
}

it('Simple', () => run(
  '.simple { font-size: rem-convert(24px); }',
  '.simple { font-size: 1.5rem; }'
));

it('Multiple values', () => run(
  '.multiple { padding: rem-convert(5px 10px); }',
  '.multiple { padding: 0.3125rem 0.625rem; }'
));

it('Multiple mixed values', () => run(
  '.mixed { border-bottom: rem-convert(1px solid black); }',
  '.mixed { border-bottom: 0.0625rem solid black; }'
));

it('Comma-separated values', () => run(
  '.comma { box-shadow: rem-convert(0 0 2px #ccc, inset 0 0 5px #eee); }',
  '.comma { box-shadow: 0 0 0.125rem #ccc, inset 0 0 0.3125rem #eee; }'
));

it('Alternate use', () => run(
  '.alternate { text-shadow: rem-convert(1px 1px) #eee, rem-convert(-1px) 0 #eee; }',
  '.alternate { text-shadow: 0.0625rem 0.0625rem #eee, -0.0625rem 0 #eee; }'
));

it('In function', () => run(
  '.function { font-size: calc(rem-convert(16px) + 3vw); }',
  '.function { font-size: calc(1rem + 3vw); }'
));

it('Pixel fallback', () => run(
  '.fallback { font-size: rem-convert(24px); margin: rem-convert(10px 1.5rem); }',
  '.fallback { font-size: 24px; font-size: 1.5rem; margin: 10px 24px; margin: 0.625rem 1.5rem; }',
  {
    fallback: true
  }
));

it('Convert to pixel', () => run(
  '.convert { font-size: rem-convert(24px); margin: rem-convert(10px 1.5rem); }',
  '.convert { font-size: 24px; margin: 10px 24px; }',
  {
    convert: 'px'
  }
));

it('Changing baseline', () => run(
  'html { font-size: 62.5%; } .baseline { font-size: rem-convert(24px); }',
  'html { font-size: 62.5%; } .baseline { font-size: 2.4rem; }',
  {
    baseline: 10
  }
));

it('Changing precision', () => run(
  '.precision { font-size: rem-convert(16px); }',
  '.precision { font-size: 1.333rem; }',
  {
    baseline: 12,
    precision: 3
  }
));

it('Changing function name', () => run(
  '.name { font-size: convert-rem(24px); }',
  '.name { font-size: 1.5rem; }',
  {
    name: 'convert-rem',
  }
));

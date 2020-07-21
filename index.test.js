const postcss = require('postcss');
const plugin = require('./');

function run(input, output, opts = {}) {
    return postcss([plugin(opts)]).process(input, { from: undefined })
        .then(result => {
            expect(result.css).toEqual(output);
            expect(result.warnings().length).toBe(0);
        });
}

// it('Simple', () => run(
//     '.simple { font-size: rem(24px); }',
//     '.simple { font-size: 1.5rem; }'
// ));

// it('Multiple values', () => run(
//     '.multiple { padding: rem(5px 10px); }',
//     '.multiple { padding: 0.3125rem 0.625rem; }'
// ));

// it('Multiple mixed values', () => run(
//     '.mixed { border-bottom: rem(1px solid black); }',
//     '.mixed { border-bottom: 0.0625rem solid black; }'
// ));

// it('Comma-separated values', () => run(
//     '.comma { box-shadow: rem(0 0 2px #ccc, inset 0 0 5px #eee); }',
//     '.comma { box-shadow: 0 0 0.125rem #ccc, inset 0 0 0.3125rem #eee; }'
// ));

// it('Alternate use', () => run(
//     '.alternate { text-shadow: rem(1px 1px) #eee, rem(-1px) 0 #eee; }',
//     '.alternate { text-shadow: 0.0625rem 0.0625rem #eee, -0.0625rem 0 #eee; }'
// ));

// it('In function', () => run(
//   '.function { font-size: calc(rem(16px) + 3vw); }',
//   '.function { font-size: calc(1rem + 3vw); }'
// ));

// it('Pixel fallback', () => run(
//     '.fallback { font-size: rem(24px); margin: rem(10px 1.5rem); }',
//     '.fallback { font-size: 24px; font-size: 1.5rem; margin: 10px 24px; margin: 0.625rem 1.5rem; }',
//     {
//         fallback: true
//     }
// ));

// it('Convert to pixel', () => run(
//     '.convert { font-size: rem(24px); margin: rem(10px 1.5rem); }',
//     '.convert { font-size: 24px; margin: 10px 24px; }',
//     {
//         convert: 'px'
//     }
// ));

// it('Changing baseline', () => run(
//     'html { font-size: 62.5%; } .baseline { font-size: rem(24px); }',
//     'html { font-size: 62.5%; } .baseline { font-size: 2.4rem; }',
//     {
//         baseline: 10
//     }
// ));

// it('Changing precision', () => run(
//     '.precision { font-size: rem(16px); }',
//     '.precision { font-size: 1.333rem; }',
//     {
//         baseline: 12,
//         precision: 3
//     }
// ));

it('Simple', () => run(
    '.simple { font-size: 24rem; }',
    '.simple { font-size: 1.5rem; }'
));

it('Multiple values', () => run(
    '.multiple { padding: 5rem 10rem; }',
    '.multiple { padding: 0.3125rem 0.625rem; }'
));

it('Multiple mixed values', () => run(
    '.mixed { border-bottom: 1rem solid black; }',
    '.mixed { border-bottom: 0.0625rem solid black; }'
));

it('Comma-separated values', () => run(
    '.comma { box-shadow: 0 0 2rem #ccc, inset 0 0 5rem #eee; }',
    '.comma { box-shadow: 0 0 0.125rem #ccc, inset 0 0 0.3125rem #eee; }'
));

it('Alternate use', () => run(
    '.alternate { text-shadow: 1rem 1rem #eee, -1rem 0 #eee; }',
    '.alternate { text-shadow: 0.0625rem 0.0625rem #eee, -0.0625rem 0 #eee; }'
));

it('In function', () => run(
    '.function { font-size: calc(16rem + 3vw); }',
    '.function { font-size: calc(1rem + 3vw); }'
));

it('Pixel fallback', () => run(
    '.fallback { font-size: 24rem; margin: 10rem 1.5rem; }',
    '.fallback { font-size: 24px; font-size: 1.5rem; margin: 10px 24px; margin: 0.625rem 1.5rem; }',
    {
        fallback: true
    }
));

it('Convert to pixel', () => run(
    '.convert { font-size: 24rem; margin: 10rem 1.5rem; }',
    '.convert { font-size: 24px; margin: 10px 24px; }',
    {
        convert: 'px'
    }
));

it('Changing baseline', () => run(
    'html { font-size: 62.5%; } .baseline { font-size: 24rem; }',
    'html { font-size: 62.5%; } .baseline { font-size: 2.4rem; }',
    {
        baseline: 10
    }
));

it('Changing precision', () => run(
    '.precision { font-size: 16rem; }',
    '.precision { font-size: 1.333rem; }',
    {
        baseline: 12,
        precision: 3
    }
));
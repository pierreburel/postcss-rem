# postcss-rem [![Node.js CI](https://github.com/pierreburel/postcss-rem/actions/workflows/node.js.yml/badge.svg)](https://github.com/pierreburel/postcss-rem/actions/workflows/node.js.yml)

[PostCSS] plugin to use rem units with optional pixel fallback. Based on [sass-rem](https://github.com/pierreburel/sass-rem).

See also: [startijenn-rem](https://github.com/pierreburel/startijenn-rem), vanilla JavaScript version.

[postcss]: https://github.com/postcss/postcss

## Example

### Input

```scss
.demo {
  font-size: rem(24px); /* Simple */
  padding: rem(5px 10px); /* Multiple values */
  margin: rem(10px 0.5rem); /* Existing rem */
  border-bottom: rem(1px solid black); /* Multiple mixed values */
  box-shadow: rem(
    0 0 2px #ccc,
    inset 0 0 5px #eee
  ); /* Comma-separated values */
  text-shadow: rem(1px 1px) #eee, rem(-1px) 0 #eee; /* Alternate use */
}
```

### Output

```css
.demo {
  font-size: 1.5rem; /* Simple */
  padding: 0.3125rem 0.625rem; /* Multiple values */
  margin: 0.625rem 0.5rem; /* Existing rem */
  border-bottom: 0.0625rem solid black; /* Multiple mixed values */
  box-shadow: 0 0 0.125rem #ccc, inset 0 0 0.3125rem #eee; /* Comma-separated values */
  text-shadow: 0.0625rem 0.0625rem #eee, -0.0625rem 0 #eee; /* Alternate use */
}
```

## Options

With `baseline` to `10` (`html { font-size: 62.5%; }`) and `fallback` to `true`:

```css
.demo {
  font-size: 24px;
  font-size: 2.4rem; /* Simple */
  padding: 5px 10px;
  padding: 0.5rem 1rem; /* Multiple values */
  margin: 10px 5px;
  margin: 1rem 0.5rem; /* Existing rem */
  border-bottom: 1px solid black;
  border-bottom: 0.1rem solid black; /* Multiple mixed values */
  box-shadow: 0 0 2px #ccc, inset 0 0 5px #eee;
  box-shadow: 0 0 0.2rem #ccc, inset 0 0 0.5rem #eee; /* Comma-separated values */
  text-shadow: 1px 1px #eee, -1px 0 #eee;
  text-shadow: 0.1rem 0.1rem #eee, -0.1rem 0 #eee; /* Alternate use */
}
```

With `convert` to `px` (for a lt-ie9 only stylesheet for example):

```css
.demo {
  font-size: 24px; /* Simple */
  padding: 5px 10px; /* Multiple values */
  margin: 10px 8px; /* Existing rem */
  border-bottom: 1px solid black; /* Multiple mixed values */
  box-shadow: 0 0 2px #ccc, inset 0 0 5px #eee; /* Comma-separated values */
  text-shadow: 1px 1px #eee, -1px 0 #eee; /* Alternate use */
}
```

## Usage

Install with `npm i postcss-rem` and use with [PostCSS]:

```js
postcss([require("postcss-rem")]);
```

Example with custom options:

```js
postcss([
  require("postcss-rem")({
    name: "to-rem", // Default to 'rem'
    baseline: 10, // Default to 16
    // convert: "px", // Default to 'rem'
    fallback: true, // Default to false
    precision: 6, // Default to 5
  }),
]);
```

See [PostCSS] docs for examples for your environment.

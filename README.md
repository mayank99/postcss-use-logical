# postcss-use-logical

PostCSS plugin that essentially does the opposite of [`postcss-logical`](https://www.npmjs.com/package/postcss-logical); it converts physical CSS properties into their logical equivalents.

Check out demo/playground at: https://logical.mynk.app/

## Usage

This plugin is designed to be run as a one-off script for migrating entire codebases from physical properties to logical ones. It probably should *not* be added to your project's regular PostCSS config.

```
npm install postcss postcss-use-logical
```

```js
import postcss from 'postcss';
import postcssUseLogical from 'postcss-use-logical';

postcss([postcssUseLogical]).process(/* ... */);
```

> **Note**
> This plugin will convert _all_ physical properties, which may not always be desirable. Always verify the changes manually.

## Example

Input:

```css
.element {
  height: 100px;
  max-width: 400px;
  width: 200px;
  padding-top: 10px;
  padding-bottom: 20px;
  margin: 0 auto;
}
```

Output:

```css
.element {
  block-size: 100px;
  max-inline-size: 400px;
  inline-size: 200px;
  padding-block: 10px 20px;
  margin-block: 0;
  margin-inline: auto;
}
```

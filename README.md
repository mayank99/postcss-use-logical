# postcss-use-logical

PostCSS plugin that essentially does the opposite of [`postcss-logical`](https://www.npmjs.com/package/postcss-logical); it converts physical CSS properties into their logical equivalents.

## Usage

```
npm add postcss-use-logical
```

```js
import postcssUseLogical from 'postcss-use-logical';
// ...
postcss.plugins([postcssUseLogical]).process(/* ... */);
```

## Example

Input:

```css
.element {
	height: 100px;
	max-width: 400px;
	width: 200px;
	padding-top: 10px;
	padding-bottom: 20px;
	margin-left: 0 auto;
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

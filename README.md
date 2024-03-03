# kjua-revived

Kjua Revived is a updated version of the popular [kjua](https://github.com/lrsjng/kjua) QR Code library.

# Examples & Usage

## Bundler

If you're using a bundler like vite your first step is to install the package:

```bash
npm install kjua-revived -D
```

Next we can consume it from a script with access to browser APIs:

```ts
import { kjua } from 'kjua-revived';

const container = document.createElement('div');

const qr = kjua('https://willow.sh');

container.appendChild(qr);
document.body.appendChild(container);
```

Kjua will return one of the following elements: `SVGElement`, `HTMLCanvasElement`, or `HTMLImageElement` depending on your render method.

## Module Script

To use in a regular browser environment you can use a module script:

```html
<script type="module">
	import { kjua } from 'https://cdn.jsdelivr.net/npm/kjua-revived@0/+esm';

	const container = document.createElement('div');

	const qr = kjua('https://willow.sh');

	container.appendChild(qr);
	document.body.appendChild(container);
</script>
```

Try pasting this into a html file and running it, or checkout this [jsfiddle](https://jsfiddle.net/7ohenpqb/)!

# Options

TBD

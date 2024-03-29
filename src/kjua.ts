import {
	defaultOptions,
	type KjuaOptions,
	type KjuaInputOptions,
} from './lib/options';
import create_canvas_qrcode from './lib/create_canvas_qrcode';
import create_svg_qrcode from './lib/create_svg_qrcode';
import qrcode from './lib/qrcode';
import { create_el } from './lib/dom';

export function kjua(
	text: string,
	inputOptions: KjuaInputOptions & { render: 'svg' },
): SVGElement;

export function kjua(
	text: string,
	inputOptions: KjuaInputOptions & { render: 'canvas' },
): HTMLCanvasElement;

export function kjua(
	text: string,
	inputOptions: KjuaInputOptions & { render: 'image' },
): HTMLImageElement;

export function kjua(
	text: string,
	inputOptions: KjuaInputOptions,
): SVGElement | HTMLCanvasElement | HTMLImageElement {
	const options: KjuaOptions = {
		...defaultOptions,
		...inputOptions,
		image:
			typeof inputOptions.image == 'string'
				? create_el('img', {
						src: inputOptions.image,
						// todo this won't apply to use provided images so should refactor
						crossorigin: 'anonymous',
				  })
				: inputOptions.image,
	};

	// todo refactor to use this structure everywhere and maybe remove KjuaInputOptions
	const qr = qrcode(
		text,
		options.ecLevel,
		options.minVersion,
		options.quiet,
	)!;

	if (options.render === 'svg') {
		return create_svg_qrcode(qr, options);
	}
	return create_canvas_qrcode(qr, options, options.render === 'image');
}

export type {
	KjuaOptions,
	KjuaInputOptions,
	ErrorCorrectionLevel,
} from './lib/options';

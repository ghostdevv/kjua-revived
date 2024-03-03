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
	inputOptions: KjuaInputOptions,
): SVGElement | HTMLCanvasElement | HTMLImageElement {
	const options: KjuaOptions = {
		...defaultOptions,
		...inputOptions,
		image:
			typeof inputOptions.image == 'string'
				? create_el('img', { src: inputOptions.image })
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

export type { KjuaOptions, ErrorCorrectionLevel } from './lib/options';

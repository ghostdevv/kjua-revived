import { defaultOptions, type KjuaOptions } from './lib/options';
import create_canvas_qrcode from './lib/create_canvas_qrcode';
import create_svg_qrcode from './lib/create_svg_qrcode';
import qrcode from './lib/qrcode';

export const kjua = (
	inputOptions: Partial<KjuaOptions>,
): SVGElement | HTMLCanvasElement | HTMLImageElement => {
	const options: KjuaOptions = { ...defaultOptions, ...inputOptions };

	const qr = qrcode(
		options.text,
		options.ecLevel,
		options.minVersion,
		options.quiet,
	)!;

	if (options.render === 'svg') {
		return create_svg_qrcode(qr, options);
	}
	return create_canvas_qrcode(qr, options, options.render === 'image');
};

export type { KjuaOptions, ErrorCorrectionLevel } from './lib/options';

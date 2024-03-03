import type { KjuaOptions } from './options';
import type { QRCode } from './qrcode';

import draw_module_rounded from './draw_rounded';
import draw_mode from './draw_mode';
import * as dom from './dom';

const draw_background = (
	ctx: CanvasRenderingContext2D,
	settings: KjuaOptions,
) => {
	if (settings.back) {
		ctx.fillStyle = settings.back;
		ctx.fillRect(0, 0, settings.size, settings.size);
	}
};

const draw_module_default = (
	qr: QRCode,
	ctx: CanvasRenderingContext2D,
	settings: KjuaOptions,
	width: number,
	row: number,
	col: number,
) => {
	if (qr.is_dark(row, col)) {
		ctx.rect(col * width, row * width, width, width);
	}
};

const draw_modules = (
	qr: QRCode,
	ctx: CanvasRenderingContext2D,
	settings: KjuaOptions,
) => {
	if (!qr) {
		return;
	}

	const draw_module =
		settings.rounded > 0 && settings.rounded <= 100
			? draw_module_rounded
			: draw_module_default;
	const mod_count = qr.module_count;

	let mod_size = settings.size / mod_count;
	let offset = 0;
	if (settings.crisp) {
		mod_size = Math.floor(mod_size);
		offset = Math.floor((settings.size - mod_size * mod_count) / 2);
	}

	ctx.translate(offset, offset);
	ctx.beginPath();
	for (let row = 0; row < mod_count; row += 1) {
		for (let col = 0; col < mod_count; col += 1) {
			draw_module(qr, ctx, settings, mod_size, row, col);
		}
	}
	ctx.fillStyle = settings.fill;
	ctx.fill();
	ctx.translate(-offset, -offset);
};

const draw = (
	qr: QRCode,
	ctx: CanvasRenderingContext2D,
	settings: KjuaOptions,
) => {
	draw_background(ctx, settings);
	draw_modules(qr, ctx, settings);
	draw_mode(ctx, settings);
};

const create_canvas_qrcode = (
	qr: QRCode,
	settings: KjuaOptions,
	as_image: boolean,
) => {
	const ratio = settings.ratio || dom.getDPR();
	const canvas = dom.create_canvas(settings.size, ratio);
	const context = canvas.getContext('2d')!;

	context.scale(ratio, ratio);
	draw(qr, context, settings);
	return as_image ? dom.canvas_to_img(canvas) : canvas;
};

export default create_canvas_qrcode;

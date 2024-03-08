import type { KjuaOptions } from './options';

const draw_label = (ctx: CanvasRenderingContext2D, settings: KjuaOptions) => {
	const size = settings.size;
	const font =
		'bold ' + settings.mSize * 0.01 * size + 'px ' + settings.fontname;

	ctx.strokeStyle = settings.back;
	ctx.lineWidth = settings.mSize * 0.01 * size * 0.1;
	ctx.fillStyle = settings.fontcolor;
	ctx.font = font;

	const w = ctx.measureText(settings.label).width;
	const sh = settings.mSize * 0.01;
	const sw = w / size;
	const sl = (1 - sw) * settings.mPosX * 0.01;
	const st = (1 - sh) * settings.mPosY * 0.01;
	const x = sl * size;
	const y = st * size + 0.75 * settings.mSize * 0.01 * size;

	ctx.strokeText(settings.label, x, y);
	ctx.fillText(settings.label, x, y);
};

const draw_image = (ctx: CanvasRenderingContext2D, settings: KjuaOptions) => {
	// todo better error handle
	if (!settings.image) return;

	const size = settings.size;
	const w = settings.image!.naturalWidth || 1;
	const h = settings.image!.naturalHeight || 1;
	const sh = settings.mSize * 0.01;
	const sw = (sh * w) / h;
	const sl = (1 - sw) * settings.mPosX * 0.01;
	const st = (1 - sh) * settings.mPosY * 0.01;
	const x = sl * size;
	const y = st * size;
	const iw = sw * size;
	const ih = sh * size;

	// make sure image has loaded before drawing
	if (settings.image.complete) {
		ctx.drawImage(settings.image!, x, y, iw, ih);
	} else {
		settings.image.onload = () => {
			ctx.drawImage(settings.image!, x, y, iw, ih);
		};
	}
};

const draw_mode = (ctx: CanvasRenderingContext2D, settings: KjuaOptions) => {
	const mode = settings.mode;
	if (mode === 'label') {
		draw_label(ctx, settings);
	} else if (mode === 'image') {
		draw_image(ctx, settings);
	}
};

export default draw_mode;

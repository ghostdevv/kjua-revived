import { SVG_NS, get_attr, create_svg_el, getDPR, create_canvas } from './dom';
import type { KjuaOptions } from './options';
import type { QRCode } from './qrcode';

const create_draw_ctx = (ctx: { p: string; o: number }) => {
	const rnd = (x: number) => Math.round(x * 10) / 10;
	const rndo = (x: number) => Math.round(x * 10) / 10 + ctx.o;
	return {
		m(x: number, y: number) {
			ctx.p += `M ${rndo(x)} ${rndo(y)} `;
			return this;
		},
		l(x: number, y: number) {
			ctx.p += `L ${rndo(x)} ${rndo(y)} `;
			return this;
		},
		a(x: number, y: number, rad: number) {
			ctx.p += `A ${rnd(rad)} ${rnd(rad)} 0 0 1 ${rndo(x)} ${rndo(y)} `;
			return this;
		},
	};
};

type DrawCtx = ReturnType<typeof create_draw_ctx>;

const draw_dark = (
	ctx: DrawCtx,
	l: number,
	t: number,
	r: number,
	b: number,
	rad: number,
	nw: boolean,
	ne: boolean,
	se: boolean,
	sw: boolean,
) => {
	if (nw) {
		ctx.m(l + rad, t);
	} else {
		ctx.m(l, t);
	}

	if (ne) {
		ctx.l(r - rad, t).a(r, t + rad, rad);
	} else {
		ctx.l(r, t);
	}

	if (se) {
		ctx.l(r, b - rad).a(r - rad, b, rad);
	} else {
		ctx.l(r, b);
	}

	if (sw) {
		ctx.l(l + rad, b).a(l, b - rad, rad);
	} else {
		ctx.l(l, b);
	}

	if (nw) {
		ctx.l(l, t + rad).a(l + rad, t, rad);
	} else {
		ctx.l(l, t);
	}
};

const draw_light = (
	ctx: DrawCtx,
	l: number,
	t: number,
	r: number,
	b: number,
	rad: number,
	nw: boolean,
	ne: boolean,
	se: boolean,
	sw: boolean,
) => {
	if (nw) {
		ctx.m(l + rad, t)
			.l(l, t)
			.l(l, t + rad)
			.a(l + rad, t, rad);
	}

	if (ne) {
		ctx.m(r, t + rad)
			.l(r, t)
			.l(r - rad, t)
			.a(r, t + rad, rad);
	}

	if (se) {
		ctx.m(r - rad, b)
			.l(r, b)
			.l(r, b - rad)
			.a(r - rad, b, rad);
	}

	if (sw) {
		ctx.m(l, b - rad)
			.l(l, b)
			.l(l + rad, b)
			.a(l, b - rad, rad);
	}
};

const draw_mod = (
	qr: QRCode,
	ctx: DrawCtx,
	options: KjuaOptions,
	width: number,
	row: number,
	col: number,
) => {
	const left = col * width;
	const top = row * width;
	const right = left + width;
	const bottom = top + width;
	const radius = options.rounded * 0.005 * width;

	const is_dark = qr.is_dark;
	const row_n = row - 1;
	const row_s = row + 1;
	const col_w = col - 1;
	const col_e = col + 1;
	const dark_center = is_dark(row, col);
	const dark_nw = is_dark(row_n, col_w);
	const dark_n = is_dark(row_n, col);
	const dark_ne = is_dark(row_n, col_e);
	const dark_e = is_dark(row, col_e);
	const dark_se = is_dark(row_s, col_e);
	const dark_s = is_dark(row_s, col);
	const dark_sw = is_dark(row_s, col_w);
	const dark_w = is_dark(row, col_w);

	if (dark_center) {
		draw_dark(
			ctx,
			left,
			top,
			right,
			bottom,
			radius,
			!dark_n && !dark_w,
			!dark_n && !dark_e,
			!dark_s && !dark_e,
			!dark_s && !dark_w,
		);
	} else {
		draw_light(
			ctx,
			left,
			top,
			right,
			bottom,
			radius,
			dark_n && dark_w && dark_nw,
			dark_n && dark_e && dark_ne,
			dark_s && dark_e && dark_se,
			dark_s && dark_w && dark_sw,
		);
	}
};

const create_path = (qr: QRCode, options: KjuaOptions) => {
	if (!qr) {
		return '';
	}

	const ctx = { p: '', o: 0 };
	const mod_count = qr.module_count;
	let mod_size = options.size / mod_count;
	if (options.crisp) {
		mod_size = Math.floor(mod_size);
		ctx.o = Math.floor((options.size - mod_size * mod_count) / 2);
	}

	const draw_ctx = create_draw_ctx(ctx);
	for (let row = 0; row < mod_count; row += 1) {
		for (let col = 0; col < mod_count; col += 1) {
			draw_mod(qr, draw_ctx, options, mod_size, row, col);
		}
	}

	return ctx.p;
};

const add_label = (el: SVGElement, options: KjuaOptions) => {
	const size = options.size;
	const font =
		'bold ' + options.mSize * 0.01 * size + 'px ' + options.fontname;

	const ratio = options.ratio || getDPR();
	const ctx = create_canvas(size, ratio).getContext('2d')!;
	ctx.strokeStyle = options.back;
	ctx.lineWidth = options.mSize * 0.01 * size * 0.1;
	ctx.fillStyle = options.fontcolor;
	ctx.font = font;
	const w = ctx.measureText(options.label).width;

	const sh = options.mSize * 0.01;
	const sw = w / size;
	const sl = (1 - sw) * options.mPosX * 0.01;
	const st = (1 - sh) * options.mPosY * 0.01;
	const x = sl * size;
	const y = st * size + 0.75 * options.mSize * 0.01 * size;

	const text_el = create_svg_el('text', {
		x,
		y,
	});
	Object.assign(text_el.style, {
		font,
		fill: options.fontcolor,
		'paint-order': 'stroke',
		stroke: options.back,
		'stroke-width': ctx.lineWidth,
	});

	text_el.textContent = options.label;
	el.appendChild(text_el);
};

const add_image = (el: SVGElement, options: KjuaOptions) => {
	if (!options.image) {
		console.error('kjua: image is enabled but none given');
		return;
	}

	const size = options.size;
	const w = options.image.naturalWidth || 1;
	const h = options.image.naturalHeight || 1;
	const sh = options.mSize * 0.01;
	const sw = (sh * w) / h;
	const sl = (1 - sw) * options.mPosX * 0.01;
	const st = (1 - sh) * options.mPosY * 0.01;
	const x = sl * size;
	const y = st * size;
	const iw = sw * size;
	const ih = sh * size;

	const img_el = create_svg_el('image', {
		href: get_attr(options.image, 'src'),
		x,
		y,
		width: iw,
		height: ih,
	});

	el.appendChild(img_el);
};

const create_svg_qrcode = (qr: QRCode, options: KjuaOptions) => {
	const size = options.size;
	const mode = options.mode;

	const svg_el = create_svg_el('svg', {
		xmlns: SVG_NS,
		width: size,
		height: size,
		viewBox: `0 0 ${size} ${size}`,
	});
	svg_el.style.width = `${size}px`;
	svg_el.style.height = `${size}px`;

	if (options.back) {
		svg_el.appendChild(
			create_svg_el('rect', {
				x: 0,
				y: 0,
				width: size,
				height: size,
				fill: options.back,
			}),
		);
	}

	svg_el.appendChild(
		create_svg_el('path', {
			d: create_path(qr, options),
			fill: options.fill,
		}),
	);

	if (mode === 'label') {
		add_label(svg_el, options);
	} else if (mode === 'image') {
		add_image(svg_el, options);
	}

	return svg_el;
};

export default create_svg_qrcode;

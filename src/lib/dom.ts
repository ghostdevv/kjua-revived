export const SVG_NS = 'http://www.w3.org/2000/svg';

export function getDPR() {
	// todo is there a case where this will be falsy?
	return window.devicePixelRatio || 1;
}

export const get_attr = (el: HTMLElement | SVGElement, key: string) =>
	el.getAttribute(key);

export const set_attrs = <T extends HTMLElement | SVGElement>(
	el: T,
	obj: Record<string, any>,
) => {
	Object.keys(obj || {}).forEach((key) => {
		el.setAttribute(key, obj[key]);
	});

	return el;
};

export const create_el = <T extends keyof HTMLElementTagNameMap>(
	name: T,
	obj: Record<string, any>,
) => set_attrs(document.createElement<T>(name), obj);

export const create_svg_el = (
	name: string,
	obj: Record<string, any>,
): SVGElement => set_attrs(document.createElementNS(SVG_NS, name), obj);

export const create_canvas = (size: number, ratio: number) => {
	const canvas = create_el('canvas', {
		width: size * ratio,
		height: size * ratio,
	});
	canvas.style.width = `${size}px`;
	canvas.style.height = `${size}px`;
	return canvas;
};

export const canvas_to_img = (canvas: HTMLCanvasElement) => {
	const img = create_el('img', {
		crossOrigin: 'anonymous',
		src: canvas.toDataURL('image/png'),
		width: get_attr(canvas, 'width'),
		height: get_attr(canvas, 'height'),
	});
	img.style.width = canvas.style.width;
	img.style.height = canvas.style.height;
	return img;
};

/**
 * Options passed into the main kjua function. Everything is optional here.
 */
export type KjuaInputOptions = Omit<Partial<KjuaOptions>, 'image'> & {
	/**
	 * The image to display on the qr code when `mode` is set to `image`.
	 * When a string is passed it supports anything that can be handled by an `<img>` element
	 */
	image?: string | HTMLImageElement;
};

/**
 * Level of error correction on the QR Code
 */
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

/**
 * Main kjua options after defaults have been applied, most fields are required here.
 */
export interface KjuaOptions {
	/**
	 * The method used to render the QR Code
	 * @default 'image''
	 */
	render: 'canvas' | 'image' | 'svg';

	/**
	 * Whether the lines should be rendered pixel perfect
	 * @default true
	 */
	crisp: boolean;

	/**
	 * The minimum qr code version the kjua should use
	 * @default 1
	 */
	minVersion: number;

	/**
	 * Level of error correction on the QR Code
	 * @default 'L'
	 */
	ecLevel: ErrorCorrectionLevel;

	/**
	 * Size of the svg/canvas/image in pixels
	 * @default 200
	 */
	size: number;

	/**
	 * Pixel ratio, defaults to the device pixel ration
	 * @default window.devicePixelRatio
	 */
	ratio?: number;

	/**
	 * The colour of the qr code
	 * @default '#333333'
	 */
	fill: string;

	/**
	 * The background colour of the qr code
	 * @default '#ffffff'
	 */
	back: string;

	/**
	 * How round the pixels should be
	 * @default 0
	 */
	rounded: number;

	/**
	 * The margin/space around the qrcode
	 * @default 0
	 */
	quiet: number;

	/**
	 * What decoration should be rendered in the center of the qr code
	 * @default 'plain'
	 */
	mode: 'plain' | 'label' | 'image';

	/**
	 * Label/image size
	 * @default 30
	 */
	mSize: number;

	/**
	 * Label/image x position
	 * @default 50
	 */
	mPosX: number;

	/**
	 * Label/image y position
	 * @default 50
	 */
	mPosY: number;

	/**
	 * The label to display on the qr code when `mode` is set to `label`
	 */
	label?: string;

	/**
	 * The font for the label
	 * @default 'sans'
	 */
	fontname: string;

	/**
	 * The colour of the font for the label
	 * @default '#333333'
	 */
	fontcolor: string;

	/**
	 * The image to display on the qr code when `mode` is set to `image`
	 */
	image?: HTMLImageElement;
}

export const defaultOptions: KjuaOptions = {
	render: 'image',

	crisp: true,

	minVersion: 1,

	ecLevel: 'L',

	size: 200,

	fill: '#333',

	back: '#fff',

	rounded: 0,

	quiet: 0,

	mode: 'plain',

	mSize: 30,
	mPosX: 50,
	mPosY: 50,

	fontname: 'sans',
	fontcolor: '#333',
};

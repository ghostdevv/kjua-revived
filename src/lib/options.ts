// todo doc comments

export type KjuaInputOptions = Omit<Partial<KjuaOptions>, 'image'> & {
	image?: string | HTMLImageElement;
};

export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface KjuaOptions {
	// render method: 'canvas', 'image' or 'svg'
	render: 'canvas' | 'image' | 'svg';

	// render pixel-perfect lines
	crisp: boolean;

	// minimum version: 1..40
	minVersion: number;

	// error correction level: 'L', 'M', 'Q' or 'H'
	ecLevel: ErrorCorrectionLevel;

	// size in pixel
	size: number;

	// pixel-ratio, null for devicePixelRatio
	ratio?: number;

	// code color
	fill: string;

	// background color
	back: string;

	// roundend corners in pc: 0..100
	rounded: number;

	// quiet zone in modules
	quiet: number;

	// modes: 'plain', 'label' or 'image'
	mode: 'plain' | 'label' | 'image';

	// label/image size and pos in pc: 0..100
	mSize: number;
	mPosX: number;
	mPosY: number;

	// label
	label?: string;
	fontname: string;
	fontcolor: string;

	// image element
	image?: HTMLImageElement;
}

export const defaultOptions: KjuaOptions = {
	// render method: 'canvas', 'image' or 'svg'
	render: 'image',

	// render pixel-perfect lines
	crisp: true,

	// minimum version: 1..40
	minVersion: 1,

	// error correction level: 'L', 'M', 'Q' or 'H'
	ecLevel: 'L',

	// size in pixel
	size: 200,

	// code color
	fill: '#333',

	// background color
	back: '#fff',

	// roundend corners in pc: 0..100
	rounded: 0,

	// quiet zone in modules
	quiet: 0,

	// modes: 'plain', 'label' or 'image'
	mode: 'plain',

	// label/image size and pos in pc: 0..100
	mSize: 30,
	mPosX: 50,
	mPosY: 50,

	// label
	fontname: 'sans',
	fontcolor: '#333',
};

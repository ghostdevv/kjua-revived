type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';
interface KjuaOptions {
    render: 'canvas' | 'image' | 'svg';
    crisp: boolean;
    minVersion: number;
    ecLevel: ErrorCorrectionLevel;
    size: number;
    ratio: number | null;
    fill: string;
    back: string;
    text: string;
    rounded: number;
    quiet: number;
    mode: 'plain' | 'label' | 'image';
    mSize: number;
    mPosX: number;
    mPosY: number;
    label: string;
    fontname: string;
    fontcolor: string;
    image: HTMLImageElement | null;
}

declare const kjua: (inputOptions: Partial<KjuaOptions>) => SVGElement | HTMLCanvasElement | HTMLImageElement;

export { type ErrorCorrectionLevel, type KjuaOptions, kjua };

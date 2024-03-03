import type { ErrorCorrectionLevel } from './options';
import * as qr_gen from 'qrcode-generator';

const RE_CODE_LENGTH_OVERFLOW = /code length overflow/i;

const min_qrcode = (text: string, level: ErrorCorrectionLevel, min_ver = 1) => {
	min_ver = Math.max(1, min_ver);

	for (let version = min_ver; version <= 40; version += 1) {
		try {
			// @ts-ignore todo fix this version type
			const qr = qr_gen.default(version, level);
			qr.addData(text);
			qr.make();

			const module_count = qr.getModuleCount();

			const is_dark = (row: number, col: number) => {
				return (
					row >= 0 &&
					row < module_count &&
					col >= 0 &&
					col < module_count &&
					qr.isDark(row, col)
				);
			};

			return { text, level, version, module_count, is_dark };
		} catch (err) {
			if (!(version < 40 && RE_CODE_LENGTH_OVERFLOW.test(err as any))) {
				throw new Error(err as any);
			}
		}
	}
	return null;
};

const quiet_qrcode = (
	text = '',
	level: ErrorCorrectionLevel = 'L',
	min_ver = 1,
	quiet = 0,
) => {
	const qr = min_qrcode(text, level, min_ver);

	if (qr) {
		const prev_is_dark = qr.is_dark;
		qr.module_count += 2 * quiet;
		qr.is_dark = (row, col) => prev_is_dark(row - quiet, col - quiet);
	}

	return qr;
};

export type QRCode = Exclude<ReturnType<typeof quiet_qrcode>, null>;

export default quiet_qrcode;

// One-off generator for favicons, app icons, and the Open Graph share image.
// Run with: node scripts/generate-seo-assets.mjs
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { writeFile } from 'node:fs/promises';

const BRAND_BLUE = '#004aad';
const LOGO = 'public/media/logoChanchoLechon3.webp';
const OG_SOURCE = 'public/media/img/img10.jpg';

async function squareIcon(size, outPath) {
	await sharp(LOGO)
		.resize(Math.round(size * 0.8), Math.round(size * 0.8), { fit: 'contain', background: BRAND_BLUE })
		.extend({
			top: Math.round(size * 0.1),
			bottom: Math.round(size * 0.1),
			left: Math.round(size * 0.1),
			right: Math.round(size * 0.1),
			background: BRAND_BLUE,
		})
		.resize(size, size)
		.png()
		.toFile(outPath);
	console.log('wrote', outPath, `${size}x${size}`);
}

async function main() {
	await squareIcon(16, 'public/favicon-16x16.png');
	await squareIcon(32, 'public/favicon-32x32.png');
	await squareIcon(48, 'public/favicon-48x48.png');
	await squareIcon(180, 'public/apple-touch-icon.png');
	await squareIcon(192, 'public/android-chrome-192x192.png');
	await squareIcon(512, 'public/android-chrome-512x512.png');

	const icoBuffer = await pngToIco([
		'public/favicon-16x16.png',
		'public/favicon-32x32.png',
		'public/favicon-48x48.png',
	]);
	await writeFile('public/favicon.ico', icoBuffer);
	console.log('wrote public/favicon.ico (multi-size)');

	// Open Graph / Twitter share image: 1200x630, cover-cropped from the
	// bento's centerpiece lechona photo (appetizing, on-brand, high-res).
	await sharp(OG_SOURCE).resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 85 }).toFile('public/og-image.jpg');
	console.log('wrote public/og-image.jpg 1200x630');
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});

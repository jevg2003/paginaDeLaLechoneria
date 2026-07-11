// One-off generator for favicons, app icons, and the Open Graph share image.
// Run with: node scripts/generate-seo-assets.mjs
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { writeFile } from 'node:fs/promises';

const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };
// Higher-res, cleanly-cut mascot art (no background baked in) — used only
// for the generated icon/favicon set below.
const LOGO = 'public/media/logo-mascota-sin-fondo.webp';
const OG_SOURCE = 'public/media/img/img10.jpg';

// Just the pig mascot, no background square — the logo's own alpha channel
// (it's already a cutout) does the work.
async function squareIcon(size, outPath) {
	await sharp(LOGO)
		.resize(size, size, { fit: 'contain', background: TRANSPARENT })
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

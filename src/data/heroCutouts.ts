import type { ImageMetadata } from 'astro';
import cajasImg from '../assets/images/racion-cojin-hero-hd.webp';
import lechonaAbierta from '../assets/images/lechona-abierta-cutout.png';
import pernil from '../assets/images/pernil-cutout.png';
import lechonaMixta from '../assets/images/lechona-mixta-cutout.png';
import cojin from '../assets/images/cojin-cutout.png';
import cerditoCuero from '../assets/images/pendiente-decorativo-cerdo-cuero.png';

export interface HeroCutout {
	src: ImageMetadata;
	alt: string;
	/** Framed slides get a rounded card treatment instead of a free cutout. */
	framed: boolean;
	zoom: number;
}

// The hero's rotating carousel — order matters (it's the rotation order).
export const heroCutouts: HeroCutout[] = [
	{ src: lechonaAbierta, alt: 'Lechona abierta, Chancho el Lechón', framed: false, zoom: 1.25 },
	{ src: lechonaMixta, alt: 'Lechona mixta, Chancho el Lechón', framed: false, zoom: 1 },
	{ src: cojin, alt: 'Cojín de lechona, Chancho el Lechón', framed: false, zoom: 1.3 },
	{ src: pernil, alt: 'Pernil de lechona, Chancho el Lechón', framed: false, zoom: 1.15 },
	{ src: cerditoCuero, alt: 'Chancho el Lechón', framed: false, zoom: 1.1 },
	{ src: cajasImg, alt: 'Cajas de lechona listas para entrega, Chancho el Lechón', framed: true, zoom: 0.92 },
];

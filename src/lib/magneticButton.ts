import gsap from 'gsap';

interface MagneticButtonOptions {
	/** How strongly the button itself chases the cursor (0–1). */
	btnStrength?: number;
	/** How strongly the inner label chases the cursor, layered on top of the
	 * button's own movement for a "liquid" depth feel (0–1). */
	labelStrength?: number;
}

/**
 * Magnetic button (per demos.gsap.com/demo/magnetic-button-overwrite-modes):
 * inside `zone`, the button leans toward the cursor; on mouseleave it springs
 * back elastically. Desktop-pointer only — call this gated behind a
 * `(hover: hover) and (pointer: fine)` matchMedia check.
 */
export function initMagneticButton(
	zone: HTMLElement,
	btn: HTMLElement,
	label?: HTMLElement | null,
	options: MagneticButtonOptions = {}
) {
	const { btnStrength = 0.45, labelStrength = 0.18 } = options;

	zone.addEventListener('mousemove', (e) => {
		const r = zone.getBoundingClientRect();
		const relX = e.clientX - r.left - r.width / 2;
		const relY = e.clientY - r.top - r.height / 2;
		gsap.to(btn, { x: relX * btnStrength, y: relY * btnStrength, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
		if (label) {
			gsap.to(label, {
				x: relX * labelStrength,
				y: relY * labelStrength,
				duration: 0.5,
				ease: 'power2.out',
				overwrite: 'auto',
			});
		}
	});

	zone.addEventListener('mouseleave', () => {
		gsap.to([btn, label].filter(Boolean), { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.35)', overwrite: 'auto' });
	});
}

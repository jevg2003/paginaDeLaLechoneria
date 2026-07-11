import gsap from 'gsap';

interface CardHoverLiftOptions {
	/** How far (px) the card rises on hover. */
	liftY?: number;
	/** Selector (relative to the card) for an icon chip to wiggle on hover. */
	iconSelector?: string;
	/** Duration of the settle-back tween on mouseleave. */
	leaveDuration?: number;
}

/**
 * GSAP-driven hover lift for a set of cards: they rise on mouseenter and
 * settle back on mouseleave, with an optional icon wiggle. Deliberately
 * GSAP (not a CSS `transition: transform`) — a CSS transition on the same
 * property GSAP's entrance tween animates corrupts the final resting value.
 */
export function initCardHoverLift(cards: HTMLElement[], options: CardHoverLiftOptions = {}) {
	const { liftY = -6, iconSelector, leaveDuration = 0.45 } = options;

	cards.forEach((card) => {
		const icon = iconSelector ? card.querySelector(iconSelector) : null;

		card.addEventListener('mouseenter', () => {
			gsap.to(card, { y: liftY, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
			if (icon) {
				gsap.fromTo(
					icon,
					{ rotation: 0 },
					{ rotation: 10, yoyo: true, repeat: 3, duration: 0.12, ease: 'sine.inOut', overwrite: 'auto' }
				);
			}
		});
		card.addEventListener('mouseleave', () => {
			gsap.to(card, { y: 0, duration: leaveDuration, ease: 'power3.out', overwrite: 'auto' });
		});
	});
}

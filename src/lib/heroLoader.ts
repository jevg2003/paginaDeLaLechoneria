import gsap from 'gsap';

/**
 * Page loader that covers the hero until assets are ready, so half-loaded
 * carousel photos never flash stacked in the middle. Falls back after 3.5s
 * in case the `load` event is slow to fire (flaky connections).
 *
 * Returns `whenReady`, used to defer the hero's entrance timeline so it
 * never plays underneath the loader.
 */
export function initHeroLoader() {
	const loader = document.getElementById('hero-loader');
	const loaderDots = gsap.to('.hero-loader-dot', {
		y: -10,
		duration: 0.4,
		yoyo: true,
		repeat: -1,
		stagger: 0.12,
		ease: 'sine.inOut',
	});
	const loaderPulse = gsap.to('.hero-loader-logo', {
		scale: 1.08,
		duration: 0.8,
		yoyo: true,
		repeat: -1,
		ease: 'sine.inOut',
	});

	let pageReady = false;
	const readyCallbacks: Array<() => void> = [];

	function finishLoading() {
		if (pageReady) return;
		pageReady = true;
		loaderDots.kill();
		loaderPulse.kill();
		gsap.to(loader, {
			autoAlpha: 0,
			scale: 1.06,
			duration: 0.45,
			ease: 'power2.inOut',
			onComplete: () => loader?.remove(),
		});
		readyCallbacks.forEach((cb) => cb());
	}

	if (document.readyState === 'complete') {
		finishLoading();
	} else {
		window.addEventListener('load', finishLoading);
		setTimeout(finishLoading, 3500);
	}

	return {
		whenReady(cb: () => void) {
			pageReady ? cb() : readyCallbacks.push(cb);
		},
	};
}

import gsap from 'gsap';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);

export interface ModalRefs {
	modal: HTMLElement;
	modalBox: HTMLElement;
	media: HTMLElement;
	body: HTMLElement;
	title: HTMLElement;
	bar: HTMLElement;
	info: HTMLElement;
	cta: HTMLAnchorElement;
	closeBtn: HTMLElement;
}

/**
 * Act 1: only the photo flies from its card — backdrop and white panel stay
 * invisible so nothing appears before the image. Act 2 (overlapping, started
 * partway through the flight): the backdrop dims and the panel unfolds from
 * behind the image. Act 3: title, gold bar, description, and CTA cascade in.
 */
export function playOpenSequence(refs: ModalRefs, card: HTMLElement, img: HTMLImageElement, reduceMotion: boolean) {
	const { modal, modalBox, media, body, title, bar, info, cta, closeBtn } = refs;
	const flipDur = reduceMotion ? 0.15 : 0.55;

	// The card's name label and "+" hint would linger in the hole the photo
	// leaves behind — tuck them away for the trip.
	gsap.to(card.querySelector('span'), { autoAlpha: 0, duration: 0.15 });

	gsap.set([title, info, cta], {
		autoAlpha: 0,
		y: reduceMotion ? 0 : 26,
		filter: reduceMotion ? 'none' : 'blur(6px)',
	});
	gsap.set(bar, { scaleX: 0 });
	modal.classList.remove('hidden');
	modal.classList.add('flex');

	// Remember the styled backdrop/panel looks, then blank them for Act 1.
	const modalBg = getComputedStyle(modal).backgroundColor;
	const boxBg = getComputedStyle(modalBox).backgroundColor;
	const boxShadow = getComputedStyle(modalBox).boxShadow;
	gsap.set(modal, { autoAlpha: 1, backgroundColor: 'rgba(0,0,0,0)', backdropFilter: 'blur(0px)' });
	gsap.set(modalBox, { backgroundColor: 'rgba(0,0,0,0)', boxShadow: 'none' });
	gsap.set(body, { clipPath: 'inset(0% 0% 100% 0%)' });
	gsap.set(closeBtn, { autoAlpha: 0 });

	const state = Flip.getState(img);
	media.appendChild(img);
	img.classList.add('h-full', 'w-full', 'object-cover');

	Flip.from(state, {
		duration: flipDur,
		ease: reduceMotion ? 'none' : 'power3.out',
		absolute: true,
		onComplete: () => {
			if (!reduceMotion) return;
			gsap.to(modal, { backgroundColor: modalBg, duration: 0.15 });
			gsap.to(modalBox, { backgroundColor: boxBg, boxShadow, duration: 0.15 });
			gsap.set(body, { clipPath: 'inset(0% 0% 0% 0%)' });
			gsap.to([title, info, cta, closeBtn], { autoAlpha: 1, duration: 0.15 });
			gsap.to(bar, { scaleX: 1, duration: 0.15 });
		},
	});

	if (reduceMotion) return;

	// The panel doesn't wait for the landing: right as the photo is about to
	// touch down, the backdrop dims and the white body unfolds from behind
	// the image — one continuous, overlapping motion.
	gsap.delayedCall(flipDur * 0.55, () => {
		gsap
			.timeline({ defaults: { ease: 'power3.out' } })
			.to(modal, { backgroundColor: modalBg, backdropFilter: 'blur(4px)', duration: 0.25, ease: 'power1.inOut' })
			.to(modalBox, { backgroundColor: boxBg, boxShadow, duration: 0.22, ease: 'power1.inOut' }, '<')
			.to(body, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.35, ease: 'power3.inOut' }, '<0.03')
			.to(closeBtn, { autoAlpha: 1, duration: 0.2 }, '-=0.28')
			.to(title, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.28 }, '-=0.24')
			.to(bar, { scaleX: 1, duration: 0.25, ease: 'power2.inOut' }, '-=0.2')
			.to(info, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.28 }, '-=0.2')
			.fromTo(
				cta,
				{ autoAlpha: 0, y: 18, scale: 0.9 },
				{ autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.32, ease: 'back.out(1.8)' },
				'-=0.16'
			);
	});
}

/** Reverse choreography: text tucks away first, then the image flies home
 * while the backdrop fades out with it — nothing lingers. */
export function playCloseSequence(refs: ModalRefs, card: HTMLElement, img: HTMLImageElement, reduceMotion: boolean) {
	const { modal, modalBox } = refs;
	const contentEls = modalBox.querySelectorAll('h3, .producto-modal-bar, .producto-modal-info, .producto-modal-cta');
	const flipDur = reduceMotion ? 0.1 : 0.4;

	gsap.to(contentEls, { autoAlpha: 0, y: reduceMotion ? 0 : 10, duration: reduceMotion ? 0.08 : 0.12 });

	gsap.delayedCall(reduceMotion ? 0.05 : 0.08, () => {
		const state = Flip.getState(img);
		card.insertBefore(img, card.firstChild);

		Flip.from(state, {
			duration: flipDur,
			ease: reduceMotion ? 'none' : 'power2.inOut',
			absolute: true,
			onComplete: () => {
				modal.classList.add('hidden');
				modal.classList.remove('flex');
				gsap.to(card.querySelector('span'), { autoAlpha: 1, duration: 0.25 });
				card.focus();
			},
		});

		gsap.to(modal, { autoAlpha: 0, duration: flipDur, ease: 'power1.in' });
	});
}

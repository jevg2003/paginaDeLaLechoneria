import gsap from 'gsap';
import { playOpenSequence, playCloseSequence, type ModalRefs } from './productModalAnimations';

function queryRefs(): ModalRefs {
	const modal = document.getElementById('producto-modal')!;
	const modalBox = modal.querySelector<HTMLElement>('.producto-modal-box')!;
	return {
		modal,
		modalBox,
		media: modal.querySelector<HTMLElement>('.producto-modal-media')!,
		body: modalBox.querySelector<HTMLElement>('.producto-modal-body')!,
		title: document.getElementById('producto-modal-title')!,
		bar: modalBox.querySelector<HTMLElement>('.producto-modal-bar')!,
		info: modalBox.querySelector<HTMLElement>('.producto-modal-info')!,
		cta: modalBox.querySelector<HTMLAnchorElement>('.producto-modal-cta')!,
		closeBtn: document.getElementById('producto-modal-close')!,
	};
}

/**
 * Product quote modal: a GSAP Flip photo transition from the grid card into
 * a full panel, with the info cascading in only after the photo lands.
 * Wires up every `.producto-card` on the page; call once per page load.
 */
export function initProductModal(waNumber: string) {
	const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const refs = queryRefs();

	let sourceCard: HTMLElement | null = null;
	let movedImg: HTMLImageElement | null = null;

	function openModal(card: HTMLElement) {
		const img = card.querySelector<HTMLImageElement>('.producto-img')!;
		const name = card.dataset.name!;
		const info = card.dataset.info!;
		const message = card.dataset.message!;

		sourceCard = card;
		movedImg = img;

		refs.title.textContent = name;
		refs.info.textContent = info;
		refs.cta.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

		playOpenSequence(refs, card, img, reduceMotion);

		refs.closeBtn.focus();
		document.addEventListener('keydown', onKeydown);
	}

	function closeModal() {
		if (!sourceCard || !movedImg) return;
		const card = sourceCard;
		const img = movedImg;
		sourceCard = null;
		movedImg = null;
		document.removeEventListener('keydown', onKeydown);

		playCloseSequence(refs, card, img, reduceMotion);
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') closeModal();
	}

	document.querySelectorAll<HTMLElement>('.producto-card').forEach((card) => {
		card.addEventListener('click', () => openModal(card));
	});

	refs.closeBtn.addEventListener('click', closeModal);
	refs.modal.addEventListener('click', (e) => {
		if (e.target === refs.modal) closeModal();
	});

	initHintPulse(reduceMotion);
}

/** Pulsing "+" hint so it's obvious the cards are pressable; paused offscreen. */
function initHintPulse(reduceMotion: boolean) {
	if (reduceMotion) return;

	const hintTween = gsap.to('.producto-hint', {
		scale: 1.2,
		duration: 0.8,
		yoyo: true,
		repeat: -1,
		ease: 'sine.inOut',
		stagger: 0.15,
	});

	const section = document.getElementById('nuestros-productos')!;
	new IntersectionObserver(([entry]) => {
		entry.isIntersecting ? hintTween.play() : hintTween.pause();
	}).observe(section);
}

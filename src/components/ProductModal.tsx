import { useEffect, useRef, useState } from 'react';
import { WHATSAPP_URL } from '../lib/contact';

export interface Product {
	title: string;
	description: string;
	image: string;
}

interface Props {
	products: Product[];
}

const FOCUSABLE_SELECTOR =
	'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const MODAL_TITLE_ID = 'product-modal-title';

export default function ProductModal({ products }: Props) {
	const [selected, setSelected] = useState<Product | null>(null);
	const modalRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLElement | null>(null);

	const openModal = (product: Product, e: React.MouseEvent<HTMLButtonElement>) => {
		triggerRef.current = e.currentTarget;
		setSelected(product);
	};

	const closeModal = () => {
		setSelected(null);
	};

	useEffect(() => {
		if (!selected) return;

		const modalEl = modalRef.current;
		const focusables = modalEl ? Array.from(modalEl.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)) : [];
		focusables[0]?.focus();

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				e.preventDefault();
				closeModal();
				return;
			}

			if (e.key !== 'Tab' || focusables.length === 0) return;

			const first = focusables[0];
			const last = focusables[focusables.length - 1];

			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault();
				first.focus();
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			triggerRef.current?.focus();
		};
	}, [selected]);

	return (
		<>
			<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
				{products.map((product) => (
					<div
						key={product.title}
						className="product-card bg-cream-50 rounded-2xl shadow-lg overflow-hidden flex flex-col"
					>
						<img src={product.image} alt={product.title} className="h-48 w-full object-cover" />
						<div className="p-6 flex flex-col flex-1">
							<h3 className="text-xl font-bold text-brand-800 mb-2">{product.title}</h3>
							<p className="text-brand-900/80 leading-relaxed flex-1">{product.description}</p>
							<button
								onClick={(e) => openModal(product, e)}
								className="mt-4 self-start bg-gold-500 hover:bg-gold-600 text-brand-900 font-semibold px-5 py-2 rounded-full transition-colors cursor-pointer"
							>
								¡Más info!
							</button>
						</div>
					</div>
				))}
			</div>

			{selected && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
					onClick={closeModal}
				>
					<div
						ref={modalRef}
						role="dialog"
						aria-modal="true"
						aria-labelledby={MODAL_TITLE_ID}
						className="bg-cream-50 rounded-2xl shadow-2xl max-w-md w-full p-6 relative"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							aria-label="Cerrar"
							onClick={closeModal}
							className="absolute top-3 right-4 text-2xl text-brand-800 hover:text-gold-600 cursor-pointer"
						>
							×
						</button>
						<h3 id={MODAL_TITLE_ID} className="text-2xl font-bold text-brand-800 mb-3 pr-6">
							{selected.title}
						</h3>
						<p className="text-brand-900/80 leading-relaxed mb-6">{selected.description}</p>
						<a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
							<button className="w-full bg-brand-700 hover:bg-brand-800 text-cream-50 font-semibold px-5 py-3 rounded-full transition-colors cursor-pointer">
								Ir a WhatsApp
							</button>
						</a>
					</div>
				</div>
			)}
		</>
	);
}

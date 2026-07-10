import { useState } from 'react';
import { WHATSAPP_URL } from '../lib/contact';

export interface Product {
	title: string;
	description: string;
	image: string;
}

interface Props {
	products: Product[];
}

export default function ProductModal({ products }: Props) {
	const [selected, setSelected] = useState<Product | null>(null);

	return (
		<>
			<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
				{products.map((product) => (
					<div
						key={product.title}
						className="bg-cream-50 rounded-2xl shadow-lg overflow-hidden flex flex-col"
					>
						<img src={product.image} alt={product.title} className="h-48 w-full object-cover" />
						<div className="p-6 flex flex-col flex-1">
							<h3 className="text-xl font-bold text-brand-800 mb-2">{product.title}</h3>
							<p className="text-brand-900/80 leading-relaxed flex-1">{product.description}</p>
							<button
								onClick={() => setSelected(product)}
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
					onClick={() => setSelected(null)}
				>
					<div
						className="bg-cream-50 rounded-2xl shadow-2xl max-w-md w-full p-6 relative"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							aria-label="Cerrar"
							onClick={() => setSelected(null)}
							className="absolute top-3 right-4 text-2xl text-brand-800 hover:text-gold-600 cursor-pointer"
						>
							×
						</button>
						<h3 className="text-2xl font-bold text-brand-800 mb-3 pr-6">{selected.title}</h3>
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

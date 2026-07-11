import type { Product } from '../types/product';

// Single source of truth for the products grid AND the quote modal —
// previously this list was duplicated by hand in Productos.astro's script.
export const products: Product[] = [
	{
		id: 'lechona-careta',
		name: 'Lechona con Careta',
		image: '/media/lechonaBig.webp',
		info: 'Lechona tradicional tolimense con su careta y cuero súper crocante. Disponible desde 15 porciones, acompañada de arepas.',
		message: 'Hola! Me interesa la Lechona con Careta. ¿Podrían darme más información y cotización?',
	},
	{
		id: 'cojin-lechona',
		name: 'Cojín de Lechona',
		image: '/media/cojin30.webp',
		info: 'Nuestro clásico cojín relleno de arroz, arveja y carne de cerdo, horneado hasta quedar crocante. Desde 15 porciones.',
		message: 'Hola! Me interesa el Cojín de Lechona. ¿Podrían darme más información y cotización?',
	},
	{
		id: 'cajas-por-mayor',
		name: 'Cajas de Lechona al Por Mayor',
		image: '/media/pedidos-empacados-domicilio.jpg',
		info: 'Pedidos grandes de cajas de lechona para fiestas, reuniones y eventos. Te las entregamos empacadas y listas para repartir.',
		message: 'Hola! Me interesan las Cajas de Lechona al Por Mayor para un evento. ¿Podrían darme más información y cotización?',
	},
	{
		id: 'cajas-detal',
		name: 'Cajas de Lechona al Detal',
		image: '/media/racion-lechona-detalle.jpg',
		info: 'Raciones individuales en caja con arepa y cuero, listas para servir. Ventas al detal aquí en nuestro local.',
		message: 'Hola! Me interesa una Caja de Lechona al Detal. ¿Podrían darme más información?',
	},
	{
		id: 'caja-mixta',
		name: 'Caja de Lechona Mixta',
		image: '/media/img/img4.webp',
		info: 'Caja individual de nuestra lechona mixta: cabanos, pollo, costilla ahumada y cerdo en una sola ración.',
		message: 'Hola! Me interesa la Caja de Lechona Mixta. ¿Podrían darme más información y cotización?',
	},
	{
		id: 'tamales',
		name: 'Tamales',
		image: '/media/img/img5.webp',
		info: 'Tamales vallunos y tolimenses hechos en casa, envueltos en hoja de plátano con la sazón de siempre.',
		message: 'Hola! Me interesan los Tamales. ¿Podrían darme más información y cotización?',
	},
	{
		id: 'lechona-mixta',
		name: 'Lechona Mixta',
		image: '/media/img/img10.jpg',
		info: 'Lechona especial con cabanos, pollo, costilla ahumada y cerdo — todos los sabores de la casa en una sola.',
		message: 'Hola! Me interesa la Lechona Mixta. ¿Podrían darme más información y cotización?',
	},
	{
		id: 'pernil',
		name: 'Pernil',
		image: '/media/pernil-glaseado-1.jpg',
		info: 'Pernil de cerdo asado, marinado con las especias de la casa y horneado hasta quedar jugoso por dentro y dorado por fuera.',
		message: 'Hola! Me interesa el Pernil. ¿Podrían darme más información y cotización?',
	},
	{
		id: 'lomo',
		name: 'Lomo',
		image: '/media/pernil.webp',
		info: 'Lomo de cerdo horneado con glaseado de la casa, tierno y lleno de sabor. Perfecto como plato principal.',
		message: 'Hola! Me interesa el Lomo. ¿Podrían darme más información y cotización?',
	},
];

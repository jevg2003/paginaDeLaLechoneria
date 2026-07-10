export const PHONE_E164 = '+573128839301';
export const PHONE_DISPLAY = '+57 312 8839301';
export const PHONE_TEL_HREF = `tel:${PHONE_E164}`;

const WHATSAPP_MESSAGE =
	'Hola, me interesa saber más sobre sus productos. ¿Podrían compartirme información detallada? Gracias!';

export const WHATSAPP_URL = `https://wa.me/${PHONE_E164.replace('+', '')}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

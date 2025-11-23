import { RoutineStep, Product, ConfidenceMessage } from './types';

export const MOCK_ROUTINE: RoutineStep[] = [
  { id: '1', name: 'Limpeza Suave', product: 'Gel de Limpeza Hidratante', duration: '1 min', completed: false, type: 'skincare' },
  { id: '2', name: 'Tonificação', product: 'Tônico Calmante', duration: '30 seg', completed: false, type: 'skincare' },
  { id: '3', name: 'Hidratação', product: 'Sérum Ácido Hialurônico', duration: '1 min', completed: false, type: 'skincare' },
  { id: '4', name: 'Proteção Solar', product: 'FPS 50 Toque Seco', duration: '1 min', completed: false, type: 'skincare' },
  { id: '5', name: 'Base Leve', product: 'Skin Tint Glow', duration: '2 min', completed: false, type: 'makeup' },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Base Velvet Matte', brand: 'Lumina', shade: 'Bege Médio 04', category: 'Face', price: 89.90, image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400&q=80', matchScore: 98 },
  { id: '2', name: 'Lip Tint Natural', brand: 'GlowUp', shade: 'Cereja', category: 'Lips', price: 45.00, image: 'https://images.unsplash.com/photo-1571781535014-53bd14b90713?w=400&q=80', matchScore: 92 },
  { id: '3', name: 'Blush Cremoso', brand: 'SunKissed', shade: 'Pêssego', category: 'Cheeks', price: 62.50, image: 'https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=400&q=80', matchScore: 88 },
  { id: '4', name: 'Máscara Volume', brand: 'BoldEyes', shade: 'Preto Intenso', category: 'Eyes', price: 55.00, image: 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=400&q=80', matchScore: 95 },
];

export const AFFIRMATIONS: ConfidenceMessage[] = [
  { id: '1', text: "Sua beleza natural é única e merece ser celebrada.", category: 'beauty' },
  { id: '2', text: "Você é capaz de conquistar qualquer objetivo hoje.", category: 'strength' },
  { id: '3', text: "Respire fundo. Você está exatamente onde deveria estar.", category: 'calm' },
];

export const TESTIMONIALS = [
  { name: "Ana Clara", role: "Iniciante", text: "O Skinovaai me ensinou a cuidar da minha pele sem complicação. Amo!" },
  { name: "Lucas M.", role: "Makeup Lover", text: "A análise de tom de base é perfeita. Nunca mais errei na compra." },
  { name: "Beatriz S.", role: "Profissional", text: "A rotina personalizada salvou minhas manhãs corridas." },
];

export const SUGGESTED_SHADES = [
  { id: 'shade_04', name: 'Bege Médio 04', brand: 'Lumina', color: '#e0ac69', match: 98, storeLink: 'https://www.tiktok.com/@blindaskin?_r=1&_t=ZM-91aKKMkTCqu' },
  { id: 'shade_05', name: 'Bege Claro 05', brand: 'GlowUp', color: '#e8b880', match: 92, storeLink: 'https://www.tiktok.com/@blindaskin?_r=1&_t=ZM-91aKKMkTCqu' },
  { id: 'shade_03', name: 'Bege Médio 03', brand: 'Lumina', color: '#d69d5e', match: 89, storeLink: 'https://www.tiktok.com/@blindaskin?_r=1&_t=ZM-1aKKMkTCqu' },
];
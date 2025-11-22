import React from 'react';
import { MOCK_PRODUCTS } from '../constants';

interface ProductsListProps {
  onBack: () => void;
}

const ProductsList: React.FC<ProductsListProps> = ({ onBack }) => {
  // Duplicate products to simulate a larger list for the demo
  const allProducts = [...MOCK_PRODUCTS, ...MOCK_PRODUCTS, ...MOCK_PRODUCTS];

  return (
    <div className="min-h-screen bg-slate-50 animate-fade-in">
      <div className="bg-white sticky top-0 z-10 px-4 py-4 shadow-sm flex items-center justify-between">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors text-xl">
          ←
        </button>
        <h1 className="text-lg font-serif font-bold text-slate-900">Produtos Curados</h1>
        <div className="w-8"></div>
      </div>

      <div className="p-4 pb-24">
        <p className="text-slate-500 text-sm mb-6 text-center">
          Selecionados pela IA com base no seu perfil de pele.
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          {allProducts.map((product, index) => (
            <div key={`${product.id}-${index}`} className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col">
              <div className="aspect-square bg-slate-50 rounded-lg mb-3 relative overflow-hidden group">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" 
                />
                {product.matchScore && (
                  <span className="absolute top-2 right-2 bg-green-400 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold shadow-sm">
                    {product.matchScore}% Match
                  </span>
                )}
              </div>
              
              <div className="text-xs text-slate-400 mb-1 uppercase tracking-wide">{product.brand}</div>
              <h3 className="text-sm font-bold text-slate-900 mb-1 leading-tight min-h-[2.5em]">{product.name}</h3>
              
              <div className="mt-auto pt-3 flex items-center justify-between">
                <span className="text-sm font-bold text-primary-600">R$ {product.price.toFixed(2).replace('.', ',')}</span>
                <button className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-primary-600 transition-colors">
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
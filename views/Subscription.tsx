import React from 'react';
import Button from '../components/Button';

interface SubscriptionProps {
  onSubscribe: () => void;
  onCancel: () => void;
}

const Subscription: React.FC<SubscriptionProps> = ({ onSubscribe, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      <div className="flex-1 overflow-y-auto">
        {/* Header Image */}
        <div className="h-64 bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10"></div>
          <img src="https://picsum.photos/800/600?grayscale" alt="Premium" className="w-full h-full object-cover opacity-60" />
          <div className="absolute bottom-6 left-6 z-20">
            <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase mb-2 inline-block">Premium</span>
            <h2 className="text-3xl font-serif font-bold text-white">Skinovaai Pro</h2>
          </div>
          <button onClick={onCancel} className="absolute top-6 right-6 z-30 w-8 h-8 bg-black/20 backdrop-blur rounded-full text-white flex items-center justify-center">✕</button>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Desbloqueie seu potencial máximo</h3>
          
          <div className="space-y-4 mb-8">
            {[
              "Acesso ilimitado ao Skin Scan IA",
              "Rotinas personalizadas avançadas",
              "Catálogo completo de looks (100+)",
              "Sem anúncios",
              "Suporte prioritário da Maya"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</div>
                <span className="text-slate-600">{feature}</span>
              </div>
            ))}
          </div>

          {/* Pricing Card */}
          <div className="border-2 border-primary-600 bg-primary-50 rounded-2xl p-6 relative mb-4">
            <div className="absolute -top-3 right-6 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              MAIS POPULAR
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-slate-900">Anual</span>
              <div>
                <span className="text-slate-400 line-through text-sm mr-2">R$ 29,90</span>
                <span className="text-2xl font-bold text-primary-700">R$ 19,90</span>
                <span className="text-xs text-slate-500">/mês</span>
              </div>
            </div>
            <p className="text-xs text-slate-500">Cobrado anualmente (R$ 238,80). Cancele quando quiser.</p>
          </div>

           <div className="border border-slate-200 rounded-2xl p-6 mb-8 opacity-60 hover:opacity-100 transition-opacity">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-900">Mensal</span>
              <div>
                <span className="text-xl font-bold text-slate-900">R$ 29,90</span>
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-slate-400 mb-4 flex items-center justify-center gap-1">
            🔒 Pagamento seguro via <span className="font-bold text-slate-500">Cakto Pay</span>
          </div>
          
          <Button fullWidth size="lg" onClick={onSubscribe}>
            Assinar Agora
          </Button>
          <p className="text-center text-xs text-slate-400 mt-4">
            Ao assinar, você concorda com nossos Termos de Uso.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
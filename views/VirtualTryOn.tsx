import React, { useEffect, useRef, useState } from 'react';
import Button from '../components/Button';
import { showSuccess } from '../utils/toast';
import { SUGGESTED_SHADES } from '../constants'; // Importar SUGGESTED_SHADES

interface VirtualTryOnProps {
  onClose: () => void; // Callback para fechar o provador
  onViewProducts: () => void; // Callback para ver produtos
  initialShadeId?: string | null; // Novo prop para o tom inicial
}

const hexToRgba = (hex: string, alpha: number = 0.15): string => {
  let r = 0, g = 0, b = 0;
  if (hex.length === 7) { // #RRGGBB
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  } else if (hex.length === 4) { // #RGB
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  }
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const VirtualTryOn: React.FC<VirtualTryOnProps> = ({ onClose, onViewProducts, initialShadeId }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeFilterColor, setActiveFilterColor] = useState<string | null>(null); // Armazena a string de cor RGBA
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setPermissionGranted(true);
          setCapturedImage(null); // Reset captured image when camera starts
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setPermissionGranted(false);
      }
    };

    if (!capturedImage) { // Only start camera if no image is captured
      startCamera();
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const currentStream = videoRef.current.srcObject as MediaStream;
        currentStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [capturedImage]);

  // Efeito para aplicar o filtro inicial quando initialShadeId muda
  useEffect(() => {
    if (initialShadeId) {
      const shade = SUGGESTED_SHADES.find(s => s.id === initialShadeId);
      if (shade) {
        const rgbaColor = hexToRgba(shade.color, 0.2); // Usar alpha 0.2 para tons de base
        setActiveFilterColor(rgbaColor);
        showSuccess(`Aplicando tom: ${shade.name}`);
      }
    } else {
      setActiveFilterColor(null); // Limpar filtro se não houver tom inicial
    }
  }, [initialShadeId]);

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        context.setTransform(1, 0, 0, 1, 0, 0);

        const imageData = canvas.toDataURL('image/png');
        setCapturedImage(imageData);
        
        if (video.srcObject) {
          const stream = video.srcObject as MediaStream;
          stream.getTracks().forEach(track => track.stop());
        }
      }
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    // activeFilterColor is kept, user can change it later
  };

  const savePhoto = () => {
    if (capturedImage) {
      const link = document.createElement('a');
      link.href = capturedImage;
      link.download = 'skinovaai_tryon_photo.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showSuccess('Foto salva na sua galeria!');
    }
  };

  const filters = [
    { name: 'Natural', color: 'rgba(255, 200, 150, 0.1)' },
    { name: 'Ousada', color: 'rgba(200, 50, 50, 0.2)' },
    { name: 'Glamour', color: 'rgba(255, 215, 0, 0.15)' },
    { name: 'Noite', color: 'rgba(50, 0, 100, 0.2)' },
  ];

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Camera Feed / Captured Image */}
      <div className="relative flex-1 overflow-hidden">
        {!capturedImage ? (
          <>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className="absolute inset-0 w-full h-full object-cover transform scale-x-[-1]"
            />
            <canvas ref={canvasRef} className="hidden"></canvas>
          </>
        ) : (
          <img 
            src={capturedImage} 
            alt="Captured" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        
        {/* AR Overlay Layer (Simulated) */}
        {activeFilterColor && (
          <div 
            className="absolute inset-0 pointer-events-none mix-blend-overlay transition-colors duration-500"
            style={{ backgroundColor: activeFilterColor }}
          ></div>
        )}

        {/* Permission Message */}
        {!permissionGranted && !capturedImage && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900 text-white p-8 text-center">
            <p>Por favor, permita o acesso à câmera para experimentar os looks.</p>
          </div>
        )}

        {/* UI Controls Overlay */}
        <div className="absolute top-0 left-0 right-0 p-4 pt-8 flex justify-between items-start bg-gradient-to-b from-black/50 to-transparent">
          <div className="text-white">
            <h2 className="font-bold text-lg">Virtual Try-On</h2>
            <p className="text-xs opacity-80">Experimente antes de comprar</p>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-full px-3 py-1 text-xs text-white border border-white/30">
            {activeFilterColor ? 'Filtro Ativo' : 'Sem Filtro'}
          </div>
        </div>
      </div>

      {/* Controls Area */}
      <div className="bg-white rounded-t-3xl p-6 pb-safe -mt-6 relative z-10">
        <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6"></div>
        
        <h3 className="text-slate-900 font-bold mb-4">Escolha um Look</h3>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          <button 
             onClick={() => setActiveFilterColor(null)}
             className={`flex-shrink-0 w-16 h-16 rounded-full border-2 flex items-center justify-center ${!activeFilterColor ? 'border-primary-600' : 'border-slate-200'}`}
          >
            <span className="text-xs font-medium text-slate-500">Nenhum</span>
          </button>
          
          {filters.map((filter, index) => (
            <button
              key={index}
              onClick={() => setActiveFilterColor(filter.color)}
              className={`flex-shrink-0 w-16 h-16 rounded-full border-2 p-1 overflow-hidden transition-all ${activeFilterColor === filter.color ? 'border-primary-600 scale-110' : 'border-transparent'}`}
            >
              <div className="w-full h-full rounded-full bg-slate-200 relative">
                 {/* Mock preview color */}
                 <div className="absolute inset-0 opacity-50" style={{ backgroundColor: filter.color.replace('0.1', '1').replace('0.2', '1').replace('0.15', '1') }}></div>
                 <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-800 bg-white/50">{filter.name}</span>
              </div>
            </button>
          ))}
          {initialShadeId && !filters.some(f => hexToRgba(SUGGESTED_SHADES.find(s => s.id === initialShadeId)?.color || '', 0.2) === activeFilterColor) && (
            <button
              onClick={() => {
                const shade = SUGGESTED_SHADES.find(s => s.id === initialShadeId);
                if (shade) setActiveFilterColor(hexToRgba(shade.color, 0.2));
              }}
              className={`flex-shrink-0 w-16 h-16 rounded-full border-2 p-1 overflow-hidden transition-all ${activeFilterColor === hexToRgba(SUGGESTED_SHADES.find(s => s.id === initialShadeId)?.color || '', 0.2) ? 'border-primary-600 scale-110' : 'border-transparent'}`}
            >
              <div className="w-full h-full rounded-full bg-slate-200 relative">
                 <div className="absolute inset-0 opacity-50" style={{ backgroundColor: SUGGESTED_SHADES.find(s => s.id === initialShadeId)?.color }}></div>
                 <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-800 bg-white/50">Seu Tom</span>
              </div>
            </button>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          {!capturedImage ? (
            <Button fullWidth variant="primary" onClick={takePhoto} disabled={!permissionGranted}>
              Tirar Foto
            </Button>
          ) : (
            <>
              <Button fullWidth variant="secondary" onClick={retakePhoto}>
                Tirar Outra Foto
              </Button>
              <Button fullWidth variant="primary" onClick={savePhoto}>
                Salvar Foto
              </Button>
            </>
          )}
          <Button fullWidth variant="secondary" onClick={onViewProducts}>Ver Produtos</Button>
        </div>
      </div>

      {/* Close button for VirtualTryOn */}
      <button 
        onClick={onClose}
        className="fixed top-4 left-4 z-50 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center font-bold text-slate-900"
      >
        ✕
      </button>
    </div>
  );
};

export default VirtualTryOn;
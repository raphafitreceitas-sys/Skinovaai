import React, { useEffect, useRef, useState } from 'react';
import Button from '../components/Button';

const VirtualTryOn: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null); // Adicionado para capturar a imagem
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null); // Estado para a imagem capturada

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setPermissionGranted(true);
          setCapturedImage(null); // Resetar imagem capturada ao iniciar câmera
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setPermissionGranted(false);
      }
    };

    if (!capturedImage) { // Só inicia a câmera se não houver imagem capturada
      startCamera();
    }

    return () => {
      // Cleanup stream
      if (videoRef.current && videoRef.current.srcObject) {
        const currentStream = videoRef.current.srcObject as MediaStream;
        currentStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [capturedImage]); // Dependência adicionada para reiniciar a câmera se a imagem for resetada

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        // Set canvas dimensions to video dimensions
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw the video frame onto the canvas, flipping horizontally
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        context.setTransform(1, 0, 0, 1, 0, 0); // Reset transform

        const imageData = canvas.toDataURL('image/png');
        setCapturedImage(imageData);
        
        // Stop camera stream after taking photo
        if (video.srcObject) {
          const stream = video.srcObject as MediaStream;
          stream.getTracks().forEach(track => track.stop());
        }
      }
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null); // Limpa a imagem capturada para reiniciar a câmera
  };

  const filters = [
    { id: 'natural', name: 'Natural', color: 'rgba(255, 200, 150, 0.1)' },
    { id: 'bold', name: 'Ousada', color: 'rgba(200, 50, 50, 0.2)' },
    { id: 'glam', name: 'Glamour', color: 'rgba(255, 215, 0, 0.15)' },
    { id: 'night', name: 'Noite', color: 'rgba(50, 0, 100, 0.2)' },
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
            <canvas ref={canvasRef} className="hidden"></canvas> {/* Canvas oculto para captura */}
          </>
        ) : (
          <img 
            src={capturedImage} 
            alt="Captured" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        
        {/* AR Overlay Layer (Simulated) */}
        {activeFilter && (
          <div 
            className="absolute inset-0 pointer-events-none mix-blend-overlay transition-colors duration-500"
            style={{ backgroundColor: filters.find(f => f.id === activeFilter)?.color }}
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
            {activeFilter ? 'Filtro Ativo' : 'Sem Filtro'}
          </div>
        </div>
      </div>

      {/* Controls Area */}
      <div className="bg-white rounded-t-3xl p-6 pb-safe -mt-6 relative z-10">
        <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6"></div>
        
        <h3 className="text-slate-900 font-bold mb-4">Escolha um Look</h3>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          <button 
             onClick={() => setActiveFilter(null)}
             className={`flex-shrink-0 w-16 h-16 rounded-full border-2 flex items-center justify-center ${!activeFilter ? 'border-primary-600' : 'border-slate-200'}`}
          >
            <span className="text-xs font-medium text-slate-500">Nenhum</span>
          </button>
          
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex-shrink-0 w-16 h-16 rounded-full border-2 p-1 overflow-hidden transition-all ${activeFilter === filter.id ? 'border-primary-600 scale-110' : 'border-transparent'}`}
            >
              <div className="w-full h-full rounded-full bg-slate-200 relative">
                 {/* Mock preview color */}
                 <div className="absolute inset-0 opacity-50" style={{ backgroundColor: filter.color.replace('0.1', '1').replace('0.2', '1') }}></div>
                 <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-800 bg-white/50">{filter.name}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          {!capturedImage ? (
            <Button fullWidth variant="primary" onClick={takePhoto} disabled={!permissionGranted}>
              Tirar Foto
            </Button>
          ) : (
            <Button fullWidth variant="secondary" onClick={retakePhoto}>
              Tirar Outra Foto
            </Button>
          )}
          <Button fullWidth variant="secondary">Ver Produtos</Button>
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOn;
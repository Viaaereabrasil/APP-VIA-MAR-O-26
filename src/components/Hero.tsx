import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Plane, MessageSquare, Calculator, Search, ChevronLeft, ChevronRight, Star, ExternalLink } from 'lucide-react';
import { WHATSAPP_LINK } from '../constants';

interface HeroProps {
  onStartBudget: () => void;
  onViewFleet: () => void;
}

const HERO_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=1920',
    title: 'Jatos Executivos',
    desc: 'Velocidade e alcance global'
  },
  {
    url: 'https://www.avantto.com.br/wp-content/uploads/2025/05/ESQUILOB3.png',
    title: 'Esquilo B3 H125',
    desc: 'Performance e versatilidade'
  },
  {
    url: 'https://www.melhoresdestinos.com.br/wp-content/uploads/2019/07/passagens-aereas-sao-paulo-capa2019-05.jpg',
    title: 'Mobilidade Urbana',
    desc: 'Conectividade e agilidade'
  },
  {
    url: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&q=80&w=1920',
    title: 'Turboélices',
    desc: 'Eficiência regional e pistas curtas'
  },
  {
    url: 'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=100004971794268',
    title: 'Experiências Únicas',
    desc: 'Momentos inesquecíveis'
  }
];

export default function Hero({ onStartBudget, onViewFleet }: HeroProps) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);

  return (
    <div className="relative overflow-hidden bg-slate-900 py-24 sm:py-32 lg:py-40 min-h-[80vh] flex items-center">
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.4, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={HERO_IMAGES[currentImage].url}
              alt={HERO_IMAGES[currentImage].title}
              width="1920"
              height="1080"
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
              fetchPriority={currentImage === 0 ? "high" : "auto"}
            />
          </motion.div>
        </AnimatePresence>

        {/* Animated Overlay with Blur */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`overlay-${currentImage}`}
            initial={{ backdropFilter: "blur(10px)", opacity: 0 }}
            animate={{ backdropFilter: "blur(0px)", opacity: 1 }}
            exit={{ backdropFilter: "blur(10px)", opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-[1]"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-slate-900/90" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src="input_file_1.png" 
              alt="Via Aérea Brasil Logo" 
              width="240"
              height="84"
              className="h-32 md:h-48 w-auto mb-10"
              referrerPolicy="no-referrer"
              fetchPriority="high"
            />
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6"
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="fill-orange-500 text-orange-500" />
                ))}
              </div>
              <span className="text-xs font-bold text-white uppercase tracking-wider">5/5 no Google</span>
              <a 
                href="https://share.google/djMFVK590x1voem5Q" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-2 p-1 rounded-full bg-white/20 hover:bg-white/40 transition-colors"
              >
                <ExternalLink size={10} className="text-white" />
              </a>
            </motion.div>
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-8 leading-[1.1]">
              Voe com <span className="text-orange-500">Exclusividade</span> e Segurança.
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-12 leading-relaxed max-w-2xl">
              Fretamento sob demanda, passeios panorâmicos e táxi aéreo. 
              Obtenha seu orçamento personalizado para <span className="text-white font-bold">{HERO_IMAGES[currentImage].title}</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(234, 88, 12, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                onClick={onStartBudget}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-orange-600/20 hover:bg-orange-700 transition-all group"
              >
                Fazer Orçamento
                <Calculator size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(255, 255, 255, 0.2)" }}
                whileTap={{ scale: 0.98 }}
                href="https://www.comprarviagem.com.br/viaaereabrasil/home"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-slate-900 px-8 py-4 text-lg font-bold shadow-lg hover:bg-slate-50 transition-all"
              >
                Portal de Reservas
                <Search size={20} className="text-orange-600" />
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                whileTap={{ scale: 0.98 }}
                onClick={onViewFleet}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all"
              >
                Ver Frota
                <ArrowRight size={20} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="absolute bottom-12 right-12 z-20 hidden md:flex items-center gap-4">
        <button 
          onClick={prevImage}
          aria-label="Imagem anterior"
          className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/20 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex gap-2">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImage(i)}
              aria-label={`Ir para imagem ${i + 1}`}
              className={`h-3 rounded-full transition-all min-h-[44px] min-w-[44px] flex items-center justify-center relative ${currentImage === i ? 'w-8' : 'w-3'}`}
            >
              <span className={`absolute h-3 rounded-full transition-all ${currentImage === i ? 'bg-orange-600 w-8' : 'bg-white/30 w-3'}`}></span>
            </button>
          ))}
        </div>
        <button 
          onClick={nextImage}
          aria-label="Próxima imagem"
          className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/20 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Stats or Trust Badges */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-slate-900/50 backdrop-blur-md py-8 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-4 gap-8">
            <div className="text-center md:text-left">
              <p className="text-3xl font-bold text-white">16+</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1">Anos de Mercado</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-3xl font-bold text-white">100%</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1">Homologado ANAC</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-3xl font-bold text-white">5.000+</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1">Voos Realizados</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-3xl font-bold text-white">24/7</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1">Suporte ao Cliente</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

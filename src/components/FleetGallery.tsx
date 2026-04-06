import { useState, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Briefcase, MapPin, Clock, ArrowRight, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { FLEET } from '../constants';
import { Aircraft, AircraftType } from '../types';
import { cn } from '../lib/utils';

interface FleetGalleryProps {
  onSelect: (aircraft: Aircraft) => void;
}

interface AircraftCardProps {
  aircraft: Aircraft;
  index: number;
  onSelect: (a: Aircraft) => void;
}

function AircraftCard({ aircraft, index, onSelect }: AircraftCardProps) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const images = aircraft.gallery || [aircraft.image, aircraft.interiorImage];

  const nextImg = (e: MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % images.length);
  };

  const prevImg = (e: MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500 flex flex-col"
    >
      <div className="relative aspect-[4/3] overflow-hidden group/img">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImgIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            src={images[currentImgIndex]}
            alt={aircraft.model}
            width="800"
            height="600"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        </AnimatePresence>
        
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-orange-600 uppercase tracking-wider shadow-sm">
            {aircraft.type}
          </span>
          <span className="bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider shadow-sm">
            {aircraft.gallery ? `Foto ${currentImgIndex + 1}/${images.length}` : (currentImgIndex === 0 ? 'Exterior' : 'Interior')}
          </span>
        </div>

        {/* Carousel Controls */}
        <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
          <button 
            onClick={prevImg}
            className="p-2 rounded-full bg-white/80 text-slate-900 shadow-lg hover:bg-orange-600 hover:text-white transition-all pointer-events-auto backdrop-blur-sm border border-white/20"
            aria-label="Foto anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextImg}
            className="p-2 rounded-full bg-white/80 text-slate-900 shadow-lg hover:bg-orange-600 hover:text-white transition-all pointer-events-auto backdrop-blur-sm border border-white/20"
            aria-label="Próxima foto"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-md border border-white/10">
          {images.map((_, i) => (
            <button 
              key={i} 
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImgIndex(i);
              }}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                currentImgIndex === i ? "bg-orange-500 w-4" : "bg-white/60 hover:bg-white"
              )}
              aria-label={`Ir para foto ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="p-8 flex-1 flex flex-col">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">{aircraft.model}</h3>
        <p className="text-slate-500 text-sm mb-6 line-clamp-2">{aircraft.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="flex items-center gap-2 text-slate-600">
            <Users size={18} className="text-orange-500" />
            <span className="text-sm font-medium">{aircraft.capacity} Assentos</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Briefcase size={18} className="text-orange-500" />
            <span className="text-sm font-medium">{aircraft.luggage}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <MapPin size={18} className="text-orange-500" />
            <span className="text-sm font-medium">{aircraft.range}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Clock size={18} className="text-orange-500" />
            <span className="text-sm font-medium">A partir de R$ {aircraft.pricePerHour.toLocaleString('pt-BR')}/h</span>
          </div>
        </div>

        <button
          onClick={() => onSelect(aircraft)}
          className="w-full mt-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-4 text-sm font-bold text-white hover:bg-orange-600 transition-colors group/btn"
        >
          Selecionar para Orçamento
          <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}

export default function FleetGallery({ onSelect }: FleetGalleryProps) {
  const [filter, setFilter] = useState<AircraftType | 'Todos'>('Todos');

  const filteredFleet = filter === 'Todos' 
    ? FLEET 
    : FLEET.filter(a => a.type === filter);

  const filterOptions: (AircraftType | 'Todos')[] = ['Todos', 'Helicóptero', 'Turboélice', 'Jato'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">Nossa Frota</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Escolha a aeronave ideal para sua missão. Do helicóptero ágil ao jato executivo de longo alcance.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {filterOptions.map((option) => (
          <button
            key={option}
            onClick={() => setFilter(option)}
            className={cn(
              "px-6 py-2.5 rounded-full text-sm font-semibold transition-all border",
              filter === option 
                ? "bg-orange-600 text-white border-orange-600 shadow-lg shadow-orange-200" 
                : "bg-white text-slate-600 border-slate-200 hover:border-orange-300 hover:text-orange-600"
            )}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredFleet.map((aircraft, index) => (
          <div key={aircraft.id}>
            <AircraftCard 
              aircraft={aircraft} 
              index={index} 
              onSelect={onSelect} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}

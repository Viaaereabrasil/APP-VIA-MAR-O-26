import { useState, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Users, User, MessageSquare, MapPin, ChevronRight, CreditCard } from 'lucide-react';
import { WHATSAPP_LINK } from '../constants';
import { cn } from '../lib/utils';

const TOURS_DATA = {
  buzios: {
    title: 'Búzios & Região dos Lagos',
    bgImage: 'https://media-cdn.tripadvisor.com/media/photo-s/0f/93/13/19/vista-aerea-de-la-peninsula.jpg',
    description: 'Explore as belezas de Búzios, Cabo Frio e Arraial do Cabo de um ângulo privilegiado.',
    items: [
      {
        id: 'essencial',
        name: 'Búzios Essencial',
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/0f/93/13/19/vista-aerea-de-la-peninsula.jpg',
        duration: '05-07 Minutos',
        sharedPrice: '445,00',
        exclusivePrice: '1.335,00',
        color: 'bg-orange-500',
        textColor: 'text-orange-600',
        borderColor: 'border-orange-100',
        hoverBorder: 'hover:border-orange-300',
        iconColor: 'bg-orange-600',
      },
      {
        id: '360',
        name: 'Búzios 360°',
        image: 'https://www.viagensecaminhos.com/wp-content/uploads/2016/05/buzios-imagem-aerea-1.jpg',
        duration: '09-11 Minutos',
        sharedPrice: '660,00',
        exclusivePrice: '1.980,00',
        color: 'bg-green-500',
        textColor: 'text-green-600',
        borderColor: 'border-green-100',
        hoverBorder: 'hover:border-green-300',
        iconColor: 'bg-green-600',
      },
      {
        id: 'cabo-frio',
        name: 'Cabo Frio Azul',
        image: 'https://c1.wallpaperflare.com/preview/391/155/827/beaches-cabo-frio-rio-de-janeiro.jpg',
        duration: '22-25 Minutos',
        sharedPrice: '1.220,00',
        exclusivePrice: '3.360,00',
        color: 'bg-pink-500',
        textColor: 'text-pink-600',
        borderColor: 'border-pink-100',
        hoverBorder: 'hover:border-pink-300',
        iconColor: 'bg-pink-600',
      },
      {
        id: 'arraial',
        name: 'Arraial dos Sonhos',
        image: 'https://i0.wp.com/costadosol.tur.br/wp-content/uploads/2020/07/Praias-Arraial-do-Cabo.png?fit=1396%2C800&ssl=1',
        duration: '30-35 Minutos',
        sharedPrice: '1.650,00',
        exclusivePrice: '4.950,00',
        color: 'bg-blue-500',
        textColor: 'text-blue-600',
        borderColor: 'border-blue-100',
        hoverBorder: 'hover:border-blue-300',
        iconColor: 'bg-blue-600',
      }
    ]
  },
  rj: {
    title: 'Rio de Janeiro (Barra)',
    bgImage: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&q=80&w=1920',
    description: 'Sobrevoe a Cidade Maravilhosa com saída exclusiva do Campo Olímpico de Golfe na Barra da Tijuca.',
    location: 'HELIPONTO Golf Olimpico (exclusivo) - Campo Olímpico de Golfe, Barra da Tijuca',
    paymentInfo: 'Dinheiro/Pix ou Cartão (5% taxa). Parcelamento em até 3x.',
    items: [
      {
        id: 'rj-15min',
        name: 'Rio 15-20 Min',
        image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&q=80&w=800',
        duration: '15-20 Minutos',
        exclusivePrice: '1.850,00',
        exclusivePrice4: '3.150,00',
        color: 'bg-slate-400',
        textColor: 'text-slate-600',
        borderColor: 'border-slate-100',
        hoverBorder: 'hover:border-slate-300',
        iconColor: 'bg-slate-600',
        highlights: ['Cristo Redentor', 'Lagoa Rodrigo de Freitas', 'Ipanema', 'Leblon', 'Floresta da Tijuca', 'Barra da Tijuca', 'Pedra da Gávea', 'São Conrado', 'Jockey Clube', 'Joatinga']
      },
      {
        id: 'rj-25min',
        name: 'Rio 25-30 Min',
        image: 'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?auto=format&fit=crop&q=80&w=800',
        duration: '25-30 Minutos',
        exclusivePrice: '2.240,00',
        exclusivePrice4: '3.600,00',
        color: 'bg-blue-400',
        textColor: 'text-blue-600',
        borderColor: 'border-blue-100',
        hoverBorder: 'hover:border-blue-300',
        iconColor: 'bg-blue-600',
        highlights: ['Cristo Redentor', 'Pão de Açúcar', 'Copacabana', 'Ipanema', 'Leblon', 'Arpoador', 'Urca', 'Praia Vermelha', 'Lagoa', 'Pedra da Gávea', 'Leme']
      },
      {
        id: 'rj-40min',
        name: 'Rio 40-45 Min',
        image: 'https://www.latamairlines.com/content/dam/latamxp/sites/destinos/brasil/deals/RIO-deals.jpg',
        duration: '40-45 Minutos',
        exclusivePrice: '3.450,00',
        exclusivePrice4: '4.900,00',
        color: 'bg-yellow-400',
        textColor: 'text-yellow-600',
        borderColor: 'border-yellow-100',
        hoverBorder: 'hover:border-yellow-300',
        iconColor: 'bg-yellow-600',
        highlights: ['Cristo Redentor', 'Pão de Açúcar', 'Maracanã', 'Sambódromo', 'Niterói (MAC)', 'Baía de Guanabara', 'Centro', 'Arcos da Lapa', 'Museu do Amanhã', 'Ponte Rio-Niterói', 'Marina da Glória', 'Escadaria Selaron']
      },
      {
        id: 'rj-55min',
        name: 'Rio 55-60 Min',
        image: 'https://www.cvc.com.br/dicas-de-viagem/wp-content/uploads/2017/11/rio-de-janeiro-vista-aerea-thinkstock-473089840.jpg',
        duration: '55-60 Minutos',
        exclusivePrice: '4.600,00',
        exclusivePrice4: '6.200,00',
        color: 'bg-green-400',
        textColor: 'text-green-600',
        borderColor: 'border-green-100',
        hoverBorder: 'hover:border-green-300',
        iconColor: 'bg-green-600',
        highlights: ['Cristo Redentor', 'Pão de Açúcar', 'Prainha', 'Grumari', 'Recreio', 'Praia do Secreto', 'Mirante do Caeté', 'Pedra do Pontal', 'Praia da Reserva', 'Maracanã', 'Praia da Macumba', 'Pontal']
      }
    ]
  },
  bh: {
    title: 'Belo Horizonte (Pampulha)',
    bgImage: 'https://cdn.imaginbrasil.com.br/wp-content/uploads/2025/08/28230824/thumb.0000001-456.jpg',
    description: 'Sobrevoe os principais pontos turísticos da capital mineira com saída do Aeroporto da Pampulha.',
    items: [
      {
        id: 'bh-opcao-1',
        name: 'BH Opção 1',
        image: 'https://i.redd.it/899i28kcpfb21.jpg',
        duration: '15 Minutos',
        sharedPrice: null,
        exclusivePrice: '1.799,00',
        color: 'bg-amber-500',
        textColor: 'text-amber-600',
        borderColor: 'border-amber-100',
        hoverBorder: 'hover:border-amber-300',
        iconColor: 'bg-amber-600',
        highlights: ['Lagoa da Pampulha', 'Mineirão', 'Praça Sete', 'Parque Municipal', 'Praça da Liberdade']
      },
      {
        id: 'bh-opcao-2',
        name: 'BH Opção 2',
        image: 'https://i.pinimg.com/originals/e2/45/af/e245af0bfe5e73e4cdeb6065535b60c4.jpg',
        duration: '30 Minutos',
        sharedPrice: null,
        exclusivePrice: '2.500,00',
        color: 'bg-indigo-500',
        textColor: 'text-indigo-600',
        borderColor: 'border-indigo-100',
        hoverBorder: 'hover:border-indigo-300',
        iconColor: 'bg-indigo-600',
        highlights: ['Serra do Curral', 'Praça do Papa', 'Topo do Mundo', 'BH Shopping', 'Arena MRV']
      },
      {
        id: 'bh-opcao-3',
        name: 'BH Opção 3',
        image: 'https://bhaz.com.br/wp-content/uploads/2018/02/Topo-do-Mundo-Credito-para-@melohunterdrone-1.jpg',
        duration: '60 Minutos',
        sharedPrice: null,
        exclusivePrice: '4.599,00',
        color: 'bg-emerald-500',
        textColor: 'text-emerald-600',
        borderColor: 'border-emerald-100',
        hoverBorder: 'hover:border-emerald-300',
        iconColor: 'bg-emerald-600',
        highlights: ['Roteiro a definir', 'Aproximadamente 60 min', 'Personalizado']
      }
    ]
  },
  trancoso: {
    title: 'Trancoso (Trama Club)',
    bgImage: 'https://viaaereabr.com.br/wp-content/uploads/2025/05/Quadrado-Trancoso-Bahia.png',
    description: 'Saídas exclusivas do Heliponto Trama Club. Explore o litoral sul da Bahia, de Trancoso a Caraíva ou Santo André.',
    location: 'Heliponto Trama Club, Trancoso - BA',
    paymentInfo: '',
    items: [
      {
        id: 'trancoso-12min',
        name: 'Praia dos Nativos',
        image: 'https://www.flyflapper.com/stories/wp-content/uploads/2020/12/trancoso-praia-taipe.jpg',
        duration: '12 Minutos',
        exclusivePrice: '1.800,00',
        color: 'bg-emerald-500',
        textColor: 'text-emerald-600',
        borderColor: 'border-emerald-100',
        hoverBorder: 'hover:border-emerald-300',
        iconColor: 'bg-emerald-600',
        highlights: ['Trancoso', 'Praia dos Nativos']
      },
      {
        id: 'trancoso-18min-sul',
        name: 'Espelho & Itapororoca',
        image: 'https://ateondeeupuderir.com/wp-content/uploads/elementor/thumbs/praia-do-espelho-capa-r944cnwt9dw8j38rx0rp2k57nf7xhp6bi68usupe9c.jpg',
        duration: '18 Minutos',
        exclusivePrice: '2.600,00',
        color: 'bg-blue-500',
        textColor: 'text-blue-600',
        borderColor: 'border-blue-100',
        hoverBorder: 'hover:border-blue-300',
        iconColor: 'bg-blue-600',
        highlights: ['Trancoso', 'Itapororoca', 'Itaquena', 'Praia do Espelho']
      },
      {
        id: 'trancoso-18min-norte',
        name: 'Arraial & Taípe',
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/3d/d4/0f/praia-de-taipe.jpg?w=900&h=500&s=1',
        duration: '18 Minutos',
        exclusivePrice: '2.600,00',
        color: 'bg-orange-500',
        textColor: 'text-orange-600',
        borderColor: 'border-orange-100',
        hoverBorder: 'hover:border-orange-300',
        iconColor: 'bg-orange-600',
        highlights: ['Trancoso', 'Praia do Taípe', 'Arraial d\'Ajuda']
      },
      {
        id: 'trancoso-30min-caraiva',
        name: 'Rumo a Caraíva',
        image: 'https://www.caraiva.net.br/images/slide-0.jpg',
        duration: '30 Minutos',
        exclusivePrice: '4.300,00',
        color: 'bg-indigo-500',
        textColor: 'text-indigo-600',
        borderColor: 'border-indigo-100',
        hoverBorder: 'hover:border-indigo-300',
        iconColor: 'bg-indigo-600',
        highlights: ['Trancoso', 'Itapororoca', 'Itaquena', 'Praia do Espelho', 'Caraíva']
      },
      {
        id: 'trancoso-42min-corumbau',
        name: 'Ponta do Corumbáu',
        image: 'https://embarqueoficial.com.br/wp-content/uploads/2024/12/passeio-helicoptero-porto-seguro-voo-exclusivo-corumbau-ba.jpg',
        duration: '42 Minutos',
        exclusivePrice: '6.000,00',
        color: 'bg-rose-500',
        textColor: 'text-rose-600',
        borderColor: 'border-rose-100',
        hoverBorder: 'hover:border-rose-300',
        iconColor: 'bg-rose-600',
        highlights: ['Trancoso', 'Caraíva', 'Aldeia Indígena', 'Ponta do Corumbáu']
      }
    ]
  },
  ribeirao: {
    title: 'Ribeirão Preto',
    bgImage: 'https://img.cdndsgni.com/preview/10152047.jpg',
    description: 'Desfrute de um passeio panorâmico pelos pontos turísticos mais belos de Ribeirão Preto em nosso modelo Airbus.',
    paymentInfo: 'Aeronave decola com mínimo de 5 passageiros ou pagamento proporcional.',
    items: [
      {
        id: 'rp-6min',
        name: 'Ribeirão Essencial',
        images: [
          'https://virtualieventos.com.br/wp-content/uploads/2025/04/ribeirao-preto.jpg',
          'https://m.ahstatic.com/is/image/accorhotels/o-que-fazer-em-ribeirao-preto-2024-2:3by2?fmt=jpg&op_usm=1.75,0.3,2,0&resMode=sharp2&iccEmbed=true&icc=sRGB&dpr=on,1.3&wid=335&hei=223&qlt=80',
          'https://www.transportal.com.br/noticias/wp-content/uploads/2018/12/Ribeir%C3%A3o-Preto.jpg'
        ],
        duration: '06 Minutos',
        sharedPrice: '300,00',
        exclusivePrice: '1.500,00',
        capacity: 5,
        color: 'bg-blue-500',
        textColor: 'text-blue-600',
        borderColor: 'border-blue-100',
        hoverBorder: 'hover:border-blue-300',
        iconColor: 'bg-blue-600',
        highlights: ['Pontos turísticos de Ribeirão Preto', 'Voo em Airbus', 'Capacidade até 5 pessoas']
      },
      {
        id: 'rp-12min',
        name: 'Ribeirão Completo',
        images: [
          'https://www.creditoreal.com.br/blog/wp-content/uploads/2025/06/GettyImages-1347169103-2000x1124.jpg',
          'https://sejadigital.com.br/nossahistoria/wp-content/uploads/2018/03/Ribeir%C3%A3o-Ribeir%C3%A3o-Preto-e-regi%C3%A3o-s%C3%A3o-100-digitais_edit-768x510.png',
          'https://img.cdndsgni.com/preview/10152047.jpg'
        ],
        duration: '12 Minutos',
        sharedPrice: '600,00',
        exclusivePrice: '3.000,00',
        capacity: 5,
        color: 'bg-purple-500',
        textColor: 'text-purple-600',
        borderColor: 'border-purple-100',
        hoverBorder: 'hover:border-purple-300',
        iconColor: 'bg-purple-600',
        highlights: ['Tour panorâmico estendido', 'Voo em Airbus', 'Capacidade até 5 pessoas']
      }
    ]
  }
};

function TourCard({ tour, index, activeRegion }: any) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = tour.images || [tour.image];

  const nextImage = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "relative overflow-hidden rounded-[2.5rem] bg-white border transition-all hover:shadow-2xl group flex flex-col",
        tour.borderColor,
        tour.hoverBorder
      )}
    >
      {/* Header Color Strip */}
      <div className={cn("h-3 w-full", tour.color)} />
      
      {/* Tour Image Carousel */}
      <div className="h-48 w-full overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.img 
            key={currentImageIndex}
            src={images[currentImageIndex]} 
            alt={tour.name} 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
        
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50"
            >
              <ChevronRight size={16} className="rotate-180" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50"
            >
              <ChevronRight size={16} />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_: any, i: number) => (
                <div 
                  key={i} 
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all",
                    i === currentImageIndex ? "bg-white w-3" : "bg-white/50"
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-8 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-6">
          <MapPin size={18} className={tour.textColor} />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Roteiro</span>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 mb-2">{tour.name}</h3>
        
        <div className="flex items-center gap-2 text-slate-500 mb-6">
          <Clock size={16} />
          <span className="text-sm font-medium">{tour.duration} de voo</span>
        </div>

        {tour.highlights && (
          <div className="mb-6 space-y-2">
            {tour.highlights.slice(0, 3).map((h: string) => (
              <div key={h} className="flex items-center gap-2 text-xs text-slate-500">
                <ChevronRight size={12} className={tour.textColor} />
                <span>{h}</span>
              </div>
            ))}
            {tour.highlights.length > 3 && (
              <p className="text-[10px] text-slate-400 italic">+ outros pontos turísticos</p>
            )}
          </div>
        )}

        <div className="space-y-4 mb-8 mt-auto">
          {tour.sharedPrice && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 mb-1">
                <Users size={16} className="text-slate-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Voo Compartilhado</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-bold text-slate-900">R$</span>
                <span className="text-2xl font-black text-slate-900">{tour.sharedPrice}</span>
                <span className="text-[10px] font-medium text-slate-500 ml-1">/pessoa</span>
              </div>
            </div>
          )}

          <div className="p-4 rounded-2xl bg-slate-900 text-white">
            <div className="flex items-center gap-2 mb-1">
              <Users size={16} className="text-slate-400" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Voo Exclusivo</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-bold text-white">R$</span>
                <span className="text-2xl font-black text-white">{tour.exclusivePrice}</span>
                <span className="text-[10px] text-slate-400 ml-1">(Até {tour.capacity || 3} pessoas)</span>
              </div>
              {tour.exclusivePrice4 && (
                <div className="flex items-baseline gap-1 pt-2 border-t border-white/10">
                  <span className="text-sm font-bold text-white">R$</span>
                  <span className="text-2xl font-black text-white">{tour.exclusivePrice4}</span>
                  <span className="text-[10px] text-slate-400 ml-1">(4 pessoas)</span>
                </div>
              )}
            </div>
            {!tour.exclusivePrice4 && (
              <p className="text-[9px] text-slate-400 mt-1">Capacidade para até {tour.capacity || 3} pessoas</p>
            )}
          </div>
        </div>

        <a
          href={`${WHATSAPP_LINK}?text=Olá! Gostaria de reservar o passeio panorâmico em ${TOURS_DATA[activeRegion as keyof typeof TOURS_DATA].title}: ${tour.name}.`}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "w-full py-4 rounded-2xl text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-black/5",
            tour.iconColor
          )}
        >
          Reservar Agora
          <MessageSquare size={18} />
        </a>
      </div>
    </motion.div>
  );
}

export default function PanoramicTours() {
  const [activeRegion, setActiveRegion] = useState<'buzios' | 'bh' | 'rj' | 'trancoso' | 'ribeirao'>('buzios');
  const region = TOURS_DATA[activeRegion];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">Passeios Panorâmicos</h2>
        
        {/* Region Selector */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <button
            onClick={() => setActiveRegion('buzios')}
            className={cn(
              "px-6 py-3 rounded-full font-bold transition-all border-2",
              activeRegion === 'buzios' 
                ? "bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-600/20" 
                : "bg-white border-slate-200 text-slate-500 hover:border-orange-200"
            )}
          >
            Búzios & Lagos
          </button>
          <button
            onClick={() => setActiveRegion('rj')}
            className={cn(
              "px-6 py-3 rounded-full font-bold transition-all border-2",
              activeRegion === 'rj' 
                ? "bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-600/20" 
                : "bg-white border-slate-200 text-slate-500 hover:border-orange-200"
            )}
          >
            Rio de Janeiro
          </button>
          <button
            onClick={() => setActiveRegion('bh')}
            className={cn(
              "px-6 py-3 rounded-full font-bold transition-all border-2",
              activeRegion === 'bh' 
                ? "bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-600/20" 
                : "bg-white border-slate-200 text-slate-500 hover:border-orange-200"
            )}
          >
            Belo Horizonte
          </button>
          <button
            onClick={() => setActiveRegion('trancoso')}
            className={cn(
              "px-6 py-3 rounded-full font-bold transition-all border-2",
              activeRegion === 'trancoso' 
                ? "bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-600/20" 
                : "bg-white border-slate-200 text-slate-500 hover:border-orange-200"
            )}
          >
            Trancoso
          </button>
          <button
            onClick={() => setActiveRegion('ribeirao')}
            className={cn(
              "px-6 py-3 rounded-full font-bold transition-all border-2",
              activeRegion === 'ribeirao' 
                ? "bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-600/20" 
                : "bg-white border-slate-200 text-slate-500 hover:border-orange-200"
            )}
          >
            Ribeirão Preto
          </button>
        </div>
      </div>

      <div className="mb-16 relative rounded-[3rem] overflow-hidden min-h-[400px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRegion}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-0"
          >
            <img 
              src={region.bgImage} 
              alt={region.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
          </motion.div>
        </AnimatePresence>

        <motion.div
          key={`content-${activeRegion}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-6 py-12"
        >
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">{region.title}</h3>
          <p className="text-slate-200 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            {region.description}
          </p>
          
          {(region.location || region.paymentInfo) && (
            <div className="flex flex-col items-center gap-3 mt-8">
              {region.location ? (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white">
                  <MapPin size={18} className="text-orange-400" />
                  <span className="font-medium text-sm md:text-base">{region.location}</span>
                </div>
              ) : null}
              {region.paymentInfo ? (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-600/20 backdrop-blur-md border border-orange-600/30 text-orange-200">
                  <CreditCard size={18} className="text-orange-400" />
                  <span className="font-medium text-sm md:text-base">{region.paymentInfo}</span>
                </div>
              ) : null}
            </div>
          )}
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeRegion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {region.items.map((tour, index) => (
            <TourCard key={tour.id} tour={tour} index={index} activeRegion={activeRegion} />
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="mt-16 p-8 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">Dúvidas sobre os passeios?</h3>
            <p className="text-slate-400">Fale com nossa equipe agora mesmo pelo WhatsApp.</p>
          </div>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 bg-green-600 rounded-full font-bold hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <MessageSquare size={20} />
            Chamar no WhatsApp
          </a>
        </div>
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl -mr-32 -mt-32" />
      </div>
    </div>
  );
}

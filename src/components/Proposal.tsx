import { loadStripe } from '@stripe/stripe-js';
import { motion } from 'motion/react';
import { CheckCircle2, Download, MessageSquare, CreditCard, ArrowLeft, MapPin, Calendar, Clock, Plane, Users, ShieldCheck, Loader2, Share2 } from 'lucide-react';
import { Budget, Aircraft } from '../types';
import { FLEET, CITIES, WHATSAPP_LINK } from '../constants';
import { cn } from '../lib/utils';
import { useState } from 'react';

interface ProposalProps {
  data: Budget;
  onReset: () => void;
}

export default function Proposal({ data, onReset }: ProposalProps) {
  const [isPaying, setIsPaying] = useState(false);
  const aircraft = FLEET.find(a => a.id === data.aircraftId) || FLEET[0];
  const origin = CITIES.find(c => c.name === data.origin);
  const destination = CITIES.find(c => c.name === data.destination);

  // Simple price calculation for display
  const calculatePrice = () => {
    // Re-calculating for display consistency
    const R = 6371;
    const deg2rad = (deg: number) => deg * (Math.PI / 180);
    const dLat = deg2rad((destination?.lat || 0) - (origin?.lat || 0));
    const dLon = deg2rad((destination?.lng || 0) - (origin?.lng || 0));
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(origin?.lat || 0)) * Math.cos(deg2rad(destination?.lat || 0)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const dist = R * c;

    let speed = 200;
    if (aircraft.type === 'Turboélice') speed = 450;
    if (aircraft.type === 'Jato') speed = 800;

    const dur = dist / speed;
    const flightCost = dur * aircraft.pricePerHour;
    const total = flightCost * 1.2 + (data.pets ? 500 : 0) + (data.extraLuggage ? 300 : 0);
    return { total, dist, dur };
  };

  const { total, dist, dur } = calculatePrice();

  const getProposalSummary = () => {
    return `Olá! Gostaria de confirmar o orçamento gerado pelo app:\n\n` +
      `Rota: ${data.origin} -> ${data.destination}\n` +
      `Data: ${data.date} às ${data.time}\n` +
      `Aeronave: ${aircraft.model}\n` +
      `Passageiros: ${data.passengers}\n` +
      `Total Estimado: R$ ${total.toLocaleString('pt-BR')}\n\n` +
      `Pode me ajudar com a reserva?`;
  };

  const handleWhatsAppShare = () => {
    window.open(`${WHATSAPP_LINK}?text=${encodeURIComponent(getProposalSummary())}`, '_blank');
  };

  const handleGenericShare = async () => {
    const shareData = {
      title: 'Proposta Via Aérea Brasil',
      text: getProposalSummary(),
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Erro ao compartilhar:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareData.text}\n\nLink: ${shareData.url}`);
        alert('Resumo da proposta copiado para a área de transferência!');
      } catch (err) {
        console.error('Erro ao copiar:', err);
      }
    }
  };

  const handlePayment = async () => {
    try {
      setIsPaying(true);
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: total,
          description: `Fretamento ${aircraft.model}: ${data.origin} para ${data.destination} - ${new Date(data.date).toLocaleDateString('pt-BR')} às ${data.time} (${data.passengers} passageiros)`,
          successUrl: `${window.location.origin}?payment=success`,
          cancelUrl: `${window.location.origin}?payment=cancel`,
        }),
      });

      if (!response.ok) {
        throw new Error('Falha ao criar sessão de pagamento');
      }

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('URL de pagamento não recebida');
      }
    } catch (error) {
      console.error('Erro no pagamento:', error);
      alert('Houve um erro ao processar o pagamento. Por favor, tente novamente ou entre em contato via WhatsApp.');
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-600 font-medium mb-8 transition-colors"
      >
        <ArrowLeft size={18} />
        Voltar para Calculadora
      </button>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-orange-600 p-8 sm:p-12 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Plane size={120} />
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm p-3 rounded-2xl mb-6">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">Proposta Gerada com Sucesso!</h2>
            <p className="text-orange-100 font-medium">Válida por 48 horas • Ref: VAB-{Math.floor(Math.random() * 10000)}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 sm:p-12 space-y-12">
          {/* Route Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="text-center md:text-left">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Origem</p>
              <p className="text-2xl font-bold text-slate-900">{data.origin}</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-full h-px bg-slate-100 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4">
                  <Plane className="text-orange-600 rotate-90" size={24} />
                </div>
              </div>
              <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">{Math.round(dist)} km</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Destino</p>
              <p className="text-2xl font-bold text-slate-900">{data.destination}</p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Calendar size={12} className="text-orange-600" /> Data
              </p>
              <p className="text-sm font-bold text-slate-900">{new Date(data.date).toLocaleDateString('pt-BR')}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Clock size={12} className="text-orange-600" /> Horário
              </p>
              <p className="text-sm font-bold text-slate-900">{data.time}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Plane size={12} className="text-orange-600" /> Aeronave
              </p>
              <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Plane size={14} className="text-orange-600" />
                {aircraft.model}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Users size={12} className="text-orange-600" /> Passageiros
              </p>
              <p className="text-sm font-bold text-slate-900">{data.passengers} pax</p>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="aspect-video bg-slate-100 rounded-3xl overflow-hidden relative border border-slate-200">
            <img 
              src={`https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200`} 
              alt="Mapa da Rota" 
              className="w-full h-full object-cover opacity-50 grayscale"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-xl text-center border border-slate-200">
                <MapPin className="text-orange-600 mx-auto mb-2" size={32} />
                <p className="font-bold text-slate-900">Visualização da Rota</p>
                <p className="text-sm text-slate-500">Belo Horizonte → Rio de Janeiro</p>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">Detalhamento Financeiro</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-slate-600">
                <span>Voo ({Math.floor(dur)}h {Math.round((dur % 1) * 60)}min)</span>
                <span className="font-medium">R$ {(total * 0.8).toLocaleString('pt-BR')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Taxas Aeroportuárias e ANAC</span>
                <span className="font-medium">R$ {(total * 0.1).toLocaleString('pt-BR')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Serviços de Bordo e Extras</span>
                <span className="font-medium">R$ {(total * 0.1).toLocaleString('pt-BR')}</span>
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-between items-end">
                <div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Total da Proposta</p>
                  <p className="text-4xl font-black text-orange-600">R$ {total.toLocaleString('pt-BR')}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Parcelamento</p>
                  <p className="text-lg font-bold text-slate-900">3x de R$ {(total / 3).toLocaleString('pt-BR')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 gap-4 pt-8">
            <button
              onClick={handleWhatsAppShare}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-green-600/20 hover:bg-green-700 transition-all"
            >
              <MessageSquare size={20} />
              WhatsApp
            </button>
            <button
              onClick={handleGenericShare}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all"
            >
              <Share2 size={20} />
              Compartilhar Proposta
            </button>
            <button
              onClick={handlePayment}
              disabled={isPaying}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-orange-600/20 hover:bg-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPaying ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <CreditCard size={20} />
              )}
              {isPaying ? 'Processando...' : 'Pagar Agora (Stripe)'}
            </button>
            <button
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-8 py-4 text-lg font-bold text-slate-600 hover:bg-slate-200 transition-all"
            >
              <Download size={20} />
              Baixar Proposta em PDF
            </button>
          </div>

          {/* Trust */}
          <div className="flex items-center justify-center gap-8 pt-8 border-t border-slate-100">
            <div className="flex items-center gap-2 text-slate-400">
              <ShieldCheck size={20} />
              <span className="text-xs font-bold uppercase tracking-widest">Homologado ANAC</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <ShieldCheck size={20} />
              <span className="text-xs font-bold uppercase tracking-widest">Pagamento Seguro</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useTransition } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plane, Car, Shield, Users, Calculator, Download, MessageSquare, MapPin, ArrowRight, CreditCard, CheckCircle2, ExternalLink, Search } from 'lucide-react';
import { cn } from '../lib/utils';
import { WHATSAPP_LINK } from '../constants';

export default function TravelPackages() {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    flightType: 'comercial',
    insuranceDays: 7,
    carDays: 3,
    passengers: 2
  });

  const updateField = (field: string, value: any) => {
    startTransition(() => {
      setFormData(prev => ({ ...prev, [field]: value }));
    });
  };

  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<{
    total: number;
    flightCost: number;
    insuranceCost: number;
    carCost: number;
    show: boolean;
    flightDetails?: {
      duration: string;
      airline: string;
      stops: string;
    };
  } | null>(null);

  const calculate = async () => {
    setIsSearching(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const flightBase = formData.flightType === 'comercial' ? 299 : 12000;
    const flightCost = flightBase * formData.passengers;
    const insuranceCost = 15 * formData.insuranceDays * formData.passengers;
    const carCost = 150 * formData.carDays;
    
    const total = flightCost + insuranceCost + carCost;
    
    const airlines = ['LATAM', 'GOL', 'Azul', 'Via Aérea Partner'];
    const simulatedAirline = airlines[Math.floor(Math.random() * airlines.length)];
    
    setResult({
      total,
      flightCost,
      insuranceCost,
      carCost,
      show: true,
      flightDetails: formData.flightType === 'comercial' ? {
        duration: '1h 25m',
        airline: simulatedAirline,
        stops: 'Direto'
      } : undefined
    });
    setIsSearching(false);
  };

  const generatePDF = async () => {
    if (!result) return;
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(234, 88, 12); // Orange-600
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('Via Aérea Brasil', 20, 25);
    doc.setFontSize(12);
    doc.text('Proposta de Pacote Personalizado', 20, 33);
    
    // Content
    doc.setTextColor(30, 41, 59); // Slate-800
    doc.setFontSize(16);
    doc.text('Resumo da Viagem', 20, 55);
    
    doc.setFontSize(12);
    doc.text(`Origem: ${formData.origin}`, 20, 65);
    doc.text(`Destino: ${formData.destination}`, 20, 72);
    doc.text(`Passageiros: ${formData.passengers}`, 20, 79);
    doc.text(`Tipo de Voo: ${formData.flightType === 'comercial' ? 'Comercial' : 'Fretamento'}`, 20, 86);
    
    doc.setDrawColor(226, 232, 240); // Slate-200
    doc.line(20, 95, 190, 95);
    
    doc.text('Detalhamento de Custos', 20, 105);
    doc.text(`Voo: R$ ${result.flightCost.toLocaleString('pt-BR')}`, 20, 115);
    doc.text(`Seguro Viagem (${formData.insuranceDays} dias): R$ ${result.insuranceCost.toLocaleString('pt-BR')}`, 20, 122);
    doc.text(`Aluguel de Carro (${formData.carDays} dias): R$ ${result.carCost.toLocaleString('pt-BR')}`, 20, 129);
    
    doc.setFontSize(18);
    doc.setTextColor(234, 88, 12); // Orange-600
    doc.text(`Total: R$ ${result.total.toLocaleString('pt-BR')},00`, 20, 145);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139); // Slate-500
    doc.text('Validade: 48h | Parcelado em até 3x | Certificado ANAC', 20, 160);
    doc.text('Para confirmar sua reserva, entre em contato via WhatsApp.', 20, 165);
    
    doc.save('proposta_via_aerea_brasil.pdf');
  };

  const getWhatsAppLink = () => {
    if (!result) return WHATSAPP_LINK;
    const text = `Olá! Gostaria de confirmar o pacote personalizado gerado pelo app:\n\n` +
      `Rota: ${formData.origin} -> ${formData.destination}\n` +
      `Voo: ${formData.flightType === 'comercial' ? 'Comercial' : 'Fretamento'}\n` +
      `Passageiros: ${formData.passengers}\n` +
      `Seguro: ${formData.insuranceDays} dias\n` +
      `Carro: ${formData.carDays} dias\n` +
      `Total: R$ ${result.total.toLocaleString('pt-BR')}\n\n` +
      `Pode me ajudar com a reserva?`;
    return `${WHATSAPP_LINK}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">Pacotes & Reservas</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Monte seu pacote personalizado ou utilize nosso portal de autoatendimento para voos comerciais e hotéis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Portal Card */}
        <div className="lg:col-span-3">
          <a 
            href="https://www.comprarviagem.com.br/viaaereabrasil/home"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block overflow-hidden rounded-[2.5rem] bg-slate-900 p-8 text-white shadow-2xl transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-orange-600/20 blur-3xl group-hover:bg-orange-600/30 transition-colors" />
            
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm group-hover:bg-orange-600 transition-colors">
                  <Search size={32} className="text-orange-500 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">Portal de Reservas Online</h3>
                  <p className="text-slate-400 text-sm max-w-md">
                    Passagens comerciais em todo o mundo, hotéis e pacotes turísticos com as melhores tarifas do mercado.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 px-6 py-3 bg-white/10 rounded-full font-bold text-sm group-hover:bg-orange-600 transition-all">
                Acessar Portal Completo
                <ExternalLink size={16} />
              </div>
            </div>
          </a>
        </div>

        {/* Form */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl p-8 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <Calculator className="text-orange-600" size={20} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Simulador de Pacote</h3>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <MapPin size={14} className="text-orange-600" /> Origem
                </label>
                <input
                  type="text"
                  placeholder="Ex: Belo Horizonte"
                  defaultValue={formData.origin}
                  onChange={(e) => updateField('origin', e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <MapPin size={14} className="text-orange-600" /> Destino
                </label>
                <input
                  type="text"
                  placeholder="Ex: Rio de Janeiro"
                  defaultValue={formData.destination}
                  onChange={(e) => updateField('destination', e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Plane size={14} className="text-orange-600" /> Tipo de Voo
              </label>
              <select
                value={formData.flightType}
                onChange={(e) => updateField('flightType', e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all appearance-none"
              >
                <option value="comercial">Passagem Comercial (R$ 299 médio)</option>
                <option value="fretamento">Fretamento Heli/Jato (R$ 12.000/pax)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Shield size={14} className="text-orange-600" /> Seguro (dias)
                </label>
                <input
                  type="number"
                  min="1"
                  defaultValue={formData.insuranceDays}
                  onChange={(e) => updateField('insuranceDays', parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Car size={14} className="text-orange-600" /> Carro (dias)
                </label>
                <input
                  type="number"
                  min="0"
                  defaultValue={formData.carDays}
                  onChange={(e) => updateField('carDays', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Users size={14} className="text-orange-600" /> Passageiros
                </label>
                <input
                  type="number"
                  min="1"
                  defaultValue={formData.passengers}
                  onChange={(e) => updateField('passengers', parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                />
              </div>
            </div>
          </div>

          <button
            onClick={calculate}
            disabled={isSearching || !formData.origin || !formData.destination}
            className="w-full py-4 rounded-2xl bg-orange-600 text-white font-bold text-lg shadow-lg shadow-orange-600/20 hover:bg-orange-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSearching ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Search size={20} />
                </motion.div>
                Buscando Melhores Tarifas...
              </>
            ) : (
              <>
                <Calculator size={20} />
                Simular Custo de Voo
              </>
            )}
          </button>
        </div>

        {/* Result */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-12 text-center"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <Calculator className="text-slate-300" size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-400 mb-2">Aguardando Cálculo</h3>
                <p className="text-slate-400 text-sm">Preencha os dados ao lado para gerar sua proposta personalizada.</p>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[2.5rem] border border-orange-100 shadow-2xl overflow-hidden flex flex-col h-full"
              >
                <div className="bg-orange-600 p-8 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle2 size={24} />
                    <h3 className="text-2xl font-bold">Pacote Personalizado</h3>
                  </div>
                  <p className="text-orange-100 text-sm">Proposta gerada com sucesso!</p>
                </div>

                <div className="p-8 flex-1 space-y-6">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <MapPin className="text-orange-600" size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Rota</p>
                        <p className="font-bold text-slate-900">{formData.origin} <ArrowRight size={12} className="inline mx-1" /> {formData.destination}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {result.flightDetails && (
                      <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 mb-2">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">Voo Comercial Simulado</span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{result.flightDetails.airline}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Plane size={14} className="text-orange-600" />
                            <span className="text-sm font-bold text-slate-900">{result.flightDetails.duration}</span>
                          </div>
                          <span className="text-xs text-slate-500">{result.flightDetails.stops}</span>
                        </div>
                      </div>
                    )}
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Voo ({formData.flightType === 'comercial' ? 'Comercial' : 'Fretamento'})</span>
                      <span className="font-bold text-slate-900">R$ {result.flightCost.toLocaleString('pt-BR')}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Seguro Viagem ({formData.insuranceDays} dias)</span>
                      <span className="font-bold text-slate-900">R$ {result.insuranceCost.toLocaleString('pt-BR')}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Aluguel de Carro ({formData.carDays} dias)</span>
                      <span className="font-bold text-slate-900">R$ {result.carCost.toLocaleString('pt-BR')}</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total do Pacote</p>
                        <p className="text-4xl font-black text-orange-600">R$ {result.total.toLocaleString('pt-BR')}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Parcelamento</p>
                        <p className="text-lg font-bold text-slate-900">3x R$ {(result.total / 3).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <button
                      onClick={generatePDF}
                      className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-200 transition-all"
                    >
                      <Download size={16} />
                      Baixar PDF
                    </button>
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-3 rounded-xl bg-green-600 text-white font-bold text-sm hover:bg-green-700 transition-all"
                    >
                      <MessageSquare size={16} />
                      WhatsApp
                    </a>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-center gap-4">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <CreditCard size={12} />
                    <span>Pagamento Seguro</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <CheckCircle2 size={12} />
                    <span>Certificado ANAC</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating WhatsApp for mobile (as requested in the snippet) */}
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-6 md:bottom-10 md:right-10 w-16 h-16 bg-green-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-40 md:hidden"
      >
        <MessageSquare size={32} />
      </a>
    </div>
  );
}

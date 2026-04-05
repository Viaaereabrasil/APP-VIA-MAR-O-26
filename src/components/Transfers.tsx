import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Plane, CreditCard, Info, MessageSquare, ChevronRight } from 'lucide-react';
import { WHATSAPP_LINK } from '../constants';
import { cn } from '../lib/utils';

const TRANSFER_DATA = [
  { from: 'Trancoso', to: 'Terravista', value: '3.520,00', tax: '2.398,00', total: '5.918,00', local: 'Aeroporto TerraVista' },
  { from: 'Trancoso', to: 'Kuara Hotel', value: '3.520,00', tax: '0,00', total: '3.520,00', local: 'Apenas para hóspedes' },
  { from: 'Trancoso', to: 'Praia Espelho', value: '3.520,00', tax: '715,00', total: '4.235,00', local: 'Aeroporto Outeiro das Brisas' },
  { from: 'Trancoso', to: 'Caraíva', value: '5.280,00', tax: '0,00', total: '5.280,00', local: 'Pouso no lado Norte do rio' },
  { from: 'Trancoso', to: 'Corumbau', value: '7.040,00', tax: '550,00', total: '7.590,00', local: 'Pouso pista Fazenda Tauá' },
  { from: 'Trancoso', to: 'Cumuruxatiba', value: '10.560,00', tax: '0,00', total: '10.560,00', local: 'Sob consulta' },
  { from: 'Trancoso', to: 'Aeroporto Porto Seguro', value: '5.280,00', tax: '0,00', total: '5.280,00', local: 'Aeroporto de Porto Seguro' },
  { from: 'Trancoso', to: 'Reserva Jacumã', value: '3.520,00', tax: '0,00', total: '3.520,00', local: 'Aeroporto de Porto Seguro' },
  { from: 'Aeroporto Terra Vista', to: 'Reserva Jacumã', value: '5.280,00', tax: '2.398,00', total: '7.678,00', local: 'Apenas para hóspedes' },
  { from: 'Aeroporto Terra Vista', to: 'Fasano Hotel', value: '3.520,00', tax: '3.256,00', total: '6.776,00', local: 'Apenas para hóspedes' },
  { from: 'Aeroporto Porto Seguro', to: 'Arraial', value: '5.280,00', tax: '440,00', total: '5.720,00', local: 'Sob consulta' },
  { from: 'Aeroporto Porto Seguro', to: 'Kuara Hotel', value: '5.280,00', tax: '0,00', total: '5.280,00', local: 'Apenas para hóspedes' },
  { from: 'Aeroporto Porto Seguro', to: 'Fasano Hotel', value: '5.280,00', tax: '858,00', total: '6.138,00', local: 'Apenas para hóspedes' },
  { from: 'Aeroporto Porto Seguro', to: 'Trancoso - Heliponto Trama', value: '5.280,00', tax: '0,00', total: '5.280,00', local: 'Pouso no Heliponto Trama' },
  { from: 'Aeroporto Porto Seguro', to: 'Terravista', value: '5.280,00', tax: '2.398,00', total: '7.678,00', local: 'Aeroporto TerraVista' },
  { from: 'Aeroporto Porto Seguro', to: 'Reserva Jacumã', value: '7.040,00', tax: '0,00', total: '7.040,00', local: 'Pouso Aeroporto Outeiro' },
  { from: 'Aeroporto Porto Seguro', to: 'Praia Espelho', value: '7.040,00', tax: '715,00', total: '7.755,00', local: 'Pouso Aeroporto Outeiro' },
  { from: 'Aeroporto Porto Seguro', to: 'Caraíva', value: '8.800,00', tax: '0,00', total: '8.800,00', local: 'Pouso Lado norte do rio' },
  { from: 'Aeroporto Porto Seguro', to: 'Corumbau', value: '10.560,00', tax: '330,00', total: '10.890,00', local: 'Sob consulta' },
  { from: 'Aeroporto Porto Seguro', to: 'Corumbau (Faz. Taua)', value: '12.320,00', tax: '550,00', total: '12.870,00', local: 'Pouso pista Fazenda Tauá' },
  { from: 'Aeroporto Porto Seguro', to: 'Cumuruxatiba', value: '17.600,00', tax: '0,00', total: '17.600,00', local: 'Sob consulta' },
  { from: 'Trancoso / Porto Seguro', to: 'La Torre (Fly Club)', value: '7.040,00', tax: '220,00', total: '7.260,00', local: 'Pouso no FlyClub' },
  { from: 'Trancoso', to: 'Santo André', value: '8.800,00', tax: '330,00', total: '9.130,00', local: 'Sob consulta' },
  { from: 'Trancoso', to: 'Comandatuba', value: '26.400,00', tax: '0,00', total: '26.400,00', local: 'Aeroporto de Comandatuba' },
  { from: 'Trancoso', to: 'Ilhéus', value: '40.480,00', tax: '330,00', total: '40.810,00', local: 'Aeroporto de Ilhéus' },
  { from: 'Trancoso', to: 'Itacaré', value: '49.280,00', tax: '0,00', total: '49.280,00', local: 'Sob consulta' },
  { from: 'Trancoso', to: 'Maraú (Kiaroa)', value: '59.840,00', tax: '1.320,00', total: '61.160,00', local: 'Aeroporto Kiaroa' },
  { from: 'Trancoso', to: 'Salvador', value: '79.200,00', tax: '0,00', total: '79.200,00', local: 'Aeroporto de Salvador' },
];

export default function Transfers() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransfers = TRANSFER_DATA.filter(t => 
    t.from.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.local.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">Tabela de Traslados 2025</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Valores para voos de traslado realizados com aeronave <strong>AS350 Esquilo</strong> (Capacidade: 6 passageiros + bagagens).
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-12 relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={20} className="text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Buscar por origem, destino ou local de pouso..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Transfer Table/Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTransfers.map((transfer, index) => (
          <motion.div
            key={`${transfer.from}-${transfer.to}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-[2rem] border border-slate-100 p-6 hover:shadow-xl transition-all group"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <MapPin size={14} />
                  <span>Trecho</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">
                  {transfer.from} <span className="text-orange-600">x</span> {transfer.to}
                </h3>
              </div>
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
                <Plane size={18} className="text-white" />
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                  <Info size={14} className="text-slate-400" />
                </div>
                <span>{transfer.local}</span>
              </div>
              
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex justify-between text-xs text-slate-400 font-bold uppercase">
                  <span>Valor Voo</span>
                  <span>Taxa Pouso</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-bold text-slate-600">R$ {transfer.value}</span>
                  <span className="text-sm font-bold text-slate-600">R$ {transfer.tax}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="text-xs font-bold text-slate-900 uppercase">Total</span>
                  <span className="text-xl font-black text-orange-600">R$ {transfer.total}</span>
                </div>
              </div>
            </div>

            <a
              href={`${WHATSAPP_LINK}?text=Olá! Gostaria de reservar o traslado: ${transfer.from} para ${transfer.to} (Esquilo AS350).`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
            >
              Reservar Traslado
              <MessageSquare size={16} />
            </a>
          </motion.div>
        ))}
      </div>

      {filteredTransfers.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-400">Nenhum trecho encontrado para sua busca.</p>
        </div>
      )}

      {/* Important Notes */}
      <div className="mt-16 bg-orange-50 rounded-[3rem] p-8 md:p-12 border border-orange-100">
        <h3 className="text-2xl font-bold text-orange-900 mb-6 flex items-center gap-2">
          <Info className="text-orange-600" />
          Observações Importantes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ul className="space-y-4">
            <li className="flex gap-3 text-orange-800">
              <ChevronRight size={18} className="shrink-0 mt-1" />
              <p className="text-sm">Aeronave modelo <strong>AS350 Esquilo</strong> com capacidade para 6 passageiros + bagagens.</p>
            </li>
            <li className="flex gap-3 text-orange-800">
              <ChevronRight size={18} className="shrink-0 mt-1" />
              <p className="text-sm">Os voos somente serão realizados entre o <strong>nascer e o pôr do sol</strong>.</p>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-3 text-orange-800">
              <ChevronRight size={18} className="shrink-0 mt-1" />
              <p className="text-sm">Caso algum passageiro tenha peso acima de <strong>100kg</strong>, deverá ser informado antes de fechar a reserva.</p>
            </li>
            <li className="flex gap-3 text-orange-800">
              <ChevronRight size={18} className="shrink-0 mt-1" />
              <p className="text-sm">Crianças de colo até <strong>23 meses</strong> não pagam (apenas uma por voo).</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

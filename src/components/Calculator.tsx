import { useState, useEffect, FormEvent, useTransition } from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Clock, Users, Dog, Briefcase, Calculator as CalcIcon, ArrowRight, Plane } from 'lucide-react';
import { CITIES, FLEET } from '../constants';
import { Budget, Aircraft } from '../types';
import { cn } from '../lib/utils';

interface CalculatorProps {
  initialAircraftId?: string;
  onGenerate: (data: Budget) => void;
}

export default function Calculator({ initialAircraftId, onGenerate }: CalculatorProps) {
  const [isPending, startTransition] = useTransition();
  const initialAircraft = FLEET.find(a => a.id === initialAircraftId);

  const [formData, setFormData] = useState<Budget>({
    origin: '',
    destination: '',
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    aircraftId: initialAircraftId || '',
    passengers: initialAircraft ? initialAircraft.capacity : 1,
    pets: false,
    extraLuggage: false,
  });

  const updateField = (field: keyof Budget, value: any) => {
    startTransition(() => {
      setFormData(prev => ({ ...prev, [field]: value }));
    });
  };

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);

  const selectedAircraft = FLEET.find(a => a.id === formData.aircraftId) || FLEET[0];

  useEffect(() => {
    calculateEstimate();
  }, [formData]);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const deg2rad = (deg: number) => deg * (Math.PI / 180);

  const calculateEstimate = () => {
    const originCity = CITIES.find(c => c.name === formData.origin);
    const destinationCity = CITIES.find(c => c.name === formData.destination);

    if (originCity && destinationCity && originCity.name !== destinationCity.name) {
      const dist = calculateDistance(originCity.lat, originCity.lng, destinationCity.lat, destinationCity.lng);
      setDistance(Math.round(dist));

      // Average speeds in km/h
      let speed = 200; // Helicopter
      if (selectedAircraft.type === 'Turboélice') speed = 450;
      if (selectedAircraft.type === 'Jato') speed = 800;

      const dur = dist / speed;
      setDuration(dur);

      const flightCost = dur * selectedAircraft.pricePerHour;
      const landingFees = flightCost * 0.1;
      const extraFees = flightCost * 0.1;
      
      let total = flightCost + landingFees + extraFees;
      if (formData.pets) total += 500;
      if (formData.extraLuggage) total += 300;

      setEstimatedPrice(total);
    } else {
      setDistance(0);
      setDuration(0);
      setEstimatedPrice(0);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.origin) newErrors.origin = 'Origem é obrigatória';
    if (!formData.destination) newErrors.destination = 'Destino é obrigatório';
    if (formData.origin && formData.destination && formData.origin === formData.destination) {
      newErrors.destination = 'Origem e destino devem ser diferentes';
    }
    if (!formData.date) newErrors.date = 'Data é obrigatória';
    if (formData.date) {
      const selectedDate = new Date(formData.date + 'T00:00:00');
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = 'Data não pode ser no passado';
      }
    }
    if (!formData.time) newErrors.time = 'Horário é obrigatório';
    if (!formData.aircraftId) newErrors.aircraftId = 'Aeronave é obrigatória';
    if (formData.passengers < 1) newErrors.passengers = 'Mínimo 1 passageiro';
    if (formData.aircraftId && formData.passengers > selectedAircraft.capacity) {
      newErrors.passengers = `Máximo ${selectedAircraft.capacity} passageiros para esta aeronave`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onGenerate(formData);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">Calculadora de Orçamento</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Obtenha uma estimativa instantânea para o seu voo. Preços baseados em distância, tempo de voo e taxas operacionais.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-xl space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <MapPin size={16} className="text-orange-600" />
                Origem
              </label>
              <select
                value={formData.origin}
                onChange={(e) => {
                  updateField('origin', e.target.value);
                  if (errors.origin) setErrors({ ...errors, origin: '' });
                }}
                className={cn(
                  "w-full px-4 py-3 rounded-xl border focus:ring-2 outline-none transition-all bg-slate-50",
                  errors.origin ? "border-red-500 focus:ring-red-500" : "border-slate-200 focus:ring-orange-500 focus:border-orange-500"
                )}
              >
                <option value="">Selecione a origem</option>
                {CITIES.map(c => <option key={c.name} value={c.name}>{c.name} - {c.state}</option>)}
              </select>
              {errors.origin && <p className="text-xs text-red-500 font-medium">{errors.origin}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <MapPin size={16} className="text-orange-600" />
                Destino
              </label>
              <select
                value={formData.destination}
                onChange={(e) => {
                  updateField('destination', e.target.value);
                  if (errors.destination) setErrors({ ...errors, destination: '' });
                }}
                className={cn(
                  "w-full px-4 py-3 rounded-xl border focus:ring-2 outline-none transition-all bg-slate-50",
                  errors.destination ? "border-red-500 focus:ring-red-500" : "border-slate-200 focus:ring-orange-500 focus:border-orange-500"
                )}
              >
                <option value="">Selecione o destino</option>
                {CITIES.map(c => <option key={c.name} value={c.name}>{c.name} - {c.state}</option>)}
              </select>
              {errors.destination && <p className="text-xs text-red-500 font-medium">{errors.destination}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Calendar size={16} className="text-orange-600" />
                Data do Voo
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => {
                  updateField('date', e.target.value);
                  if (errors.date) setErrors({ ...errors, date: '' });
                }}
                className={cn(
                  "w-full px-4 py-3 rounded-xl border focus:ring-2 outline-none transition-all bg-slate-50",
                  errors.date ? "border-red-500 focus:ring-red-500" : "border-slate-200 focus:ring-orange-500 focus:border-orange-500"
                )}
              />
              {errors.date && <p className="text-xs text-red-500 font-medium">{errors.date}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Clock size={16} className="text-orange-600" />
                Horário
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => {
                  updateField('time', e.target.value);
                  if (errors.time) setErrors({ ...errors, time: '' });
                }}
                className={cn(
                  "w-full px-4 py-3 rounded-xl border focus:ring-2 outline-none transition-all bg-slate-50",
                  errors.time ? "border-red-500 focus:ring-red-500" : "border-slate-200 focus:ring-orange-500 focus:border-orange-500"
                )}
              />
              {errors.time && <p className="text-xs text-red-500 font-medium">{errors.time}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <Plane size={16} className="text-orange-600" />
              Aeronave
            </label>
            <select
              value={formData.aircraftId}
              onChange={(e) => {
                const newAircraftId = e.target.value;
                const aircraft = FLEET.find(a => a.id === newAircraftId);
                startTransition(() => {
                  setFormData({ 
                    ...formData, 
                    aircraftId: newAircraftId,
                    passengers: aircraft ? aircraft.capacity : 1
                  });
                });
                if (errors.aircraftId) setErrors({ ...errors, aircraftId: '' });
              }}
              className={cn(
                "w-full px-4 py-3 rounded-xl border focus:ring-2 outline-none transition-all bg-slate-50",
                errors.aircraftId ? "border-red-500 focus:ring-red-500" : "border-slate-200 focus:ring-orange-500 focus:border-orange-500"
              )}
            >
              <option value="">Selecione a aeronave</option>
              {FLEET.map(a => <option key={a.id} value={a.id}>{a.model} ({a.type})</option>)}
            </select>
            {errors.aircraftId && <p className="text-xs text-red-500 font-medium">{errors.aircraftId}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Users size={16} className="text-orange-600" />
                Passageiros
              </label>
              <input
                type="number"
                min="1"
                max={selectedAircraft.capacity}
                value={formData.passengers}
                onChange={(e) => {
                  setFormData({ ...formData, passengers: parseInt(e.target.value) || 0 });
                  if (errors.passengers) setErrors({ ...errors, passengers: '' });
                }}
                className={cn(
                  "w-full px-4 py-3 rounded-xl border focus:ring-2 outline-none transition-all bg-slate-50",
                  errors.passengers ? "border-red-500 focus:ring-red-500" : "border-slate-200 focus:ring-orange-500 focus:border-orange-500"
                )}
              />
              {errors.passengers && <p className="text-xs text-red-500 font-medium">{errors.passengers}</p>}
            </div>
            <div className="flex items-center gap-3 pt-8">
              <input
                type="checkbox"
                id="pets"
                checked={formData.pets}
                onChange={(e) => setFormData({ ...formData, pets: e.target.checked })}
                className="w-5 h-5 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
              />
              <label htmlFor="pets" className="text-sm font-bold text-slate-700 flex items-center gap-2 cursor-pointer">
                <Dog size={16} className="text-orange-600" />
                Pets
              </label>
            </div>
            <div className="flex items-center gap-3 pt-8">
              <input
                type="checkbox"
                id="luggage"
                checked={formData.extraLuggage}
                onChange={(e) => setFormData({ ...formData, extraLuggage: e.target.checked })}
                className="w-5 h-5 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
              />
              <label htmlFor="luggage" className="text-sm font-bold text-slate-700 flex items-center gap-2 cursor-pointer">
                <Briefcase size={16} className="text-orange-600" />
                Bagagem Extra
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-orange-600/20 hover:bg-orange-700 transition-all group"
          >
            Gerar Proposta Personalizada
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* Summary Card */}
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 text-white sticky top-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-orange-600 p-2 rounded-xl">
              <CalcIcon size={24} />
            </div>
            <h3 className="text-2xl font-bold">Resumo da Estimativa</h3>
          </div>

          <div className="space-y-6 mb-10">
            <div className="flex justify-between items-center py-4 border-b border-white/10">
              <span className="text-slate-400 font-medium">Distância Estimada</span>
              <span className="text-xl font-bold">{distance} km</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-white/10">
              <span className="text-slate-400 font-medium">Tempo de Voo</span>
              <span className="text-xl font-bold">
                {Math.floor(duration)}h {Math.round((duration % 1) * 60)}min
              </span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-white/10">
              <span className="text-slate-400 font-medium">Aeronave</span>
              <span className="text-xl font-bold">{selectedAircraft.model}</span>
            </div>
            <div className="space-y-4 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Custo de Voo (80%)</span>
                <span>R$ {(estimatedPrice * 0.8).toLocaleString('pt-BR')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Taxas de Pouso (10%)</span>
                <span>R$ {(estimatedPrice * 0.1).toLocaleString('pt-BR')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Serviços Extras (10%)</span>
                <span>R$ {(estimatedPrice * 0.1).toLocaleString('pt-BR')}</span>
              </div>
            </div>
          </div>

          <div className="bg-orange-600/10 rounded-2xl p-6 border border-orange-500/20">
            <p className="text-orange-400 text-sm font-bold uppercase tracking-wider mb-2">Total Estimado</p>
            <p className="text-5xl font-bold text-white">
              R$ {estimatedPrice.toLocaleString('pt-BR')}
            </p>
            <p className="text-slate-400 text-xs mt-4">
              * Valores sujeitos a alteração conforme disponibilidade de aeronave e taxas aeroportuárias no dia do voo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { cn } from '../lib/utils';
import { HelicopterIcon } from './CustomIcons';
import { 
  Home, 
  Plane, 
  MapPin, 
  Package, 
  Calculator, 
  MessageSquare, 
  ExternalLink, 
  Phone,
  HelpCircle
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const navItems = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'fleet', label: 'Frota', icon: Plane },
    { id: 'tours', label: 'Panorâmicos', icon: HelicopterIcon },
    { id: 'transfers', label: 'Traslados', icon: MapPin },
    { id: 'packages', label: 'Pacotes', icon: Package },
    { id: 'faq', label: 'Dúvidas', icon: HelpCircle },
    { id: 'contact', label: 'Contato', icon: MessageSquare },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      {/* Row 1: Logo & CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => setActiveTab('home')}
          >
            <div className="flex items-center gap-2">
              <Plane className="text-orange-600" size={32} />
              <span className="text-2xl font-black tracking-tighter text-slate-900">
                VIA AÉREA<span className="text-orange-600">.</span>
              </span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <div className="flex flex-col items-end border-r border-slate-100 pr-6">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Atendimento 24h</span>
              <a 
                href="tel:+5531998804720" 
                className="text-sm font-bold text-slate-700 hover:text-orange-600 transition-colors flex items-center gap-2"
              >
                <Phone size={14} className="text-orange-600" />
                (31) 99880-4720
              </a>
            </div>
            <button 
              onClick={() => setActiveTab('calculator')}
              className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-orange-600 transition-all shadow-lg shadow-slate-200 hover:shadow-orange-200 active:scale-95"
            >
              Fazer Orçamento
            </button>
          </div>

          {/* Mobile Logo Only */}
          <div className="md:hidden">
             <button 
              onClick={() => setActiveTab('calculator')}
              aria-label="Fazer Orçamento"
              className="bg-orange-600 text-white p-3 rounded-full shadow-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <Calculator size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Row 2: Navigation Items (Desktop Only) */}
      <div className="hidden md:block bg-slate-50/50 border-t border-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center gap-2 lg:gap-8 py-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 group",
                  activeTab === item.id 
                    ? "bg-white text-orange-600 shadow-sm ring-1 ring-slate-100" 
                    : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
                )}
              >
                <item.icon 
                  size={18} 
                  className={cn(
                    "transition-transform group-hover:scale-110",
                    activeTab === item.id ? "text-orange-600" : "text-slate-400"
                  )} 
                />
                <span className="text-xs font-bold uppercase tracking-wider">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

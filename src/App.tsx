import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Plane, Calculator as CalcIcon, LayoutGrid, Info, MessageSquare, ShieldCheck, Star, MapPin, Search, ExternalLink, Package, PlaneTakeoff, Wind, Home, ArrowRight, Loader2 } from 'lucide-react';
import { HelicopterIcon, MedicalIcon } from './components/CustomIcons';
import { Toaster, toast } from 'sonner';
import { cn } from './lib/utils';
import { FLEET, WHATSAPP_LINK } from './constants';
import { Aircraft, Budget } from './types';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';

// Lazy loaded components
const PanoramicTours = lazy(() => import('./components/PanoramicTours'));
const Transfers = lazy(() => import('./components/Transfers'));
const TravelPackages = lazy(() => import('./components/TravelPackages'));
const FleetGallery = lazy(() => import('./components/FleetGallery'));
const Calculator = lazy(() => import('./components/Calculator'));
const Proposal = lazy(() => import('./components/Proposal'));
const FAQ = lazy(() => import('./components/FAQ'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const ContactForm = lazy(() => import('./components/ContactForm'));

const LoadingFallback = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <Loader2 className="text-orange-600 w-12 h-12" />
    </motion.div>
    <p className="text-slate-500 font-medium animate-pulse">Carregando experiência...</p>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'fleet' | 'tours' | 'transfers' | 'calculator' | 'proposal' | 'faq' | 'packages' | 'contact'>('home');
  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft | null>(null);
  const [budgetData, setBudgetData] = useState<Budget | null>(null);

  const handleSelectAircraft = (aircraft: Aircraft) => {
    setSelectedAircraft(aircraft);
    setActiveTab('calculator');
  };

  const handleGenerateProposal = (data: Budget) => {
    setBudgetData(data);
    setActiveTab('proposal');
  };

  const handleTabChange = (tab: any) => {
    if (activeTab === tab) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveTab(tab);
    }
  };

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // Handle payment status from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get('payment');

    if (paymentStatus === 'success') {
      toast.success('Pagamento realizado com sucesso!', {
        description: 'Nossa equipe entrará em contato em breve para confirmar os detalhes.',
        duration: 8000,
      });
      // Clear URL params
      window.history.replaceState({}, '', window.location.pathname);
    } else if (paymentStatus === 'cancel') {
      toast.error('Pagamento cancelado.', {
        description: 'Sua reserva não foi concluída. Se precisar de ajuda, fale conosco.',
        duration: 5000,
      });
      // Clear URL params
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-orange-100">
      <Toaster position="top-center" richColors />
      <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />

      <main className="pb-20 md:pb-0">
        <Suspense fallback={<LoadingFallback />}>
          <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Hero onStartBudget={() => handleTabChange('calculator')} onViewFleet={() => handleTabChange('fleet')} />
              
              <div className="max-w-7xl mx-auto px-4 py-16 space-y-24">
                <section id="services" className="space-y-12">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Nossos Serviços</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">Excelência em aviação executiva com atendimento personalizado e segurança total.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {[
                      { name: 'Táxi Aéreo', icon: Plane, desc: 'Agilidade e conforto para suas viagens.', link: `${WHATSAPP_LINK}?text=Olá! Gostaria de saber mais sobre Táxi Aéreo.` },
                      { name: 'Fretamento de Jatos', icon: PlaneTakeoff, desc: 'Exclusividade e longo alcance.', link: `${WHATSAPP_LINK}?text=Olá! Gostaria de saber mais sobre Fretamento de Jatos.` },
                      { name: 'PANORÂMICO DE HELICÓPTERO', icon: HelicopterIcon, desc: 'As melhores vistas de cima.', tab: 'tours' },
                      { name: 'Transporte de Cargas', icon: Package, desc: 'Logística aérea eficiente.', link: `${WHATSAPP_LINK}?text=Olá! Gostaria de saber mais sobre Transporte de Cargas.` },
                      { name: 'UTI Aérea', icon: MedicalIcon, desc: 'Transporte aeromédico especializado.', link: `${WHATSAPP_LINK}?text=Olá! Gostaria de saber mais sobre UTI Aérea.` },
                    ].map((service) => (
                      <button 
                        key={service.name}
                        onClick={() => {
                          if (service.tab) {
                            setActiveTab(service.tab as any);
                          } else if (service.link) {
                            window.open(service.link, '_blank');
                          }
                        }}
                        className="p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:border-orange-200 transition-all group text-center w-full"
                      >
                        <motion.div 
                          whileHover={{ 
                            scale: 1.15, 
                            y: -8,
                            transition: { 
                              type: "spring", 
                              stiffness: 400, 
                              damping: 10 
                            } 
                          }}
                          className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg shadow-orange-200"
                        >
                          <service.icon className="text-white w-6 h-6" />
                        </motion.div>
                        <h3 className="text-lg font-bold mb-2">{service.name}</h3>
                        <p className="text-sm text-slate-600 mb-4">{service.desc}</p>
                        <span className="text-orange-600 font-bold text-sm flex items-center justify-center gap-1">
                          {service.tab ? 'Ver Roteiros' : 'Solicitar'} <MessageSquare size={14} />
                        </span>
                      </button>
                    ))}
                  </div>
                </section>

                <Testimonials />
                <ContactForm />
              </div>
              <Footer />
            </motion.div>
          )}

          {activeTab === 'fleet' && (
            <motion.div
              key="fleet"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <FleetGallery onSelect={handleSelectAircraft} />
              <Footer />
            </motion.div>
          )}

          {activeTab === 'tours' && (
            <motion.div
              key="tours"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PanoramicTours />
              <Footer />
            </motion.div>
          )}

          {activeTab === 'transfers' && (
            <motion.div
              key="transfers"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Transfers />
              <Footer />
            </motion.div>
          )}

          {activeTab === 'packages' && (
            <motion.div
              key="packages"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TravelPackages />
              <Footer />
            </motion.div>
          )}

          {activeTab === 'calculator' && (
            <motion.div
              key="calculator"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Calculator 
                initialAircraftId={selectedAircraft?.id} 
                onGenerate={handleGenerateProposal} 
              />
              <Footer />
            </motion.div>
          )}

          {activeTab === 'proposal' && budgetData && (
            <motion.div
              key="proposal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Proposal data={budgetData} onReset={() => setActiveTab('calculator')} />
              <Footer />
            </motion.div>
          )}

          {activeTab === 'faq' && (
            <motion.div
              key="faq"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <FAQ />
              <Footer />
            </motion.div>
          )}

          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ContactForm />
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
        </Suspense>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-100 px-2 py-2 flex justify-around items-center md:hidden z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
        <button 
          onClick={() => handleTabChange('home')}
          aria-label="Início"
          className={cn("flex flex-col items-center justify-center gap-1 transition-all min-h-[48px] min-w-[48px] p-2 rounded-xl", activeTab === 'home' ? "text-orange-600 bg-orange-50" : "text-slate-400")}
        >
          <Home size={20} />
          <span className="text-[9px] font-bold uppercase tracking-tighter">Início</span>
        </button>
        <button 
          onClick={() => handleTabChange('fleet')}
          aria-label="Frota"
          className={cn("flex flex-col items-center justify-center gap-1 transition-all min-h-[48px] min-w-[48px] p-2 rounded-xl", activeTab === 'fleet' ? "text-orange-600 bg-orange-50" : "text-slate-400")}
        >
          <Plane size={20} />
          <span className="text-[9px] font-bold uppercase tracking-tighter">Frota</span>
        </button>
        <button 
          onClick={() => handleTabChange('tours')}
          aria-label="Passeios"
          className={cn("flex flex-col items-center justify-center gap-1 transition-all min-h-[48px] min-w-[48px] p-2 rounded-xl", activeTab === 'tours' ? "text-orange-600 bg-orange-50" : "text-slate-400")}
        >
          <HelicopterIcon size={20} />
          <span className="text-[9px] font-bold uppercase tracking-tighter">Passeios</span>
        </button>
        <button 
          onClick={() => handleTabChange('calculator')}
          aria-label="Orçamento"
          className={cn("flex flex-col items-center justify-center gap-1 transition-all min-h-[48px] min-w-[48px] p-2 rounded-xl", activeTab === 'calculator' ? "text-orange-600 bg-orange-50" : "text-slate-400")}
        >
          <CalcIcon size={20} />
          <span className="text-[9px] font-bold uppercase tracking-tighter">Orçamento</span>
        </button>
        <button 
          onClick={() => handleTabChange('contact')}
          aria-label="Contato"
          className={cn("flex flex-col items-center justify-center gap-1 transition-all min-h-[48px] min-w-[48px] p-2 rounded-xl", activeTab === 'contact' ? "text-orange-600 bg-orange-50" : "text-slate-400")}
        >
          <MessageSquare size={20} />
          <span className="text-[9px] font-bold uppercase tracking-tighter">Contato</span>
        </button>
      </nav>
    </div>
  );
}

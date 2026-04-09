import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '../lib/utils';

const FAQS = [
  {
    question: "Como funciona o fretamento de aeronaves?",
    answer: "O fretamento é um serviço sob demanda onde você aluga a aeronave inteira para o seu grupo. Você define o horário, a rota e a aeronave de sua preferência, garantindo total flexibilidade e privacidade."
  },
  {
    question: "Posso levar meu pet no voo?",
    answer: "Sim! Somos pet-friendly. Animais de pequeno porte podem viajar na cabine com você, desde que em caixa de transporte adequada. Para animais maiores, consulte nossa equipe para verificar a viabilidade na aeronave selecionada."
  },
  {
    question: "Qual a franquia de bagagem permitida?",
    answer: "A franquia varia conforme a aeronave. Helicópteros geralmente permitem bagagens leves (até 10-15kg por pessoa). Turboélices e Jatos possuem compartimentos maiores. Detalhes específicos são fornecidos no momento da cotação."
  },
  {
    question: "Os voos são seguros e homologados?",
    answer: "Sim! Operamos estritamente sob as normas da ANAC (Agência Nacional de Aviação Civil). Todas as nossas aeronaves e parceiros possuem certificação de Táxi Aéreo (RBAC 135), garantindo os mais altos padrões de segurança."
  },
  {
    question: "Como é feito o pagamento?",
    answer: "Aceitamos cartões de crédito (com parcelamento em até 3x sem juros), PIX e transferência bancária. O pagamento é processado através de gateways seguros como PagSeguro ou Stripe."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center bg-orange-100 p-3 rounded-2xl mb-6">
          <HelpCircle size={32} className="text-orange-600" />
        </div>
        <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">Dúvidas Frequentes</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Tudo o que você precisa saber para planejar seu próximo voo com a Via Aérea Brasil.
        </p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, index) => (
          <div 
            key={index}
            className="bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-8 py-6 flex items-center justify-between text-left group"
            >
              <span className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                {faq.question}
              </span>
              <ChevronDown 
                size={20} 
                className={cn(
                  "text-slate-400 transition-transform duration-300",
                  openIndex === index && "rotate-180 text-orange-600"
                )} 
              />
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-8 pb-8 text-slate-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

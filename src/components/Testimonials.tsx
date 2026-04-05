import { motion } from 'motion/react';
import { Star, Quote, ExternalLink } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Ricardo Santos",
    role: "Empresário",
    content: "Experiência impecável. O fretamento do Phenom 100 foi rápido, seguro e com um atendimento de primeira classe. Recomendo fortemente para viagens de negócios.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    id: 2,
    name: "Juliana Mendes",
    role: "Turista",
    content: "O passeio panorâmico de helicóptero por Belo Horizonte foi inesquecível! A vista é maravilhosa e o piloto foi super atencioso e profissional.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    id: 3,
    name: "Marcos Oliveira",
    role: "Diretor Comercial",
    content: "Utilizamos o serviço de UTI Aérea para um transporte emergencial e a agilidade da equipe foi fundamental. Profissionalismo exemplar em um momento crítico.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">O que nossos clientes dizem</h2>
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} className="fill-orange-500 text-orange-500" />
            ))}
            <span className="ml-2 font-bold text-slate-700">5/5 no Google</span>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A satisfação de nossos passageiros é o nosso maior combustível. Confira alguns depoimentos reais do Google Meu Negócio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-50 p-8 rounded-3xl border border-slate-100 relative group hover:shadow-xl transition-all duration-300"
            >
              <Quote className="absolute top-6 right-8 text-orange-100 w-12 h-12 group-hover:text-orange-200 transition-colors" />
              
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-orange-500 text-orange-500" />
                ))}
              </div>

              <p className="text-slate-600 italic leading-relaxed">
                &quot;{testimonial.content}&quot;
              </p>
              
              <a 
                href="https://share.google/djMFVK590x1voem5Q" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-6 pt-6 border-t border-slate-200 flex items-center justify-between hover:bg-slate-50 transition-colors rounded-b-2xl -mx-6 px-6 -mb-6"
              >
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Google Review</span>
                <img 
                  src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png" 
                  alt="Google" 
                  className="w-4 h-4 opacity-50"
                  referrerPolicy="no-referrer"
                />
              </a>
            </motion.div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <a 
            href="https://share.google/djMFVK590x1voem5Q" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white border border-slate-200 rounded-full text-slate-900 font-bold hover:bg-slate-50 hover:border-orange-300 transition-all shadow-sm group"
          >
            <img 
              src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png" 
              alt="Google" 
              className="w-5 h-5"
              referrerPolicy="no-referrer"
            />
            Ver todas as avaliações no Google
            <ExternalLink size={18} className="text-slate-400 group-hover:text-orange-600 transition-colors" />
          </a>
        </div>
      </div>
    </section>
  );
}

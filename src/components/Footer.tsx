import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { WHATSAPP_LINK } from '../constants';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <img 
                src="input_file_0.png" 
                alt="Via Aérea Brasil Logo" 
                className="h-12 w-auto"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-slate-400 leading-relaxed">
              Sua melhor escolha em fretamento executivo e passeios panorâmicos. Segurança, agilidade e exclusividade em cada voo.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-orange-600 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-orange-600 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-orange-600 transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="https://share.google/djMFVK590x1voem5Q" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white transition-colors group">
                <img 
                  src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png" 
                  alt="Google" 
                  className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all"
                  referrerPolicy="no-referrer"
                />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Serviços</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href={`${WHATSAPP_LINK}?text=Olá! Gostaria de saber mais sobre Táxi Aéreo.`} target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">Táxi Aéreo</a></li>
              <li><a href={`${WHATSAPP_LINK}?text=Olá! Gostaria de saber mais sobre Fretamento de Jatos.`} target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">Fretamento de Jatos</a></li>
              <li><a href={`${WHATSAPP_LINK}?text=Olá! Gostaria de saber mais sobre Passeios de Helicóptero.`} target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">Panorâmico de Helicóptero</a></li>
              <li><a href={`${WHATSAPP_LINK}?text=Olá! Gostaria de saber mais sobre Transporte de Cargas.`} target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">Transporte de Cargas</a></li>
              <li><a href={`${WHATSAPP_LINK}?text=Olá! Gostaria de saber mais sobre UTI Aérea.`} target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">UTI Aérea</a></li>
            </ul>
          </div>

          {/* Bases */}
          <div>
            <h4 className="text-lg font-bold mb-6">Nossas Bases</h4>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-orange-500 shrink-0 mt-1" />
                <div>
                  <p className="text-white font-bold">MG</p>
                  <p className="text-sm">Belo Horizonte (Matriz)</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-orange-500 shrink-0 mt-1" />
                <div>
                  <p className="text-white font-bold">RJ</p>
                  <p className="text-sm">Rio de Janeiro, Macaé</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-orange-500 shrink-0 mt-1" />
                <div>
                  <p className="text-white font-bold">SP</p>
                  <p className="text-sm">São Paulo, Barretos, Ribeirão Preto</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-orange-500 shrink-0 mt-1" />
                <div>
                  <p className="text-white font-bold">BA & MA</p>
                  <p className="text-sm">Trancoso, São Luís</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-orange-500 shrink-0 mt-1" />
                <span className="italic text-sm">Parceria nos melhores aeroportos do Brasil</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contato</h4>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-orange-500" />
                <a href={`${WHATSAPP_LINK}?text=Olá! Gostaria de solicitar um orçamento.`} target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">(31) 99880-4720</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-orange-500" />
                <a href="mailto:contato@viaaereabr.com.br" className="hover:text-orange-400 transition-colors">contato@viaaereabr.com.br</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p>© 2026 Via Aérea Brasil. Todos os direitos reservados.</p>
            <p className="text-xs opacity-60">CNPJ: 13.364.718/0001-09</p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">ANAC RBAC 135</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

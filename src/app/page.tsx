"use client";

import Link from "next/link";
import { ArrowRight, Calendar, ShieldCheck, DoorOpen, Network, CheckCircle, Clock, BookOpen, Users, MapPin, Mail, Phone, Globe } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#17203A] text-white flex flex-col font-sans selection:bg-[#73A5D4]/30">
      {/* Header / Navbar */}
      <header className="border-b border-white/5 bg-[#17203A]/90 backdrop-blur sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-xl p-2 flex items-center justify-center shadow-md shadow-[#17203A]/25">
              {/* EMIT Logo text with colors */}
              <div className="text-xl font-bold flex items-center tracking-tighter">
                <span className="text-[#17203A]">e</span>
                <span className="text-[#73A5D4]">M</span>
                <span className="text-[#17203A]">I</span>
                <span className="text-[#73A5D4]">T</span>
              </div>
            </div>
            <div>
              <p className="text-[10px] text-[#73A5D4] uppercase tracking-widest font-semibold">Portail Universitaire</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/connexion" 
              className="px-6 py-2.5 rounded-xl border border-white/10 text-sm font-bold text-white hover:bg-white/5 transition-all duration-200"
            >
              Connexion
            </Link>
            <Link 
              href="/connexion" 
              className="bg-[#73A5D4] hover:bg-[#5C8ABF] text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-[#73A5D4]/20 hover:shadow-lg transition-all duration-200 flex items-center gap-2 group"
            >
              Accéder au Portail <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32 flex-1 flex flex-col justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-[#73A5D4]/10 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#73A5D4]/5 rounded-full blur-3xl -z-10 animate-pulse" style={{animationDelay: '1s'}} />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Planification Intelligente et <span className="text-[#73A5D4]">Gestion des Salles</span>
            </h2>
            
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Formation d'excellence en management et innovation technologique. Rejoignez notre communauté de leaders et innovateurs.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link 
                href="/connexion" 
                className="w-full sm:w-auto bg-[#73A5D4] hover:bg-[#5C8ABF] text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-[#73A5D4]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 group text-base"
              >
                Se connecter <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href="#features" 
                className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/20 text-white font-bold hover:bg-white/5 transition-all duration-200 text-center text-base"
              >
                Nos formations
              </a>
            </div>

            <div className="pt-6 flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-[#73A5D4]">
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle size={16} className="text-green-400" /> Sans Conflits
              </div>
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle size={16} className="text-[#73A5D4]" /> Approbation Rapide
              </div>
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle size={16} className="text-blue-400" /> Sécurisé
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center relative animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
            <div className="relative w-full max-w-[420px] aspect-square bg-[#1E293B] rounded-3xl shadow-2xl shadow-black/50 p-8 border border-white/10 flex items-center justify-center overflow-hidden hover:scale-105 transition-transform duration-500">
              <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="30" y="30" width="340" height="340" rx="24" fill="#17203A" />
                <path d="M30 120H370M30 210H370M30 300H370M110 30V370M210 30V370M310 30V370" stroke="#73A5D4" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.1" />
                
                <rect x="50" y="60" width="110" height="110" rx="16" fill="#1E293B" stroke="#73A5D4" strokeWidth="2" />
                <path d="M95 140V90H115V140" stroke="#73A5D4" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="110" cy="115" r="3" fill="#73A5D4" />
                <text x="75" y="80" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="sans-serif">SALLE A101</text>

                <rect x="180" y="90" width="170" height="110" rx="16" fill="#1E293B" stroke="#73A5D4" strokeWidth="2" />
                <rect x="180" y="90" width="170" height="30" rx="16" fill="#73A5D4" />
                <rect x="180" y="105" width="170" height="15" fill="#73A5D4" />
                <circle cx="210" cy="105" r="3" fill="#ffffff" />
                <circle cx="230" cy="105" r="3" fill="#ffffff" />
                <circle cx="250" cy="105" r="3" fill="#ffffff" />
                <rect x="200" y="140" width="80" height="10" rx="3" fill="#73A5D4" />
                <rect x="200" y="160" width="110" height="10" rx="3" fill="#334155" />
                
                <rect x="60" y="240" width="220" height="90" rx="16" fill="#1E293B" stroke="#73A5D4" strokeWidth="2" />
                <text x="80" y="265" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="sans-serif">DEMANDE DE RÉSERVATION</text>
                <text x="80" y="282" fill="#94A3B8" fontSize="9" fontFamily="sans-serif">L3 GL • Algorithmique • 08h-10h</text>
                <rect x="80" y="298" width="60" height="18" rx="9" fill="#22c55e" fillOpacity="0.2" />
                <text x="92" y="310" fill="#4ADE80" fontSize="8" fontWeight="bold" fontFamily="sans-serif">APPROUVÉ</text>
                
                <path d="M340 50L348 58L340 66L332 58Z" fill="#73A5D4" className="animate-pulse" />
                <path d="M40 200L45 205L40 210L35 205Z" fill="#73A5D4" className="animate-pulse" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-24 bg-[#12192B] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <h3 className="text-xs font-bold text-[#73A5D4] uppercase tracking-widest">Une Gestion Optimisée</h3>
            <h4 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Fonctionnalités Clés du Portail
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#17203A] p-8 rounded-2xl border border-white/5 hover:border-[#73A5D4]/50 hover:shadow-lg hover:shadow-[#73A5D4]/10 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-[#73A5D4]/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#73A5D4]/20 transition-all">
                <DoorOpen className="text-[#73A5D4] w-6 h-6" />
              </div>
              <h5 className="text-lg font-bold mb-3 text-white">Disponibilité des Salles</h5>
              <p className="text-gray-400 text-sm leading-relaxed">
                Suivez en temps réel le taux d'occupation de toutes les salles de cours, laboratoires d'informatique et amphithéâtres.
              </p>
            </div>

            <div className="bg-[#17203A] p-8 rounded-2xl border border-white/5 hover:border-[#73A5D4]/50 hover:shadow-lg hover:shadow-[#73A5D4]/10 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-[#73A5D4]/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#73A5D4]/20 transition-all">
                <Calendar className="text-[#73A5D4] w-6 h-6" />
              </div>
              <h5 className="text-lg font-bold mb-3 text-white">Emploi du Temps Interactif</h5>
              <p className="text-gray-400 text-sm leading-relaxed">
                Visualisez et modifiez les créneaux horaires de chaque mention et niveau grâce à une grille d'affichage dynamique et claire.
              </p>
            </div>

            <div className="bg-[#17203A] p-8 rounded-2xl border border-white/5 hover:border-[#73A5D4]/50 hover:shadow-lg hover:shadow-[#73A5D4]/10 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-[#73A5D4]/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#73A5D4]/20 transition-all">
                <ShieldCheck className="text-[#73A5D4] w-6 h-6" />
              </div>
              <h5 className="text-lg font-bold mb-3 text-white">Validation des Requêtes</h5>
              <p className="text-gray-400 text-sm leading-relaxed">
                Les enseignants soumettent des demandes de modification d'horaire. Le Chef de Mention valide ou rejette en un clic sans conflit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer matching screenshot */}
      <footer className="bg-[#12192B] text-white pt-16 pb-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <h4 className="text-lg font-bold mb-6 text-white">Navigation</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-[#73A5D4] transition-colors">Formations</a></li>
              <li><a href="#" className="hover:text-[#73A5D4] transition-colors">Projets</a></li>
              <li><a href="#" className="hover:text-[#73A5D4] transition-colors">Recherche</a></li>
              <li><a href="#" className="hover:text-[#73A5D4] transition-colors">Partenaires</a></li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-1">
            <h4 className="text-lg font-bold mb-6 text-white">Contact</h4>
            <ul className="space-y-6 text-gray-400">
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white">
                  <Mail size={18} />
                </div>
                <span>renseignement@emit.mg</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white">
                  <Phone size={18} />
                </div>
                <span>+261 33 70 470 00</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white">
                  <MapPin size={18} />
                </div>
                <span>Fianarantsoa, Madagascar</span>
              </li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-1">
            <h4 className="text-lg font-bold mb-6 text-white">Rejoignez-nous</h4>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Découvrez nos formations et commencez votre parcours vers l'excellence.
            </p>
            <button className="bg-[#73A5D4] hover:bg-[#5C8ABF] text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all">
              Nos formations
            </button>
          </div>

          <div className="col-span-1 md:col-span-1">
            <h4 className="text-lg font-bold mb-6 text-white">Réseaux sociaux</h4>
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-[#73A5D4] transition-colors font-bold text-sm">Fb</a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-[#73A5D4] transition-colors font-bold text-sm">Ig</a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-[#73A5D4] transition-colors font-bold text-sm">In</a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-[#73A5D4] transition-colors font-bold text-sm">X</a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative flex items-center justify-center mb-8">
          <div className="absolute w-full h-[1px] bg-white/10 top-1/2 -translate-y-1/2"></div>
          <div className="w-3 h-3 rounded-full bg-[#73A5D4] relative z-10"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} École de Management et d'Innovation Technologique
        </div>
      </footer>
    </div>
  );
}

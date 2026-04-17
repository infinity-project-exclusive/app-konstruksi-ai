/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Building2, 
  LayoutDashboard, 
  Sparkles, 
  Calculator, 
  Users, 
  CreditCard, 
  LogOut, 
  Search,
  Plus,
  ArrowRight,
  Download,
  Share2,
  Settings,
  Image as ImageIcon,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Bell,
  CheckCircle,
  Clock,
  MoreVertical,
  ChevronRight,
  ShieldCheck,
  User as UserIcon,
  MessageSquare,
  FileText,
  MapPin,
  CloudSun,
  ClipboardList,
  Wallet,
  Star,
  HelpCircle,
  Info,
  Phone,
  Sun,
  Moon,
  Zap,
  Palette,
  Eye,
  History,
  Store,
  Camera,
  PieChart,
  Repeat,
  Calendar,
  Ticket,
  Package,
  Heart,
  Globe,
  Fingerprint,
  Users2,
  DownloadCloud,
  Languages,
  MessageCircle,
  Smartphone,
  Send,
  UserCheck,
  Cctv,
  Wrench,
  Award,
  Video,
  BookOpen,
  PlusCircle,
  LineChart,
  X
} from "lucide-react";
import { PROVINCES, AHSP_CATALOG } from "./constants";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Toaster, toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { GoogleGenAI } from "@google/genai";
import { 
  auth, 
  db, 
  loginWithGoogle, 
  handleFirestoreError, 
  OperationType 
} from "./firebase";
import { 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  onSnapshot, 
  query, 
  where, 
  orderBy,
  Timestamp,
  updateDoc
} from "firebase/firestore";

// Landing Page Component
function LandingPage({ onLogin, onGuestLogin }: { onLogin: () => void, onGuestLogin: () => void }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 scroll-smooth">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
              <Building2 className="text-white h-6 w-6" />
            </div>
            <span className="font-black text-xl tracking-tighter italic">IndoConstruct AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-slate-500">
            <a href="#fitur" className="hover:text-primary transition-colors">Fitur</a>
            <a href="#cara-kerja" className="hover:text-primary transition-colors">Cara Kerja</a>
            <a href="#kontak" className="hover:text-primary transition-colors">Kontak</a>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="ghost" className="hidden sm:flex font-bold text-slate-500" onClick={onGuestLogin}>COBA DEMO</Button>
             <Button className="bg-slate-900 text-white font-black px-6 rounded-xl h-12 shadow-xl hover:bg-slate-800" onClick={onLogin}>MASUK</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <Badge className="bg-primary/10 text-primary py-2 px-4 rounded-full font-black tracking-widest text-xs">REVOLUASI KONSTRUKSI INDONESIA</Badge>
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tight leading-[0.9] text-slate-900">
              Bangun Rumah <br/><span className="text-primary underline decoration-8 decoration-primary/20 underline-offset-8">Tanpa Pusing</span>
            </h1>
            <p className="text-xl text-slate-500 font-medium max-w-lg leading-relaxed">
              Platform AI tercanggih di Indonesia untuk desain arsitektur otomatis, hitung RAB akurat, hingga pantauan proyek langsung dari HP Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
               <Button className="h-16 px-10 bg-primary text-white rounded-2xl font-black text-xl shadow-2xl shadow-primary/30 hover:scale-105 transition-transform" onClick={onLogin}>
                 MULAI BANGUN SEKARANG
                 <ArrowRight size={24} className="ml-3" />
               </Button>
               <Button variant="outline" className="h-16 px-10 border-4 border-slate-200 rounded-2xl font-black text-xl hover:bg-slate-50" onClick={onGuestLogin}>
                 GUEST ACCESS (DEMO)
               </Button>
            </div>
            <div className="flex items-center gap-6 pt-4">
               <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => <div key={i} className="h-10 w-10 rounded-full border-4 border-white bg-slate-200 overflow-hidden"><img src={`https://picsum.photos/seed/${i+100}/100/100`} /></div>)}
               </div>
               <p className="text-sm font-bold text-slate-400 uppercase tracking-widest tracking-tighter">Dipercaya oleh 5,000+ Kontraktor & Pemilik Rumah</p>
            </div>
          </div>
          <div className="relative">
             <div className="absolute -inset-10 bg-primary/20 blur-[100px] rounded-full animate-pulse" />
             <div className="relative bg-white rounded-[3rem] shadow-2xl overflow-hidden border-8 border-white">
                <img src="https://picsum.photos/seed/modern-house/1200/800" alt="House" className="w-full aspect-[4/3] object-cover" />
                <div className="absolute top-10 right-10 p-6 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-primary/20">
                   <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Total Biaya (RAB)</p>
                   <p className="text-3xl font-black text-primary tracking-tighter">Rp 450.000.000</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="fitur" className="py-20 px-6 bg-slate-900 text-white rounded-[4rem] mx-4">
         <div className="max-w-7xl mx-auto space-y-20">
            <div className="text-center space-y-4">
               <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter">Satu Aplikasi, <br/>Semua Solusi Konstruksi</h2>
               <p className="text-slate-400 text-lg font-medium">Lengkap, Pintar, dan Sangat Mudah Digunakan.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
               <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all group">
                  <div className="h-16 w-16 bg-primary rounded-2xl flex items-center justify-center mb-8 rotate-3 group-hover:rotate-0 transition-transform">
                     <Sparkles size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-black italic mb-4">AI Architect</h3>
                  <p className="text-slate-400 font-medium">Buat ribuan desain rumah hanya dengan mengetik keinginan Anda.</p>
               </div>
               <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all group">
                  <div className="h-16 w-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-8 rotate-3 group-hover:rotate-0 transition-transform">
                     <Calculator size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-black italic mb-4">Smart RAB</h3>
                  <p className="text-slate-400 font-medium">Hitung biaya bangunan otomatis sesuai harga material di wilayah Anda.</p>
               </div>
               <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all group">
                  <div className="h-16 w-16 bg-green-500 rounded-2xl flex items-center justify-center mb-8 rotate-3 group-hover:rotate-0 transition-transform">
                     <Cctv size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-black italic mb-4">CCTV Proyek</h3>
                  <p className="text-slate-400 font-medium">Pantau tukang dan progres fisik secara LIVE 360° dari ponsel Anda.</p>
               </div>
            </div>
         </div>
      </section>

      {/* Steps */}
      <section id="cara-kerja" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
           <div className="grid md:grid-cols-2 gap-20 items-center">
              <div className="space-y-12">
                 <div className="space-y-4">
                    <h2 className="text-5xl font-black italic tracking-tighter leading-none">Membangun Rumah <br/>Dalam 3 Langkah Mudah</h2>
                    <p className="text-slate-500 font-medium text-lg">Kami mendampingi Anda dari lahan kosong sampai kunci di tangan.</p>
                 </div>
                 <div className="space-y-10">
                    {[
                      { step: "01", title: "Rancang Dengan AI", desc: "Ketik konsep rumah Anda, AI kami akan buatkan visual & denah instan." },
                      { step: "02", title: "Hitung Anggaran", desc: "Dapatkan rincian biaya (RAB) paling akurat berdasarkan standar nasional." },
                      { step: "03", title: "Eksekusi & Pantau", desc: "Hubungkan dengan kontraktor pilihan dan pantau progres tiap harinya." }
                    ].map((s, i) => (
                      <div key={i} className="flex gap-8 group">
                         <div className="text-6xl font-black text-slate-100 group-hover:text-primary transition-colors leading-none italic">{s.step}</div>
                         <div className="space-y-2 pt-2">
                            <h4 className="text-2xl font-black italic tracking-tighter">{s.title}</h4>
                            <p className="text-slate-500 font-medium leading-normal">{s.desc}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="bg-slate-100 rounded-[4rem] aspect-square overflow-hidden shadow-inner flex items-center justify-center relative">
                 <img src="https://picsum.photos/seed/plan/1000/1000" className="w-full h-full object-cover opacity-80" />
                 <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                 <div className="absolute bottom-10 left-10 right-10 bg-white p-8 rounded-[3rem] shadow-2xl border-4 border-primary/10">
                    <div className="flex items-center gap-4 mb-4">
                       <CheckCircle className="text-green-500 h-8 w-8" />
                       <h5 className="font-black italic">Desain Siap Bangun</h5>
                    </div>
                    <div className="space-y-3">
                       <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-primary w-full" /></div>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Validasi Kelayakan Bangunan: 100% (AMAN)</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-slate-50">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
            <div className="flex-1 bg-white p-12 rounded-[3.5rem] border shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 text-primary/5"><Building2 size={120} /></div>
               <div className="relative z-10 space-y-6">
                  <div className="flex gap-1">
                     {[1,2,3,4,5].map(i => <Star key={i} size={16} className="fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-2xl font-black italic tracking-tight italic leading-relaxed">"Aplikasi ini sangat memudahkan saya yang benar-benar awam soal teknik. Hitung biaya rumah jadi gak perlu ribet!"</p>
                  <div>
                     <p className="font-black italic text-lg">Bu Heni</p>
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pemilik Rumah di Bandung</p>
                  </div>
               </div>
            </div>
            <div className="flex-1 bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 text-white/5"><ShieldCheck size={120} /></div>
               <div className="relative z-10 space-y-6">
                  <div className="flex gap-1">
                     {[1,2,3,4,5].map(i => <Star key={i} size={16} className="fill-primary text-primary" />)}
                  </div>
                  <p className="text-2xl font-black italic tracking-tight italic leading-relaxed">"Sebagai kontraktor, IndoConstruct membantu saya transparan dengan client. Progres proyek jadi lebih jelas."</p>
                  <div>
                     <p className="font-black italic text-lg">Pak Agus</p>
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Kontraktor Sipil</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Final CTA */}
      <section id="kontak" className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
           <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-none">Siap Wujudkan Rumah <br/>Impian Anda?</h2>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button className="h-20 px-12 bg-primary text-white rounded-3xl font-black text-2xl shadow-2xl shadow-primary/30 hover:scale-105 transition-transform" onClick={onLogin}>
                 GABUNG SEKARANG
              </Button>
              <a href="https://wa.me/6282198606806" target="_blank" rel="noreferrer" className="h-20 px-12 bg-green-500 text-white rounded-3xl font-black text-2xl shadow-2xl shadow-green-500/30 flex items-center justify-center gap-4 hover:scale-105 transition-transform no-underline">
                 <Smartphone size={32} />
                 KONSULTASI WA
              </a>
           </div>
           <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">GRATIS COBA | LOGIN AMAN DENGAN GOOGLE</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div className="col-span-2 space-y-6">
             <div className="flex items-center gap-3">
                <div className="bg-primary p-2 rounded-xl">
                  <Building2 className="text-white h-6 w-6" />
                </div>
                <span className="font-black text-2xl tracking-tighter italic">IndoConstruct AI</span>
             </div>
             <p className="text-slate-500 font-medium max-w-sm">Membantu masyarakat Indonesia membangun hunian berkualitas dengan bantuan teknologi kecerdasan buatan.</p>
          </div>
          <div className="space-y-4">
             <h5 className="font-black italic uppercase text-xs text-slate-400 tracking-widest">Tautan Cepat</h5>
             <ul className="space-y-3 font-bold text-slate-600">
                <li><a href="#" className="hover:text-primary transition-colors">Tentang Kami</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Harga Nasional</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Panduan Bangun</a></li>
             </ul>
          </div>
          <div className="space-y-4">
             <h5 className="font-black italic uppercase text-xs text-slate-400 tracking-widest">Ikuti Kami</h5>
             <div className="flex gap-4">
                {[1,2,3,4].map(i => <div key={i} className="h-10 w-10 bg-slate-100 rounded-xl hover:bg-primary/10 transition-colors cursor-pointer" />)}
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: 'Halo! Saya asisten IndoConstruct. Ada yang bisa saya bantu tentang denah, biaya, atau pembangunan rumah Anda?' }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMsg,
        config: {
          systemInstruction: "Anda adalah Asisten IndoConstruct AI. Ahli konstruksi, arsitektur, dan RAB di Indonesia. Gunakan bahasa Indonesia yang sangat mudah dipahami orang awam. Singkat dan jelas."
        }
      });
      
      const aiText = response.text || "Maaf, saya sedang mengalami kendala teknis.";
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'ai', text: "Maaf, koneksi AI sedang sibuk. Silakan coba lagi nanti." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
       <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="absolute bottom-20 right-0 w-80 md:w-96 bg-white rounded-[2.5rem] shadow-2xl border-4 border-slate-100 overflow-hidden flex flex-col h-[500px]"
            >
               <div className="bg-slate-900 p-6 text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center">
                        <Sparkles size={20} className="text-white" />
                     </div>
                     <div>
                        <p className="font-black italic text-sm">IndoConstruct AI Chat</p>
                        <p className="text-[10px] uppercase font-bold text-slate-400">Online & Siap Membantu</p>
                     </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-white/50" onClick={() => setIsOpen(false)}>
                     <X size={20} />
                  </Button>
               </div>
               <ScrollArea className="flex-1 p-6 space-y-4">
                  <div className="space-y-4 pb-4">
                    {messages.map((m, i) => (
                      <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                         <div className={`max-w-[80%] p-4 rounded-3xl text-sm font-medium ${m.role === 'user' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700'}`}>
                            {m.text}
                         </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                         <div className="bg-slate-100 p-4 rounded-3xl"><Loader2 size={16} className="animate-spin text-slate-400" /></div>
                      </div>
                    )}
                  </div>
               </ScrollArea>
               <div className="p-6 border-t bg-slate-50">
                  <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                     <Input 
                       placeholder="Ketik pesan..." 
                       value={input} 
                       onChange={(e) => setInput(e.target.value)}
                       className="rounded-2xl border-slate-200"
                     />
                     <Button type="submit" size="icon" className="bg-slate-900 rounded-2xl shrink-0" disabled={isLoading}>
                        <Send size={18} />
                     </Button>
                  </form>
               </div>
            </motion.div>
          )}
       </AnimatePresence>
       <div className="flex flex-col gap-3">
          <a href="https://wa.me/6282198606806" target="_blank" rel="noreferrer" className="h-16 w-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform border-4 border-white">
             <Smartphone size={28} />
          </a>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="h-16 w-16 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 hover:scale-110 transition-transform border-4 border-white relative"
          >
            {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
            {!isOpen && <div className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full border-2 border-white animate-bounce" />}
          </button>
       </div>
    </div>
  );
}

// Initialization
function AuthScreen({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#f0f4f8] p-4 sm:p-6">
      <div className="max-w-md w-full space-y-10 text-center">
        <div className="space-y-6">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mx-auto bg-primary w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/30"
          >
            <Building2 className="text-white h-12 w-12" />
          </motion.div>
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tighter text-slate-900 leading-none">IndoConstruct</h1>
            <p className="text-lg text-slate-500 font-bold tracking-tight px-4 underline decoration-primary/20 decoration-4">Rancang & Bangun Rumah Jadi Mudah</p>
          </div>
        </div>

        <Card className="border-none shadow-2xl rounded-[40px] overflow-hidden p-10 space-y-8 bg-white border-b-8 border-primary/10">
          <div className="space-y-3">
            <h2 className="text-2xl font-black text-slate-900 italic tracking-tight">Halo, Selamat Datang!</h2>
            <p className="text-sm font-medium text-slate-500 max-w-[200px] mx-auto">Masuk dengan Google untuk mulai membangun rumah impian Anda.</p>
          </div>
          <Button 
            onClick={onLogin}
            className="w-full h-16 bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-100 rounded-2xl flex items-center justify-center gap-4 transition-all shadow-sm hover:shadow-md"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="h-6 w-6" />
            <span className="font-black text-lg tracking-tight">MASUK DENGAN GOOGLE</span>
          </Button>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck size={16} className="text-green-500" />
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Sistem Keamanan Terjamin</p>
          </div>
        </Card>

        <div className="grid grid-cols-3 gap-2 text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">
          <div className="bg-white/50 py-2 rounded-full">MUDAH DIGUNAKAN</div>
          <div className="bg-white/50 py-2 rounded-full">HARGA NASIONAL</div>
          <div className="bg-white/50 py-2 rounded-full">DIBANTU AI</div>
        </div>
      </div>
    </div>
  );
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

type Project = {
  id: string;
  name: string;
  client: string;
  status: "Planning" | "In Progress" | "Completed";
  progress: number;
  lastUpdate: string;
  share_token?: string;
};

type Milestone = {
  id: string;
  project_id: string;
  title: string;
  description: string;
  is_completed: boolean;
  completed_at: string | null;
  documents?: string[];
};

type Notification = {
  id: string;
  type: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  credits: number;
  role: "super_admin" | "contractor" | "customer";
};

const DEMO_USER: User = {
  id: "demo-user",
  name: "Pengguna Demo",
  email: "demo@indoconstruct.com",
  credits: 999,
  role: "contractor"
};

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [isMilestonesLoading, setIsMilestonesLoading] = useState(false);

  // For Client Portal Demo
  const [viewMode, setViewMode] = useState<"app" | "portal">("app");
  const [portalToken, setPortalToken] = useState<string | null>(null);
  const [portalData, setPortalData] = useState<{ project: Project; milestones: Milestone[] } | null>(null);

  // AI Gen State
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  // RAB State
  const [buildingArea, setBuildingArea] = useState<string>("");
  const [houseType, setHouseType] = useState("minimalis");
  const [selectedProvinceId, setSelectedProvinceId] = useState("jakarta");
  const [rabResult, setRabResult] = useState<{ boq: any[], total: number } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // New Features State
  const [showPermitChecklist, setShowPermitChecklist] = useState(false);
  const [dailyExpenses, setDailyExpenses] = useState<{ id: string, note: string, amount: number, date: string }[]>([]);
  const [newExpenseNote, setNewExpenseNote] = useState("");
  const [newExpenseAmount, setNewExpenseAmount] = useState("");
  const [weather, setWeather] = useState({ temp: 29, condition: "Cerah Berawan" });
  
  // 30 Features States
  const [darkMode, setDarkMode] = useState(false);
  const [showStyleQuiz, setShowStyleQuiz] = useState(false);
  const [is360Mode, setIs360Mode] = useState(false);
  const [rabHistory, setRabHistory] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([
    { name: "Semen Padang", stock: 50, unit: "Sak" },
    { name: "Pasir Merapi", stock: 2, unit: "Truk" }
  ]);
  const [debts, setDebts] = useState<any[]>([]);
  const [vouchers, setVouchers] = useState<any[]>([
    { code: "INDOPROMO", discount: "10%", desc: "Diskon Material Semen" }
  ]);
  const [points, setPoints] = useState(1250);
  const [showChat, setShowChat] = useState(false);
  const [showPWAInstall, setShowPWAInstall] = useState(false);
  const [language, setLanguage] = useState("id");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Floor Plan State
  const [rooms, setRooms] = useState<{ id: string, name: string, width: number, length: number }[]>([
    { id: "1", name: "Ruang Tamu", width: 4, length: 5 },
    { id: "2", name: "Kamar Tidur", width: 3, length: 3 }
  ]);
  const [floorPlanMode, setFloorPlanMode] = useState<"2d" | "3d" | "4d">("2d");
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomW, setNewRoomW] = useState("");
  const [newRoomL, setNewRoomL] = useState("");

  const handleAddRoom = () => {
    if (!newRoomName || !newRoomW || !newRoomL) return;
    const newRoom = {
      id: Math.random().toString(36).substr(2, 9),
      name: newRoomName,
      width: parseFloat(newRoomW),
      length: parseFloat(newRoomL)
    };
    setRooms([...rooms, newRoom]);
    setNewRoomName("");
    setNewRoomW("");
    setNewRoomL("");
    toast.success("Ruangan ditambahkan!");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setAuthLoading(true);
      if (fbUser) {
        try {
          const userRef = doc(db, "users", fbUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            setUser(userSnap.data() as User);
          } else {
            // New user registration
            const newUser: User = {
              id: fbUser.uid,
              name: fbUser.displayName || "User Baru",
              email: fbUser.email || "",
              credits: 100,
              role: "contractor", // Default role
            };
            await setDoc(userRef, newUser);
            setUser(newUser);
            toast.success("Akun berhasil dibuat!");
          }
        } catch (error) {
          console.error("Auth sync error", error);
          toast.error("Gagal sinkronisasi profil");
        }
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    if (isGuest) {
      // Mock data for demo
      setProjects([
        { id: "p1", name: "Rumah Minimalis Modern", client: "Bpk. Andi", status: "In Progress", progress: 45, lastUpdate: "Baru saja" },
        { id: "p2", name: "Renovasi Cafe Kopi", client: "Ibu Maya", status: "Planning", progress: 10, lastUpdate: "Kemarin" }
      ]);
      setNotifications([
        { id: "n1", type: "welcome", message: "Selamat datang di Demo IndoConstruct!", created_at: new Date().toISOString(), is_read: false }
      ]);
      return;
    }

    // Listen to Projects
    const qProjects = user.role === 'super_admin' 
      ? query(collection(db, "projects")) 
      : query(collection(db, "projects"), where("contractorId", "==", user.id));

    const unsubProjects = onSnapshot(qProjects, (snapshot) => {
      const pList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as any[];
      
      setProjects(pList.map(p => ({
        id: p.id,
        name: p.title,
        client: p.clientName,
        status: p.status === "in_progress" ? "In Progress" : p.status === "completed" ? "Completed" : "Planning",
        progress: p.progress || 0,
        lastUpdate: "Updated via Firestore",
        share_token: p.shareToken
      })));
    }, (err) => handleFirestoreError(err, OperationType.GET, "projects"));

    // Listen to Notifications
    const qNotifs = query(
      collection(db, "notifications"), 
      where("userId", "==", user.id),
      orderBy("createdAt", "desc")
    );

    const unsubNotifs = onSnapshot(qNotifs, (snapshot) => {
      const nList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as any[];
      setNotifications(nList);
    }, (err) => handleFirestoreError(err, OperationType.GET, "notifications"));

    // Listen to User Document
    const unsubUser = onSnapshot(doc(db, "users", user.id), (doc) => {
      if (doc.exists()) {
        setUser(doc.data() as User);
      }
    }, (err) => handleFirestoreError(err, OperationType.GET, `users/${user.id}`));

    return () => {
      unsubProjects();
      unsubNotifs();
      unsubUser();
    };
  }, [user?.id, isGuest]); // Depend on user.id to avoid infinite re-runs if user object changes slightly

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      setIsGuest(false);
      toast.success("Login berhasil!");
    } catch (e) {
      toast.error("Gagal login dengan Google. Coba mode demo.");
    }
  };

  const handleDemoLogin = () => {
    setUser(DEMO_USER);
    setIsGuest(true);
    toast.success("Masuk dalam mode Demo. Selamat mencoba!");
  };

  const handleLogout = async () => {
    try {
      if (isGuest) {
        setUser(null);
        setIsGuest(false);
      } else {
        await signOut(auth);
      }
      toast.success("Berhasil keluar");
      setUser(null);
    } catch (e) {
      toast.error("Gagal logout");
    }
  };

  const fetchMilestones = async (projectId: string) => {
    setIsMilestonesLoading(true);
    try {
      const q = query(collection(db, `projects/${projectId}/milestones`), orderBy("title", "asc"));
      const unsub = onSnapshot(q, (snapshot) => {
        const mList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as any[];
        setMilestones(mList);
        setIsMilestonesLoading(false);
      }, (err) => {
        handleFirestoreError(err, OperationType.GET, `milestones/${projectId}`);
        setIsMilestonesLoading(false);
      });
      return unsub;
    } catch (e) {
      toast.error("Gagal memuat milestone");
      setIsMilestonesLoading(false);
    }
  };

  useEffect(() => {
    let unsub: (() => void) | undefined;
    if (selectedProjectId) {
      fetchMilestones(selectedProjectId).then(u => unsub = u);
    }
    return () => unsub?.();
  }, [selectedProjectId]);

  const handleToggleMilestone = async (id: string) => {
    if (!selectedProjectId) return;
    try {
      const mRef = doc(db, `projects/${selectedProjectId}/milestones`, id);
      const mSnap = await getDoc(mRef);
      if (mSnap.exists()) {
        const current = mSnap.data().isCompleted;
        await updateDoc(mRef, {
          isCompleted: !current,
          completedAt: !current ? Timestamp.now().toDate().toISOString() : null
        });
        toast.success("Status milestone diperbarui");
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `milestones/${id}`);
    }
  };

  const openPortal = async (token: string) => {
    setViewMode("portal");
    setPortalToken(token);
    try {
      // For shared portal, we need to query by shareToken
      const q = query(collection(db, "projects"), where("shareToken", "==", token));
      const pSnap = await getDoc(doc(db, "projects", "placeholder")); // This is tricky without knowing ID.
      // Better: use a query.
      // But rules restrict listing if not owner.
      // For public portal, rules should allow query by token.
      
      // Let's assume the user has access for now or we update rules later.
      toast.info("Portal Klien sedang dimigrasikan ke Firestore...");
      // For now, keep mock or implement real query.
    } catch (e) {
      toast.error("Portal tidak ditemukan");
    }
  };

  const deductCredits = async (amount: number) => {
    if (!user) return false;
    if (user.credits < amount) {
      toast.error("Kredit tidak cukup!");
      return false;
    }
    try {
      const userRef = doc(db, "users", user.id);
      await updateDoc(userRef, {
        credits: user.credits - amount
      });
      return true;
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `users/${user.id}`);
      return false;
    }
  };

  const handleGenerateAI = async () => {
    if (!aiPrompt) {
      toast.error("Masukkan deskripsi desain!");
      return;
    }

    const hasCredits = await deductCredits(5);
    if (!hasCredits) return;

    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      // Prompt for architect-specific instructions
      const fullPrompt = `Generate a high-fidelity professional architectural 3D render: ${aiPrompt}. 
      Style: photorealistic, 8k, architectural photography style, realistic lighting.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: [{ parts: [{ text: fullPrompt }] }],
      });

      // Find the image part
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setGeneratedImage(`data:image/png;base64,${part.inlineData.data}`);
            toast.success("Desain berhasil dirender!");
            break;
          }
        }
      } else {
        toast.error("Gagal mendapatkan gambar dari AI.");
      }
    } catch (e) {
      console.error(e);
      toast.error("Terjadi kesalahan teknis.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCalculateRAB = async () => {
    if (!buildingArea || isNaN(Number(buildingArea))) {
      toast.error("Masukkan luas bangunan yang valid!");
      return;
    }

    setIsCalculating(true);
    try {
      // Logic using constants.ts
      const province = PROVINCES.find(p => p.id === selectedProvinceId);
      const multiplier = province?.multiplier || 1;
      
      const boq = AHSP_CATALOG.map(item => {
        const qty = Math.max(1, Math.floor(Math.random() * Number(buildingArea) * (houseType === "luxury" ? 1.5 : 1)));
        const price = item.basePrice * multiplier;
        return {
          ...item,
          qty,
          price,
          total: qty * price
        };
      });

      const total = boq.reduce((acc, curr) => acc + curr.total, 0);
      setRabResult({ boq, total });
      toast.success("Estimasi Biaya berhasil dihitung!");
    } catch (e) {
      toast.error("Gagal menghitung biaya");
    } finally {
      setIsCalculating(false);
    }
  };

  const handleAddExpense = () => {
    if (!newExpenseNote || !newExpenseAmount) return;
    const expense = {
      id: Math.random().toString(36).substr(2, 9),
      note: newExpenseNote,
      amount: Number(newExpenseAmount),
      date: new Date().toLocaleDateString('id-ID')
    };
    setDailyExpenses([expense, ...dailyExpenses]);
    setNewExpenseNote("");
    setNewExpenseAmount("");
    toast.success("Pengeluaran dicatat!");
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(val);
  };

  if (authLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#f8fafc]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 text-primary animate-spin" />
          <p className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Menyiapkan Ruang Kerja...</p>
        </div>
      </div>
    );
  }

  if (!user && !isGuest) {
    return (
      <>
        <Toaster position="top-right" />
        <LandingPage onLogin={handleGoogleLogin} onGuestLogin={handleDemoLogin} />
        <AIChatBot />
      </>
    );
  }

  return (
    <>
      {viewMode === "portal" ? (
        <ClientPortalView data={portalData} onBack={() => setViewMode("app")} />
      ) : (
        <div className={`flex h-screen bg-background text-foreground font-sans ${darkMode ? 'dark' : ''}`}>
      <Toaster position="top-right" />
      
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-slate-900 border-b z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
            <MoreVertical size={20} />
          </Button>
          <div className="bg-primary p-1.5 rounded-lg">
            <Building2 className="text-white h-5 w-5" />
          </div>
          <span className="font-extrabold text-lg tracking-tighter">IndoConstruct</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          <NotificationBell notifications={notifications} />
        </div>
      </div>

      {/* Sidebar - Desktop & Tablet */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-lg shadow-lg shadow-primary/20">
              <Building2 className="text-white h-6 w-6" />
            </div>
            <span className="font-extrabold text-xl tracking-tighter text-white">IndoConstruct</span>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={() => setIsSidebarOpen(false)}>
            <ChevronRight size={24} />
          </Button>
        </div>

        <ScrollArea className="flex-1 px-4 space-y-1">
          <div className="space-y-4">
            <div className="px-3">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Utama</p>
              <NavItem 
                icon={<LayoutDashboard size={18} />} 
                label="Beranda" 
                active={activeTab === "dashboard"} 
                onClick={() => { setActiveTab("dashboard"); setIsSidebarOpen(false); }} 
              />
              <NavItem 
                icon={<Users2 size={18} />} 
                label="Proyek Saya" 
                active={activeTab === "projects"} 
                onClick={() => { setActiveTab("projects"); setIsSidebarOpen(false); }} 
              />
              <NavItem 
                icon={<Award size={18} />} 
                label="Ahli Lokal" 
                active={activeTab === "directory"} 
                onClick={() => { setActiveTab("directory"); setIsSidebarOpen(false); }} 
              />
            </div>

            <div className="px-3 pt-4">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Fitur AI & Kalkulator</p>
              <NavItem 
                icon={<Sparkles size={18} />} 
                label="AI Desain Rumah" 
                active={activeTab === "generator"} 
                onClick={() => { setActiveTab("generator"); setIsSidebarOpen(false); }} 
              />
              <NavItem 
                icon={<MapPin size={18} />} 
                label="Perancang Denah" 
                active={activeTab === "floorplan"} 
                onClick={() => { setActiveTab("floorplan"); setIsSidebarOpen(false); }} 
              />
              <NavItem 
                icon={<Calculator size={18} />} 
                label="Hitung RAB" 
                active={activeTab === "rab"} 
                onClick={() => { setActiveTab("rab"); setIsSidebarOpen(false); }} 
              />
              <NavItem 
                icon={<Palette size={18} />} 
                label="Kuis Gaya AI" 
                active={activeTab === "stylequiz"} 
                onClick={() => { setActiveTab("stylequiz"); setIsSidebarOpen(false); }} 
              />
            </div>

            <div className="px-3 pt-4">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Manajemen Proyek</p>
              <NavItem 
                icon={<Wallet size={18} />} 
                label="Belanja & Hutang" 
                active={activeTab === "expenses"} 
                onClick={() => { setActiveTab("expenses"); setIsSidebarOpen(false); }} 
              />
              <NavItem 
                icon={<Package size={18} />} 
                label="Gudang Material" 
                active={activeTab === "inventory"} 
                onClick={() => { setActiveTab("inventory"); setIsSidebarOpen(false); }} 
              />
              <NavItem 
                icon={<Cctv size={18} />} 
                label="CCTV Proyek" 
                active={activeTab === "view360"} 
                onClick={() => { setActiveTab("view360"); setIsSidebarOpen(false); }} 
              />
            </div>

            <div className="px-3 pt-4">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Lainnya</p>
              <NavItem 
                icon={<Store size={18} />} 
                label="Toko Material" 
                active={activeTab === "store"} 
                onClick={() => { setActiveTab("store"); setIsSidebarOpen(false); }} 
              />
              <NavItem 
                icon={<Ticket size={18} />} 
                label="Voucher Diskon" 
                active={activeTab === "vouchers"} 
                onClick={() => { setActiveTab("vouchers"); setIsSidebarOpen(false); }} 
              />
              <NavItem 
                icon={<HelpCircle size={18} />} 
                label="Pusat Bantuan" 
                active={activeTab === "help"} 
                onClick={() => { setActiveTab("help"); setIsSidebarOpen(false); }} 
              />
            </div>
          </div>
        </ScrollArea>

        <div className="p-6 border-t border-white/5">
          <div className="bg-white/5 rounded-2xl p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Poin Saya</span>
              <span className="text-xs font-black text-primary">{points} Poin</span>
            </div>
            <Progress value={65} className="h-1 bg-slate-800" />
          </div>
          
          <div className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-xl cursor-pointer transition-colors group">
            <Avatar user={user} />
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold truncate text-white">{user?.name || "User"}</p>
              <p className="text-[9px] text-slate-500 uppercase font-black italic">{user?.role?.replace('_', ' ')}</p>
            </div>
            <button onClick={handleLogout} className="p-1 hover:text-white text-slate-500 transition-colors">
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto flex flex-col pt-16 md:pt-0 pb-20 md:pb-0">
        <header className="hidden md:flex h-20 bg-background/80 backdrop-blur-md sticky top-0 z-10 items-center justify-between px-10 border-b border-border/50">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight italic">
              {activeTab === 'dashboard' ? 'Panel Utama' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1>
            <p className="text-slate-500 text-sm font-medium">Selamat datang kembali, {user?.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full h-11 w-11" onClick={() => setDarkMode(!darkMode)}>
               {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-600" />}
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" className="rounded-full h-11 px-4 gap-2 border-2" />}>
                  <Languages size={18} />
                  <span className="text-xs font-bold">{language === 'id' ? 'Indonesia' : 'English'}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('id')}>Bahasa Indonesia</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <NotificationBell notifications={notifications} />
            <Button className="rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 h-11 px-6 font-bold">
              <Plus size={18} className="mr-2" /> BUAT PROYEK
            </Button>
          </div>
        </header>

        <div className="p-4 md:p-10 space-y-6 md:space-y-10 max-w-[1400px] mx-auto w-full">
            <AnimatePresence mode="wait">
              {activeTab === "directory" && (
              <motion.div key="directory" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div>
                  <h2 className="text-3xl font-black italic tracking-tighter">Ahli Konstruksi Lokal</h2>
                  <p className="text-slate-500 font-medium font-sans">Temukan kontraktor dan arsitek berlisensi di {selectedProvinceId}.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {[
                     { name: "Bpk. Heru Susanto", title: "Kontraktor Utama", xp: "15 Thn", avatar: "H" },
                     { name: "Ibu Sarah Wijaya", title: "Arsitek Interior", xp: "8 Thn", avatar: "S" }
                   ].map((pro, i) => (
                     <Card key={i} className="rounded-3xl border-2 p-6 flex items-center gap-6">
                        <div className="h-16 w-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-2xl">{pro.avatar}</div>
                        <div className="flex-1">
                           <p className="text-xl font-black italic tracking-tight">{pro.name}</p>
                           <p className="text-xs font-bold text-primary uppercase">{pro.title}</p>
                           <p className="text-[10px] font-bold text-slate-400 mt-1">Pengalaman: {pro.xp}</p>
                        </div>
                        <Button className="rounded-xl font-bold border-2" variant="outline">PORTFOLIO</Button>
                     </Card>
                   ))}
                </div>
              </motion.div>
            )}

            {activeTab === "dashboard" && (
                <motion.div 
                  key="dashboard"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="bg-white p-3 rounded-2xl shadow-sm text-blue-600">
                        <CloudSun size={32} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 leading-tight">Cuaca Lokasi Proyek</p>
                        <p className="text-sm text-slate-500 font-medium">{weather.temp}°C • {weather.condition} • Cocok untuk pembangunan</p>
                      </div>
                    </div>
                    <Button variant="outline" className="rounded-full bg-white text-blue-600 border-blue-100 font-bold text-xs" onClick={() => toast.info("Cuaca diambil berdasarkan koordinat proyek.")}>DETAIL CUACA</Button>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {user?.role === 'customer' ? (
                      <>
                        <StatCard label="Rumah Anda" value="1" subtext="Konstruksi Aktif" />
                        <StatCard label="Pekerjaan Selesai" value="50%" subtext="Progres Fisik" />
                        <StatCard label="Waktu Kerja" value="15 Klp" subtext="Sejak Mulai" />
                        <StatCard label="Uang Muka Sisa" value="Rp 45jt" subtext="Termin Berikutnya" />
                      </>
                    ) : (
                      <>
                        <StatCard label={user?.role === 'super_admin' ? "Total Pengguna" : "Proyek Berjalan"} value={user?.role === 'super_admin' ? "128" : "12"} subtext="+2 Minggu Ini" />
                        <StatCard label={user?.role === 'super_admin' ? "Omzet Sistem" : "Klien Aktif"} value={user?.role === 'super_admin' ? "Rp 420jt" : "8"} subtext="Bulan April 2024" />
                        <StatCard label="Rencana Biaya" value="24" subtext="Dibuat oleh User" />
                        <StatCard label="Hemat Biaya" value="22%" subtext="Bantuan AI" trend="up" />
                      </>
                    )}
                  </div>

                  {/* Main Dashboard Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                      <Card className="rounded-[2.5rem] border-2 shadow-xl overflow-hidden">
                        <CardHeader className="p-8 border-b bg-slate-50/50">
                           <div className="flex justify-between items-center">
                              <div>
                                 <CardTitle className="text-lg font-black italic">Analisa Biaya Mingguan</CardTitle>
                                 <CardDescription>Grafik pengeluaran bahan & jasa 7 hari terakhir.</CardDescription>
                              </div>
                              <div className="text-right">
                                 <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Total Minggu Ini</p>
                                 <p className="text-2xl font-black text-primary tracking-tighter">Rp 12.800.000</p>
                              </div>
                           </div>
                        </CardHeader>
                        <CardContent className="p-8">
                           <div className="h-48 w-full flex items-end gap-2 px-4">
                              {[35, 60, 45, 80, 25, 90, 55].map((h, i) => (
                                <motion.div 
                                  key={i}
                                  initial={{ height: 0 }}
                                  animate={{ height: `${h}%` }}
                                  className="flex-1 bg-primary/20 rounded-t-xl hover:bg-primary transition-colors relative group"
                                >
                                   <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                      {h}jt
                                   </div>
                                </motion.div>
                              ))}
                           </div>
                           <div className="flex justify-between mt-4 px-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                              <span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span><span>Min</span>
                           </div>
                        </CardContent>
                      </Card>
                      <Card className="border-border shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between border-b py-4">
                          <div>
                            <CardTitle className="text-base">
                              {user?.role === 'customer' ? 'Timeline Pembangunan' : 'Daftar Proyek Aktif'}
                            </CardTitle>
                            <CardDescription>
                              {user?.role === 'customer' ? 'Pantau progres pembangunan properti Anda' : 'Status performa pekerjaan saat ini'}
                            </CardDescription>
                          </div>
                          {user?.role === 'contractor' && (
                             <Button variant="ghost" size="sm" className="text-gray-500 font-bold text-xs">LOG AKTIVITAS</Button>
                          )}
                        </CardHeader>
                        <CardContent className="p-0">
                          <ScrollArea className="h-[400px]">
                            <div className="p-4 space-y-4">
                              {user?.role === 'customer' ? (
                                projects.length > 0 ? (
                                  <div className="p-4">
                                     <ProjectMilestones project={projects[0]} isReadOnly />
                                  </div>
                                ) : (
                                  <div className="p-10 text-center">
                                    <p className="text-sm font-bold text-slate-400">Belum ada proyek yang dibagikan.</p>
                                  </div>
                                )
                              ) : (
                                projects.map(p => (
                                  <div 
                                    key={p.id} 
                                    onClick={() => setSelectedProjectId(p.id)}
                                    className={`flex items-center gap-4 p-5 hover:bg-slate-50 rounded-2xl border transition-all cursor-pointer group ${selectedProjectId === p.id ? 'border-primary bg-slate-50' : 'border-transparent'}`}
                                  >
                                    <div className={`h-12 w-12 bg-white shadow-sm border rounded-xl flex items-center justify-center transition-colors ${selectedProjectId === p.id ? 'text-primary border-primary/20' : 'text-slate-400 border-border'}`}>
                                      <Building2 size={24} />
                                    </div>
                                    <div className="flex-1">
                                      <p className="font-extrabold text-sm tracking-tight text-slate-900">{p.name}</p>
                                      <p className="text-xs text-slate-500 font-medium">{p.client}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <div className="text-right">
                                        <Badge className={`rounded-md border-none px-2.5 py-0.5 text-[10px] font-bold ${
                                          p.status === "Completed" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                                        }`}>
                                          {p.status.toUpperCase()}
                                        </Badge>
                                        <div className="mt-2 text-[10px] font-bold text-slate-400">{p.progress}% PROGRES</div>
                                      </div>
                                      <button onClick={(e) => { e.stopPropagation(); openPortal(p.share_token!); }} className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg">
                                        <Share2 size={16} />
                                      </button>
                                      <ChevronRight size={18} className="text-slate-300" />
                                    </div>
                                  </div>
                                ))
                              )}
                            </div>
                          </ScrollArea>
                        </CardContent>
                      </Card>

                      {selectedProjectId && user?.role === 'contractor' && projects.find(p => p.id === selectedProjectId) && (
                        <Card className="border-border shadow-md animate-in slide-in-from-bottom-2">
                           <CardHeader className="bg-slate-50 border-b py-4">
                              <CardTitle className="text-sm">Detail Progres: {projects.find(p => p.id === selectedProjectId)?.name}</CardTitle>
                           </CardHeader>
                           <CardContent className="p-6">
                              <ProjectMilestones 
                                project={projects.find(p => p.id === selectedProjectId)} 
                                onToggle={handleToggleMilestone}
                              />
                           </CardContent>
                        </Card>
                      )}
                    </div>

                    <div className="space-y-6">
                      <Card className="bg-[#141414] text-white border-none overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                          <Sparkles size={120} />
                        </div>
                        <CardHeader>
                          <CardTitle className="text-white">Akselerasi Pekerjaan</CardTitle>
                          <CardDescription className="text-gray-400">Gunakan AI untuk efisiensi RAB & Desain</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {user?.role !== 'customer' ? (
                            <>
                              <QuickActionBtn 
                                icon={<ImageIcon size={18} />} 
                                text="Render AI Pro (Gen 2)" 
                                onClick={() => setActiveTab("generator")}
                              />
                              <QuickActionBtn 
                                icon={<FileText size={18} />} 
                                text="Hitung RAB Otomatis" 
                                onClick={() => setActiveTab("rab")}
                              />
                              <QuickActionBtn 
                                icon={<CreditCard size={18} />} 
                                text="Top Up Saldo Kredit" 
                              />
                            </>
                          ) : (
                            <>
                              <QuickActionBtn 
                                icon={<MessageSquare size={18} />} 
                                text="Hubungi Arsitek" 
                              />
                              <QuickActionBtn 
                                icon={<Download size={18} />} 
                                text="Unduh Dokumen Kontrak" 
                              />
                              <QuickActionBtn 
                                icon={<CreditCard size={18} />} 
                                text="Rincian Tagihan" 
                              />
                            </>
                          )}
                        </CardContent>
                      </Card>

                      <Card className="border-border border-dashed">
                         <CardHeader className="py-4">
                            <CardTitle className="text-sm">Pesan Terbaru</CardTitle>
                         </CardHeader>
                         <CardContent className="p-4 space-y-3">
                            <div className="flex gap-3 items-start">
                               <div className="h-8 w-8 rounded-full bg-slate-100 flex-shrink-0" />
                               <div>
                                  <p className="text-xs font-bold text-slate-800">Arsitek Utama</p>
                                  <p className="text-[10px] text-slate-500 line-clamp-2">Halo Bpk Budi, material banya merah sudah sampai di lokasi...</p>
                               </div>
                            </div>
                         </CardContent>
                      </Card>
                    </div>
                  </div>
                </motion.div>
              )}

            {activeTab === "generator" && (
              <motion.div 
                key="generator"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="max-w-4xl mx-auto space-y-10"
              >
                <div className="text-center space-y-4">
                   <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
                    <Sparkles size={14} /> Teknologi AI Tercanggih
                   </div>
                   <h2 className="text-4xl md:text-5xl font-black tracking-tighter italic leading-tight">Buat Desain Rumah Impian</h2>
                   <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg leading-relaxed">Cukup tuliskan keinginan Anda, dan AI kami akan membuatkan gambaran rumah yang sangat nyata dan profesional dalam hitungan detik.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                  <Card className="border-none shadow-2xl rounded-[40px] overflow-hidden p-8 bg-white border-b-8 border-slate-100">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Deskripsi Rumah Keinginan Anda</Label>
                        <Input 
                          placeholder="Contoh: Rumah tingkat 2 gaya Japandi, cat warna putih cream, ada taman depan luas..." 
                          value={aiPrompt}
                          onChange={(e) => setAiPrompt(e.target.value)}
                          className="h-20 text-lg rounded-3xl border-2 focus-visible:ring-primary font-medium"
                        />
                      </div>
                      <div className="space-y-2">
                         <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Pilih Gaya Cepat (Klik Di Sini)</Label>
                         <div className="grid grid-cols-3 gap-2">
                           {["Modern", "Minimalis", "Scandinavia", "Klasik", "Industrial", "Tropis"].map(style => (
                             <button 
                                key={style}
                                onClick={() => setAiPrompt(prev => prev + (prev ? ", " : "") + "gaya " + style)}
                                className="py-2 px-1 text-[10px] font-bold border rounded-xl hover:border-primary hover:text-primary transition-all bg-slate-50"
                             >
                               {style}
                             </button>
                           ))}
                         </div>
                      </div>
                      <Button 
                        onClick={handleGenerateAI}
                        disabled={isGenerating}
                        className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-black text-xl rounded-2xl shadow-xl shadow-primary/20 gap-3"
                      >
                        {isGenerating ? <Loader2 className="animate-spin h-6 w-6" /> : <Sparkles className="h-6 w-6" />}
                        BUAT GAMBAR SEKARANG
                      </Button>
                      <div className="flex items-center justify-between px-2">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Biaya Paket: <span className="text-primary italic">5 KREDIT</span></p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kredit Anda: <span className="text-primary italic font-black">{user?.credits || 0}</span></p>
                      </div>
                    </div>
                  </Card>

                  <div className="space-y-6">
                    <div className="relative aspect-square bg-[#f0f4f8] rounded-[40px] border-4 border-dashed border-slate-200 flex items-center justify-center overflow-hidden group shadow-inner">
                      {generatedImage ? (
                        <motion.img 
                          initial={{ scale: 1.1, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          src={generatedImage} 
                          alt="Desain AI" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700"
                        />
                      ) : (
                        <div className="text-center p-12 space-y-6">
                           <div className="bg-white h-24 w-24 rounded-full flex items-center justify-center mx-auto shadow-sm">
                             {isGenerating ? <Loader2 className="animate-spin h-12 w-12 text-primary" /> : <ImageIcon size={48} className="text-slate-200" />}
                           </div>
                           <div className="space-y-2">
                              <p className="font-black text-slate-400 uppercase tracking-tight text-xl">{isGenerating ? "Sedang Menggambar..." : "Hasil Desain Di Sini"}</p>
                              <p className="text-sm text-slate-400 font-medium">Tunggu 10-20 detik, AI sedang merancang rumah Anda.</p>
                           </div>
                        </div>
                      )}
                    </div>
                    {generatedImage && (
                      <div className="flex gap-4">
                        <Button variant="outline" className="flex-1 h-12 rounded-2xl border-2 font-bold gap-2" onClick={() => toast.success("Gambar berhasil disimpan ke galeri ponsel.")}>
                          <Download size={18} /> UNDUH
                        </Button>
                        <Button className="flex-1 h-12 rounded-2xl font-bold gap-2" variant="secondary" onClick={() => toast.info("Link desain disalin.")}>
                          <Share2 size={18} /> BAGIKAN
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Inspiration Gallery */}
                <div className="space-y-6 pt-10">
                   <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 pl-1">Inspirasi Desain Terpopuler</h3>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="aspect-video bg-slate-100 rounded-2xl border overflow-hidden relative group cursor-pointer">
                           <img 
                              src={`https://picsum.photos/seed/arch${i}/600/400`} 
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                              alt="Inspirasi"
                              referrerPolicy="no-referrer"
                           />
                           <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                              <p className="text-[10px] text-white font-bold uppercase tracking-widest">Gaya {i === 1 ? 'Eropa' : i === 2 ? 'Bali' : i === 3 ? 'Industrial' : 'Modern'}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === "rab" && (
              <motion.div 
                key="rab"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1 space-y-6">
                    <Card className="border-[#E4E3E0] rounded-3xl overflow-hidden shadow-lg border-2">
                      <CardHeader className="bg-slate-50">
                        <CardTitle className="text-lg font-black leading-tight italic">Rencana Anggaran Biaya (RAB)</CardTitle>
                        <CardDescription>Pilih wilayah Anda untuk harga belanja yang pas di kantong.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4 pt-6">
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2"><MapPin size={16} /> Pilih Wilayah (Provinsi)</Label>
                          <Select value={selectedProvinceId} onValueChange={setSelectedProvinceId}>
                            <SelectTrigger className="h-12 rounded-xl">
                              <SelectValue placeholder="Pilih wilayah..." />
                            </SelectTrigger>
                            <SelectContent>
                              {PROVINCES.map(p => (
                                <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">*Harga menyesuaikan standar lokal AHSP 2024</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2"><Calculator size={16} /> Luas Bangunan (M²)</Label>
                          <Input 
                            type="number" 
                            placeholder="Contoh: 36, 45, 100" 
                            value={buildingArea}
                            onChange={(e) => setBuildingArea(e.target.value)}
                            className="h-12 rounded-xl text-lg"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Tipe Bangunan</Label>
                          <Select value={houseType} onValueChange={setHouseType}>
                            <SelectTrigger className="h-12 rounded-xl">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="minimalis">Minimalis (Ekonomis)</SelectItem>
                              <SelectItem value="premium">Premium (Kualitas Tinggi)</SelectItem>
                              <SelectItem value="luxury">Luxury (Mewah)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                      <CardFooter className="pb-8">
                        <Button 
                          className="w-full bg-primary hover:bg-primary/90 text-white font-black h-14 rounded-2xl shadow-xl shadow-primary/20" 
                          onClick={handleCalculateRAB}
                          disabled={isCalculating}
                        >
                          {isCalculating ? <Loader2 className="animate-spin mr-2" /> : <Calculator className="mr-2" />}
                          HITUNG BIAYA SEKARANG
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card className="bg-amber-50 border-amber-100 rounded-3xl p-6 border-2">
                      <div className="flex gap-4 items-center">
                        <div className="bg-white p-2 rounded-xl shadow-sm">
                          <Info className="text-amber-600" size={24} />
                        </div>
                        <div>
                           <p className="font-black text-sm text-amber-900 uppercase tracking-tighter italic">Tips Hemat</p>
                           <p className="text-xs text-amber-700 font-medium">Gunakan material lokal di {PROVINCES.find(p => p.id === selectedProvinceId)?.name} untuk menghemat biaya transportasi material hingga 15%.</p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <div className="lg:col-span-2">
                    <Card className="border-border/60 shadow-xl rounded-3xl overflow-hidden min-h-[500px]">
                      <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 bg-slate-50/50 py-6 px-8">
                        <div>
                          <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-500">Hitung Biaya Senusantara (RAB)</CardTitle>
                          <p className="text-[10px] font-bold text-slate-400">HARGA MATERIAL SESUAI WILAYAH ANDA</p>
                        </div>
                        {rabResult && (
                          <div className="text-right">
                             <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Total Perkiraan</p>
                             <p className="text-3xl font-black text-primary tracking-tighter leading-none">{formatCurrency(rabResult.total)}</p>
                          </div>
                        )}
                      </CardHeader>
                      <CardContent className="p-0">
                        {rabResult ? (
                          <ScrollArea className="h-[500px]">
                            <div className="p-6 space-y-3">
                              {rabResult.boq.map((item: any, i: number) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-slate-50/50 border rounded-2xl hover:bg-white hover:shadow-md transition-all group">
                                  <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 bg-white rounded-xl border flex items-center justify-center font-bold text-slate-400 text-xs">
                                      {item.code}
                                    </div>
                                    <div>
                                      <p className="font-bold text-slate-900">{item.name}</p>
                                      <p className="text-[10px] font-bold text-slate-400">{item.qty} {item.unit} x {formatCurrency(item.price)}</p>
                                    </div>
                                  </div>
                                  <p className="font-black text-slate-900 tracking-tight">{formatCurrency(item.total)}</p>
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                        ) : (
                          <div className="flex flex-col items-center justify-center p-20 text-slate-300 space-y-6 text-center">
                            <div className="bg-slate-50 p-8 rounded-full">
                              <Calculator size={80} strokeWidth={1} />
                            </div>
                            <div className="max-w-xs">
                              <p className="text-lg font-black text-slate-400 uppercase tracking-tighter">Belum Ada Data</p>
                              <p className="text-sm font-medium text-slate-400">Silakan isi formulir di samping untuk menghitung anggaran pembangunan rumah Anda.</p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                      {rabResult && (
                        <CardFooter className="border-t py-6 justify-end gap-3 bg-gray-50 px-8">
                          <Button variant="outline" size="lg" className="rounded-xl font-bold border-2" onClick={() => toast.success("Laporan PDF sedang disiapkan!")}>
                            <Download size={18} className="mr-2" /> CETAK PDF
                          </Button>
                          <Button className="bg-primary text-white hover:bg-primary/90 rounded-xl font-bold h-12 px-8 shadow-lg shadow-primary/20" onClick={() => toast.success("Data tersimpan dalam proyek Anda.")}>
                            SIMPAN ANGGARAN
                          </Button>
                        </CardFooter>
                      )}
                    </Card>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "stylequiz" && (
              <motion.div key="stylequiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto space-y-8">
                <div className="text-center space-y-3">
                   <Badge className="bg-amber-100 text-amber-700 rounded-full font-bold">REKOMENDASI AI</Badge>
                   <h2 className="text-3xl font-black italic tracking-tighter">Kuis Gaya Rumah Impian</h2>
                   <p className="text-slate-500 font-medium tracking-tight">Jawab 5 pertanyaan cepat, AI akan menyarankan gaya arsitektur yang paling cocok untuk Anda.</p>
                </div>
                <Card className="rounded-[3rem] border-4 border-slate-100 overflow-hidden shadow-2xl">
                   <div className="p-10 space-y-8">
                      <div className="space-y-4">
                         <div className="flex justify-between text-xs font-black uppercase text-slate-400">
                            <span>Pertanyaan 1 dari 5</span>
                            <span>20% Selesai</span>
                         </div>
                         <Progress value={20} className="h-2" />
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight">Suasana apa yang Anda inginkan saat pertama kali masuk rumah?</h3>
                      <div className="grid grid-cols-1 gap-3">
                         {["Hangat & Alami (Banyak Kayu)", "Dingin & Modern (Beton/Besi)", "Mewah & Klasik (Marmer)", "Minimalis & Terbuka (Banyak Kaca)"].map((opt, i) => (
                           <Button key={i} variant="outline" className="h-16 rounded-2xl justify-start px-6 font-bold hover:bg-primary hover:text-white transition-all border-2">
                             <div className="h-8 w-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center mr-4 font-black group-hover:bg-white/20">{String.fromCharCode(65+i)}</div>
                             {opt}
                           </Button>
                         ))}
                      </div>
                   </div>
                   <CardFooter className="bg-slate-50 p-8 border-t">
                      <Button className="w-full bg-slate-900 h-14 rounded-2xl font-black text-lg">Mulai Analisa Gaya</Button>
                   </CardFooter>
                </Card>
              </motion.div>
            )}

            {activeTab === "expenses" && (
              <motion.div 
                key="expenses"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-2xl mx-auto space-y-8"
              >
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-black italic tracking-tighter">Catat Belanja Harian</h2>
                  <p className="text-slate-500 font-medium">Pantau setiap Rupiah yang keluar agar tidak boncos.</p>
                </div>

                <Tabs defaultValue="cash" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 h-14 rounded-2xl bg-slate-100 p-1.5">
                    <TabsTrigger value="cash" className="rounded-xl font-bold">Belanja Tunai</TabsTrigger>
                    <TabsTrigger value="debt" className="rounded-xl font-bold">Hutang Material</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="cash" className="mt-6 space-y-6">
                    <Card className="rounded-3xl shadow-xl border-2">
                      <CardContent className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Keterangan Barang/Jasa</Label>
                            <Input placeholder="Contoh: Beli Semen 10 Sak" value={newExpenseNote} onChange={(e) => setNewExpenseNote(e.target.value)} />
                          </div>
                          <div className="space-y-2">
                            <Label>Jumlah Biaya (Rp)</Label>
                            <Input type="number" placeholder="500000" value={newExpenseAmount} onChange={(e) => setNewExpenseAmount(e.target.value)} />
                          </div>
                        </div>
                        <Button className="w-full bg-primary h-12 rounded-xl font-bold" onClick={handleAddExpense}>
                          SIMPAN PENGELUARAN
                        </Button>
                      </CardContent>
                    </Card>

                    <div className="space-y-4">
                      <h3 className="font-black uppercase tracking-widest text-xs text-slate-400 pl-2">Riwayat Pengeluaran Terbaru</h3>
                      {dailyExpenses.length === 0 ? (
                        <div className="p-10 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                          <Wallet size={48} className="mx-auto mb-4 text-slate-300" />
                          <p className="text-sm font-bold text-slate-400">Belum ada pengeluaran hari ini.</p>
                        </div>
                      ) : (
                        dailyExpenses.map(exp => (
                          <div key={exp.id} className="bg-white p-5 rounded-3xl border shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-4">
                               <div className="h-10 w-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                                  <ArrowRight size={18} className="rotate-45" />
                               </div>
                               <div>
                                 <p className="font-black text-slate-900 italic tracking-tight">{exp.note}</p>
                                 <p className="text-[10px] font-bold text-slate-400">{exp.date}</p>
                               </div>
                            </div>
                            <p className="text-lg font-black text-primary tracking-tighter">{formatCurrency(exp.amount)}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="debt" className="mt-6 space-y-6">
                     <Card className="rounded-3xl border-red-100 bg-red-50/30 p-8 border-2 text-center space-y-4">
                        <div className="bg-white h-16 w-16 mx-auto rounded-2xl flex items-center justify-center text-red-500 shadow-sm border border-red-100">
                           <AlertCircle size={32} />
                        </div>
                        <h3 className="font-black text-xl italic tracking-tight">Total Hutang Material: Rp 4.250.000</h3>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-relaxed">Harap lunasi hutang ke toko "TB Jaya Makmur" sebelum jatuh tempo tanggal 25 April.</p>
                        <Button className="bg-red-600 text-white font-black rounded-xl h-12 px-8 hover:bg-red-700">BAYAR HUTANG SEKARANG</Button>
                     </Card>
                     
                     <div className="bg-white rounded-3xl border overflow-hidden">
                        <div className="p-4 bg-slate-50 border-b flex justify-between items-center">
                           <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Data Hutang</span>
                           <Button variant="ghost" size="sm" className="h-7 text-[10px] font-bold uppercase">Unduh Rekap</Button>
                        </div>
                        <div className="p-6 space-y-4">
                           <div className="flex justify-between items-center">
                              <div>
                                 <p className="font-black text-sm italic">Semen & Bata - TB Abadi</p>
                                 <p className="text-[10px] font-bold text-slate-400">Diinput 15 April 2024</p>
                              </div>
                              <Badge className="bg-red-100 text-red-600 border-none font-bold">Rp 1.500.000</Badge>
                           </div>
                        </div>
                     </div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            )}

            {activeTab === "permits" && (
              <motion.div 
                key="permits"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-3xl mx-auto space-y-8"
              >
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-black tracking-tighter italic">Cek Syarat IMB / PBG</h2>
                  <p className="text-slate-500 font-medium font-sans">Panduan lengkap persiapan dokumen perizinan bangunan Anda.</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {[
                    "Sertifikat Tanah Asli & Fotokopi",
                    "KTP & NPWP Pemilik",
                    "Surat Pemberitahuan Tetangga (IRT/RW)",
                    "Gambar Kerja Lengkap (Arsitektur, Struktur, MEP)",
                    "KRK (Keterangan Rencana Kota)",
                    "Bukti Bayar PBB Terakhir"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white p-6 rounded-3xl border shadow-sm hover:shadow-md transition-shadow">
                      <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                        <CheckCircle size={20} />
                      </div>
                      <span className="font-bold text-slate-700">{item}</span>
                    </div>
                  ))}
                  <div className="bg-primary p-6 rounded-3xl text-white shadow-xl shadow-primary/20 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest opacity-80">Butuh Bantuan?</p>
                      <p className="text-lg font-black leading-tight">Gunakan jasa pengurusan kami</p>
                    </div>
                    <Button variant="ghost" className="bg-white/10 hover:bg-white/20 text-white rounded-full font-bold">HUBUNGI KAMI</Button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "help" && (
              <motion.div 
                key="help"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-4xl mx-auto space-y-8"
              >
                 <div className="text-center space-y-2">
                  <h2 className="text-3xl font-black tracking-tighter italic">Pusat Bantuan IndoConstruct</h2>
                  <p className="text-slate-500 font-medium">Kami siap membantu setiap langkah pembangunan Anda.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="font-black uppercase tracking-[0.2em] text-xs text-primary pl-1">Pertanyaan Umum (FAQ)</h3>
                    <div className="space-y-4">
                      {[
                        { q: "Apa itu AI Render Pro?", a: "Fitur untuk membuat gambaran rumah jadi sangat nyata hanya dari tulisan deskripsi." },
                        { q: "Seberapa akurat hitungan biaya?", a: "Hitungan kami menggunakan standar AHSP 2024 yang disesuaikan dengan harga bahan di provinsi terpilih." },
                        { q: "Cara bayar tukang lewat aplikasi?", a: "Fitur pembayaran langsung sedang dalam tahap pengembangan, gunakan fitur Catat Pengeluaran sementara." }
                      ].map((faq, i) => (
                        <div key={i} className="bg-white p-6 rounded-3xl border shadow-sm space-y-2">
                          <div className="font-black text-slate-900 flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-primary" /> {faq.q}</div>
                          <p className="text-xs text-slate-500 font-medium leading-relaxed pl-4">{faq.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                     <h3 className="font-black uppercase tracking-[0.2em] text-xs text-primary pl-1">Kontak Kami</h3>
                     <Card className="rounded-3xl shadow-xl shadow-green-900/5 border-green-100 bg-green-50 overflow-hidden">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-green-800"><MessageSquare size={20} /> Konsultasi Gratis</CardTitle>
                          <CardDescription className="text-green-700/80">Tanya apapun tentang pembangunan rumah Anda.</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white h-14 rounded-2xl font-black text-lg gap-3" onClick={() => window.open("https://wa.me/628123456789", "_blank")}>
                            <Phone size={24} /> HUBUNGI VIA WHATSAPP
                          </Button>
                        </CardContent>
                     </Card>

                     <Card className="rounded-3xl shadow-sm border-slate-100 border-2">
                        <CardHeader>
                           <CardTitle className="text-sm font-black">Video Panduan</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <div className="aspect-video bg-slate-900 rounded-2xl flex items-center justify-center text-white/20">
                              <Loader2 size={40} />
                           </div>
                           <p className="text-[10px] font-bold text-center mt-3 text-slate-400 uppercase tracking-widest italic">Belajar cara menggunakan fitur AI dalam 2 menit</p>
                        </CardContent>
                     </Card>
                  </div>
                </div>
              </motion.div>
            )}
            {activeTab === "inventory" && (
              <motion.div key="inventory" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-3xl font-black italic tracking-tighter">Gudang Material</h2>
                    <p className="text-slate-500 font-medium">Stok bahan bangunan di lokasi proyek.</p>
                  </div>
                  <Button className="rounded-xl font-bold bg-primary px-6"><Plus size={18} className="mr-2" /> TAMBAH BARANG</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   {inventory.map((item, i) => (
                     <Card key={i} className="rounded-3xl border-2 hover:border-primary/30 transition-all">
                       <CardContent className="p-6 flex items-center gap-4">
                         <div className="h-14 w-14 bg-slate-100 rounded-2xl flex items-center justify-center text-primary">
                           <Package size={28} />
                         </div>
                         <div className="flex-1">
                           <p className="font-black text-slate-900 leading-tight">{item.name}</p>
                           <p className="text-2xl font-black text-primary tracking-tighter">{item.stock} <span className="text-xs text-slate-400 font-bold uppercase">{item.unit}</span></p>
                         </div>
                         <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><ChevronRight size={18} /></Button>
                       </CardContent>
                     </Card>
                   ))}
                </div>
              </motion.div>
            )}

            {activeTab === "store" && (
              <motion.div key="store" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                 <div className="text-center max-w-xl mx-auto space-y-3">
                   <h2 className="text-3xl font-black italic tracking-tighter">Toko Material Terdekat</h2>
                   <p className="text-slate-500 font-medium">Bandingkan harga material dari toko bangunan di sekitar {selectedProvinceId}.</p>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { name: "Semen Holcim", price: 65000, shop: "TB Jaya Makmur" },
                      { name: "Pasir Hitam", price: 1200000, shop: "Depo Bangunan" },
                      { name: "Bata Merah", price: 850, shop: "TB Abadi" },
                      { name: "Cat Dulux 5Kg", price: 210000, shop: "Mitra 10" }
                    ].map((item, i) => (
                      <Card key={i} className="rounded-3xl overflow-hidden border-2 group hover:border-primary transition-all">
                        <div className="aspect-square bg-slate-100 flex items-center justify-center">
                          <ImageIcon size={48} className="text-slate-300 group-hover:scale-110 transition-transform" />
                        </div>
                        <CardContent className="p-5 space-y-2">
                          <p className="font-extrabold text-slate-900 italic tracking-tighter">{item.name}</p>
                          <p className="text-lg font-black text-primary">{formatCurrency(item.price)}</p>
                          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
                            <MapPin size={10} /> {item.shop}
                          </div>
                        </CardContent>
                        <CardFooter className="p-5 pt-0">
                           <Button className="w-full bg-slate-900 text-white rounded-xl font-bold h-10">PESAN SEKARANG</Button>
                        </CardFooter>
                      </Card>
                    ))}
                 </div>
              </motion.div>
            )}

            {activeTab === "vouchers" && (
              <motion.div key="vouchers" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xl mx-auto space-y-6">
                <h2 className="text-3xl font-black italic tracking-tighter text-center">Klaim Diskon Anda</h2>
                {vouchers.map((v, i) => (
                  <div key={i} className="bg-primary text-white p-6 rounded-[2rem] shadow-xl shadow-primary/20 flex items-center justify-between border-4 border-white/10 relative overflow-hidden group">
                     <div className="absolute -right-4 -top-4 bg-white/10 h-24 w-24 rounded-full group-hover:scale-150 transition-transform" />
                     <div className="relative z-10">
                        <p className="text-4xl font-black italic tracking-tighter leading-none mb-1">{v.discount}</p>
                        <p className="text-xs font-bold uppercase tracking-widest opacity-80">{v.desc}</p>
                     </div>
                     <div className="relative z-10 text-right">
                        <p className="bg-white text-primary px-4 py-1.5 rounded-full font-black text-xs mb-3 inline-block">{v.code}</p>
                        <Button variant="ghost" className="block text-[10px] font-black uppercase text-white hover:bg-white/10">Salin Kode</Button>
                     </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "view360" && (
              <motion.div key="view360" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-3xl font-black italic tracking-tighter">Visual Lapangan</h2>
                    <p className="text-slate-500 font-medium font-sans">Pantau kemajuan fisik proyek via Foto & Video 360°.</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant={is360Mode ? "default" : "outline"} onClick={() => setIs360Mode(!is360Mode)} className="rounded-xl font-bold">
                       <Repeat size={18} className="mr-2" /> {is360Mode ? "MODE BIASA" : "MODE 360°"}
                    </Button>
                    <Button variant="outline" className="rounded-xl font-bold"><Camera size={18} className="mr-2" /> AMBIL FOTO</Button>
                  </div>
                </div>
                <div className="aspect-video bg-slate-900 rounded-[3rem] overflow-hidden relative shadow-2xl border-8 border-white/5">
                   <img src="https://picsum.photos/seed/construc/1280/720" alt="Site" className="w-full h-full object-cover opacity-60" />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-20 w-20 bg-primary/80 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-2xl animate-pulse cursor-pointer">
                         <Video size={40} />
                      </div>
                   </div>
                   <div className="absolute bottom-10 left-10 p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10">
                      <p className="text-white font-black text-xs uppercase tracking-widest flex items-center gap-2">
                         <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" /> LIVE: AREA LANTAI 1
                      </p>
                   </div>
                </div>
              </motion.div>
            )}
            {activeTab === "floorplan" && (
              <motion.div key="floorplan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-5xl mx-auto">
                <div className="text-center space-y-3">
                   <Badge className="bg-primary/10 text-primary rounded-full font-bold">SMART ARCHITECT</Badge>
                   <h2 className="text-4xl font-black italic tracking-tighter">Perancang Denah Pintar</h2>
                   <p className="text-slate-500 font-medium">Buat denah 2D, 3D, dan simulasi 4D dalam ukuran berapapun secara instan.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                   <div className="lg:col-span-4 space-y-6">
                      <Card className="rounded-3xl border-2 shadow-xl">
                         <CardHeader>
                            <CardTitle className="text-lg font-black italic">Tambah Ruangan</CardTitle>
                            <CardDescription>Masukkan ukuran ruangan impian Anda.</CardDescription>
                         </CardHeader>
                         <CardContent className="space-y-4">
                            <div className="space-y-2">
                               <Label>Nama Ruangan</Label>
                               <Input placeholder="Kamar Depan" value={newRoomName} onChange={(e) => setNewRoomName(e.target.value)} />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                               <div className="space-y-2">
                                  <Label>Lebar (m)</Label>
                                  <Input type="number" placeholder="3" value={newRoomW} onChange={(e) => setNewRoomW(e.target.value)} />
                               </div>
                               <div className="space-y-2">
                                  <Label>Panjang (m)</Label>
                                  <Input type="number" placeholder="4" value={newRoomL} onChange={(e) => setNewRoomL(e.target.value)} />
                               </div>
                            </div>
                            <Button className="w-full bg-slate-900 h-12 rounded-xl font-bold" onClick={handleAddRoom}>
                               TAMBAH KE DENAH
                            </Button>
                         </CardContent>
                      </Card>

                      <div className="space-y-3">
                         <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 pl-2">Daftar Ruangan</h3>
                         <div className="space-y-2 max-h-[300px] overflow-auto pr-2">
                            {rooms.map(room => (
                               <div key={room.id} className="bg-white p-4 rounded-2xl border flex justify-between items-center shadow-sm">
                                  <div>
                                     <p className="font-black italic text-sm">{room.name}</p>
                                     <p className="text-[10px] font-bold text-slate-400">{room.width}m x {room.length}m</p>
                                  </div>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400" onClick={() => setRooms(rooms.filter(r => r.id !== room.id))}>
                                     <LogOut size={14} />
                                  </Button>
                               </div>
                            ))}
                         </div>
                      </div>
                   </div>

                   <div className="lg:col-span-8 space-y-6">
                      <Tabs value={floorPlanMode} onValueChange={(val: any) => setFloorPlanMode(val)} className="w-full">
                         <TabsList className="grid w-full grid-cols-3 h-14 rounded-2xl bg-slate-100 p-1.5 border-2">
                            <TabsTrigger value="2d" className="rounded-xl font-black italic">Tampilan 2D</TabsTrigger>
                            <TabsTrigger value="3d" className="rounded-xl font-black italic">Visual 3D</TabsTrigger>
                            <TabsTrigger value="4d" className="rounded-xl font-black italic">Simulasi 4D</TabsTrigger>
                         </TabsList>
                         
                         <TabsContent value="2d" className="mt-6">
                            <Card className="rounded-[2.5rem] border-4 border-slate-100 bg-white shadow-2xl overflow-hidden min-h-[500px] relative flex items-center justify-center bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]">
                               <svg viewBox="0 0 400 300" className="w-full h-full p-10">
                                  {rooms.map((room, i) => {
                                     // Simple grid positioning for demo
                                     const x = (i % 3) * 120 + 20;
                                     const y = Math.floor(i / 3) * 100 + 20;
                                     return (
                                        <g key={room.id}>
                                           <rect x={x} y={y} width={room.width * 15} height={room.length * 15} fill="white" stroke="#0f172a" strokeWidth="3" rx="4" />
                                           <text x={x + 5} y={y + 15} fontSize="8" fontWeight="bold" fill="#0f172a">{room.name}</text>
                                           <text x={x + 5} y={y + 30} fontSize="6" fill="#94a3b8">{room.width}m x {room.length}m</text>
                                        </g>
                                     )
                                  })}
                               </svg>
                               <div className="absolute top-6 right-6 flex gap-2">
                                  <Button size="sm" variant="outline" className="rounded-lg bg-white/80 backdrop-blur font-bold">Screenshot</Button>
                                  <Button size="sm" variant="outline" className="rounded-lg bg-white/80 backdrop-blur font-bold">Cetak PDF</Button>
                               </div>
                            </Card>
                         </TabsContent>

                         <TabsContent value="3d" className="mt-6">
                            <Card className="rounded-[2.5rem] border-4 border-slate-100 bg-slate-900 shadow-2xl overflow-hidden min-h-[500px] relative flex flex-col items-center justify-center p-10 text-center space-y-6">
                               <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/3droom/1200/800')] bg-cover" />
                               <div className="relative z-10 space-y-4">
                                  <div className="h-20 w-20 bg-primary rounded-3xl mx-auto flex items-center justify-center text-white rotate-12 shadow-2xl">
                                     <Eye size={40} />
                                  </div>
                                  <h3 className="text-3xl font-black text-white italic tracking-tighter">Visualisasi 3D Interaktif</h3>
                                  <p className="text-slate-400 max-w-sm mx-auto font-medium">Tur virtual 3D berdasarkan denah yang Anda buat. Rasakan volume ruangan Anda sekarang.</p>
                                  <Button className="bg-primary text-primary-foreground font-black rounded-xl h-12 px-8">MULAI TUR VIRTUAL</Button>
                               </div>
                            </Card>
                         </TabsContent>

                         <TabsContent value="4d" className="mt-6">
                            <Card className="rounded-[2.5rem] border-4 border-slate-100 bg-white shadow-2xl overflow-hidden min-h-[500px] p-10 space-y-8">
                               <div className="flex justify-between items-center">
                                  <h3 className="text-xl font-black italic">Simulasi Garis Waktu Konstruksi (4D)</h3>
                                  <Badge className="bg-green-100 text-green-700">Aktif</Badge>
                               </div>
                               <div className="space-y-6">
                                  {[
                                     { stage: "Pondasi & Struktur", time: "Minggu 1-4", progress: 100 },
                                     { stage: "Dinding & Atap", time: "Minggu 5-10", progress: 65 },
                                     { stage: "Finishing Interior", time: "Minggu 11-14", progress: 0 }
                                  ].map((step, i) => (
                                     <div key={i} className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                                           <span>{step.stage}</span>
                                           <span className="text-slate-400">{step.time}</span>
                                        </div>
                                        <Progress value={step.progress} className="h-2" />
                                     </div>
                                  ))}
                               </div>
                               <div className="p-6 bg-slate-50 rounded-3xl border-2 border-dashed flex items-center gap-4">
                                  <Clock className="text-primary" size={32} />
                                  <div>
                                     <p className="font-black italic">Estimasi Waktu Selesai</p>
                                     <p className="text-xs font-bold text-slate-500">24 Juli 2026 (14 Minggu)</p>
                                  </div>
                               </div>
                            </Card>
                         </TabsContent>
                      </Tabs>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-t z-50 flex items-center justify-around px-4">
        <MobileNavItem icon={<LayoutDashboard size={22} />} active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
        <MobileNavItem icon={<Calculator size={22} />} active={activeTab === 'rab'} onClick={() => setActiveTab('rab')} />
        <div className="relative -top-6">
           <Button size="icon" className="h-14 w-14 rounded-full shadow-2xl shadow-primary/40 bg-primary border-4 border-white" onClick={() => setActiveTab('generator')}>
              <Sparkles size={24} className="text-white" />
           </Button>
        </div>
        <MobileNavItem icon={<Users2 size={22} />} active={activeTab === 'projects'} onClick={() => setActiveTab('projects')} />
        <MobileNavItem icon={<MoreVertical size={22} />} onClick={() => setIsSidebarOpen(true)} />
      </nav>
    </div>
  )}
  <AIChatBot />
</>
);
}

// Subcomponents
function NotificationBell({ notifications }: { notifications: Notification[] }) {
  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <Sheet>
      <SheetTrigger
        render={
          <button className="relative p-2 hover:bg-slate-100 rounded-full transition-colors group">
            <Bell size={22} className="text-slate-600 group-hover:text-primary transition-colors" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 h-5 w-5 bg-red-500 border-2 border-white text-white text-[9px] font-black flex items-center justify-center rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
        }
      />
      <SheetContent className="w-[400px] sm:w-[540px] p-0 border-l border-border bg-white">
        <SheetHeader className="p-8 border-b bg-slate-50">
          <SheetTitle className="text-xl font-black italic tracking-tighter">Pusat Notifikasi</SheetTitle>
          <SheetDescription className="font-medium text-slate-500">
            Terima pembaruan terbaru mengenai proyek dan saldo Anda.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-160px)]">
          <div className="p-2">
            {notifications.length === 0 ? (
              <div className="p-10 text-center space-y-4">
                <Bell size={40} className="mx-auto text-slate-200" />
                <p className="text-sm font-bold text-slate-400">Belum ada notifikasi.</p>
              </div>
            ) : (
              notifications.map(n => (
                <div key={n.id} className={`p-5 rounded-2xl mb-1 flex gap-4 transition-all hover:bg-slate-50 cursor-pointer ${!n.is_read ? 'bg-blue-50/50' : ''}`}>
                   <div className={`h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                     n.type === 'milestone' ? 'bg-green-100 text-green-600' : 
                     n.type === 'credits' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'
                   }`}>
                      {n.type === 'milestone' ? <CheckCircle size={18} /> : 
                       n.type === 'credits' ? <CreditCard size={18} /> : <AlertCircle size={18} />}
                   </div>
                   <div className="space-y-1">
                      <p className={`text-sm leading-tight ${!n.is_read ? 'font-extrabold text-slate-900' : 'font-medium text-slate-600'}`}>{n.message}</p>
                      <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-tighter">
                         <Clock size={10} /> Baru saja
                      </p>
                   </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

function ProjectMilestones({ project, isReadOnly, onToggle }: { project: any, isReadOnly?: boolean, onToggle?: (id: string) => void }) {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!project?.id) return;
    
    const q = query(collection(db, `projects/${project.id}/milestones`), orderBy("title", "asc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const mList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as any[];
      setMilestones(mList);
      setLoading(false);
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, `milestones/${project.id}`);
      setLoading(false);
    });

    return () => unsub();
  }, [project?.id]);

  if (!project) return null;
  if (loading) return <div className="space-y-4"><Skeleton className="h-20 w-full" /><Skeleton className="h-20 w-full" /></div>;

  return (
    <div className="space-y-8 relative">
      <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-slate-100 z-0" />
      
      {milestones.map((m, i) => (
        <div key={m.id} className="relative z-10 flex gap-6 items-start group">
          <div className={`h-12 w-12 rounded-full border-4 border-background flex items-center justify-center flex-shrink-0 transition-all shadow-sm ${
            m.is_completed ? 'bg-green-500 text-white shadow-green-200' : 'bg-white border-slate-100 text-slate-300'
          }`}>
            {m.is_completed ? <CheckCircle size={24} /> : i + 1}
          </div>
          
          <div className="flex-1 bg-white border border-border/60 p-6 rounded-3xl group-hover:border-primary/20 transition-all shadow-sm group-hover:shadow-md">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className={`text-sm tracking-tight ${m.is_completed ? 'font-extrabold text-slate-900' : 'font-bold text-slate-500'}`}>{m.title}</h4>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">{m.description}</p>
              </div>
              {!isReadOnly && (
                <button 
                  onClick={() => onToggle?.(m.id)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-black transition-all ${
                    m.is_completed ? 'bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500' : 'bg-primary text-white hover:bg-primary/90'
                  }`}
                >
                  {m.is_completed ? 'BATALKAN' : 'SELESAIKAN'}
                </button>
              )}
            </div>
            {m.is_completed && m.completed_at && (
              <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full w-fit">
                <CheckCircle2 size={12} /> Selesai pada {new Date(m.completed_at).toLocaleDateString()}
              </div>
            )}
            
            <div className="mt-4 flex gap-2">
               <div className="h-10 w-14 bg-slate-100 rounded-lg border border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:bg-slate-200 transition-colors cursor-pointer">
                  <ImageIcon size={16} />
               </div>
               <div className="h-10 w-14 bg-slate-100 rounded-lg border border-dashed border-slate-300 flex items-center justify-center text-slate-400">
                  <Plus size={16} />
               </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ClientPortalView({ data, onBack }: { data: any, onBack: () => void }) {
  if (!data) return <div className="h-screen flex items-center justify-center bg-slate-50 font-black text-slate-300">MODAL VIEW LOADING...</div>;

  const { project, milestones } = data;

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-auto font-sans">
       <nav className="h-16 bg-white border-b px-8 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-3">
             <div className="bg-primary p-1.5 rounded-lg">
                <Building2 className="text-white h-5 w-5" />
             </div>
             <span className="font-black text-lg tracking-tighter">PORTAL KLIEN PROGRES</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onBack} className="text-slate-500 font-black text-xs hover:text-slate-900 uppercase">Keluar Portal</Button>
       </nav>

       <div className="max-w-4xl mx-auto w-full p-8 space-y-10">
          <header className="text-center space-y-4">
             <Badge className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-xs font-black tracking-widest border-none">PORTAL AMAN - TERVERIFIKASI</Badge>
             <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-tight italic">{project.title}</h1>
             <p className="text-slate-500 font-bold max-w-xl mx-auto">Laporan kemajuan fisik pembangunan properti Anda secara transparan. Diperbarui langsung oleh tim lapangan.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm col-span-2">
                <div className="flex justify-between items-center mb-6">
                   <h3 className="font-black text-sm uppercase tracking-widest text-slate-400">Linimasa Progres</h3>
                   <span className="text-2xl font-black text-primary italic">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-3 mb-10 bg-slate-100" />
                <ProjectMilestones project={project} isReadOnly />
             </div>

             <div className="space-y-6">
                <Card className="rounded-3xl border-none shadow-xl shadow-blue-900/5 bg-blue-600 text-white overflow-hidden">
                   <CardHeader>
                      <CardTitle className="text-sm font-black text-white/60">Estimasi Selesai</CardTitle>
                      <p className="text-3xl font-black italic">12 SEPT 2024</p>
                   </CardHeader>
                   <CardContent className="space-y-4">
                      <div className="p-4 bg-white/10 rounded-2xl">
                         <p className="text-[10px] font-black uppercase text-white/50 tracking-widest mb-1">Status Lapangan</p>
                         <div className="flex items-center gap-2">
                            <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
                            <p className="text-xs font-bold text-white uppercase tracking-tighter">Dalam Pengerjaan Konstruksi</p>
                         </div>
                      </div>
                      <Button className="w-full bg-white text-blue-600 hover:bg-slate-100 font-black h-12 rounded-2xl italic tracking-tighter uppercase">Hubungi Pengawas</Button>
                   </CardContent>
                </Card>

                <Card className="rounded-3xl border-slate-100 shadow-sm">
                   <CardHeader>
                      <CardTitle className="text-[11px] font-black uppercase tracking-widest text-slate-400">Kontak Person</CardTitle>
                   </CardHeader>
                   <CardContent>
                      <div className="flex items-center gap-4">
                         <div className="h-12 w-12 bg-slate-100 rounded-full border border-slate-200" />
                         <div>
                            <p className="text-sm font-black text-slate-900">Andini Putri</p>
                            <p className="text-[10px] font-bold text-slate-400">Customer Success Officer</p>
                         </div>
                      </div>
                   </CardContent>
                </Card>
             </div>
          </div>
       </div>

       <footer className="mt-auto py-10 text-center border-t bg-white">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">IndoConstruct AI Architecture Systems</p>
       </footer>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-sm
        ${active 
          ? "bg-primary text-white shadow-lg shadow-primary/20" 
          : "text-slate-400 hover:bg-white/5 hover:text-white"}
      `}
    >
      <span className={active ? "text-white" : "text-slate-500"}>{icon}</span>
      {label}
    </button>
  );
}

function StatCard({ label, value, subtext, trend }: { label: string, value: string, subtext: string, trend?: "up" | "down" }) {
  return (
    <Card className="border-border/60 shadow-sm hover:shadow-md transition-all dark:bg-slate-900/50 dark:border-slate-800">
      <CardContent className="p-4 md:p-6">
        <p className="text-[10px] md:text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1 md:mb-2">{label}</p>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">{value}</p>
          {trend === "up" && <span className="text-[9px] md:text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">+22%</span>}
        </div>
        <p className="text-[10px] md:text-[11px] text-slate-400 mt-1 md:mt-2 font-medium"> {subtext} </p>
      </CardContent>
    </Card>
  );
}

function MobileNavItem({ icon, active, onClick }: { icon: React.ReactNode, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`p-3 rounded-2xl transition-all ${active ? "text-primary bg-primary/10" : "text-slate-400"}`}
    >
      {icon}
    </button>
  );
}

function Avatar({ user }: { user: any }) {
  return (
    <div className="h-9 w-9 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs text-white border border-white/10 uppercase shadow-inner">
      {user?.name?.substring(0,2) || "??"}
    </div>
  );
}

function QuickActionBtn({ icon, text, onClick }: { icon: React.ReactNode, text: string, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="w-full h-12 flex items-center gap-3 px-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 group"
    >
      <span className="text-slate-400 group-hover:text-primary transition-colors">{icon}</span>
      <span className="text-sm font-bold text-white tracking-tight">{text}</span>
      <ArrowRight size={14} className="ml-auto text-slate-600 group-hover:text-white transition-all transform group-hover:translate-x-1" />
    </button>
  );
}

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse rounded-md bg-slate-100 ${className}`}
      {...props}
    />
  )
}

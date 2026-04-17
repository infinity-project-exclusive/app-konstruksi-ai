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
  FileText
} from "lucide-react";
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

// Initialization
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

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user, setUser] = useState<User | null>(null);
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
  const [rabResult, setRabResult] = useState<{ boq: any[], total: number } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    fetchInitialData("user_1"); // Start as contractor
  }, []);

  const fetchInitialData = async (userId: string) => {
    try {
      const uRes = await fetch(`/api/user?id=${userId}`);
      const userData = await uRes.json();
      setUser(userData);

      const pRes = await fetch(`/api/projects?userId=${userId}`);
      const projectData = await pRes.json();
      setProjects(projectData.map((p: any) => ({
        id: p.id,
        name: p.title,
        client: p.client_name,
        status: p.status === "in_progress" ? "In Progress" : p.status === "completed" ? "Completed" : "Planning",
        progress: p.progress,
        lastUpdate: "Baru saja",
        share_token: p.share_token
      })));

      const nRes = await fetch(`/api/notifications?userId=${userId}`);
      const notifData = await nRes.json();
      setNotifications(notifData);
    } catch (e) {
      console.error("Failed to fetch initial data", e);
    }
  };

  const fetchMilestones = async (projectId: string) => {
    setIsMilestonesLoading(true);
    try {
      const res = await fetch(`/api/milestones/${projectId}`);
      const data = await res.json();
      setMilestones(data);
    } catch (e) {
      toast.error("Gagal memuat milestone");
    } finally {
      setIsMilestonesLoading(false);
    }
  };

  const handleToggleMilestone = async (id: string) => {
    try {
      const res = await fetch("/api/milestones/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ milestoneId: id }),
      });
      const data = await res.json();
      if (data.success) {
        setMilestones(prev => prev.map(m => m.id === id ? data.milestone : m));
        toast.success("Status milestone diperbarui");
        // Update user credits/notifs too
        fetchInitialData(user!.id);
      }
    } catch (e) {
      toast.error("Gagal memperbarui milestone");
    }
  };

  const openPortal = async (token: string) => {
    setViewMode("portal");
    setPortalToken(token);
    try {
      const res = await fetch(`/api/projects/shared/${token}`);
      const data = await res.json();
      setPortalData(data);
    } catch (e) {
      toast.error("Portal tidak ditemukan");
      setViewMode("app");
    }
  };

  const deductCredits = async (amount: number) => {
    try {
      const res = await fetch("/api/credits/deduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      if (res.ok) {
        const data = await res.json();
        setUser(prev => ({ ...prev, credits: data.remaining }));
        return true;
      } else {
        const error = await res.json();
        toast.error(error.error || "Gagal memotong kredit");
        return false;
      }
    } catch (e) {
      toast.error("Kesalahan koneksi");
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
      const res = await fetch("/api/rab/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ buildingArea: Number(buildingArea), type: houseType }),
      });
      const data = await res.json();
      setRabResult(data);
      toast.success("Estimasi RAB berhasil dihitung!");
    } catch (e) {
      toast.error("Gagal menghitung RAB");
    } finally {
      setIsCalculating(false);
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(val);
  };

  return (
    viewMode === "portal" ? (
      <ClientPortalView data={portalData} onBack={() => setViewMode("app")} />
    ) : (
      <div className="flex h-screen bg-background text-foreground font-sans">
        <Toaster position="top-right" />
        
        {/* Sidebar */}
        <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
          <div className="p-8 flex items-center gap-3">
            <div className="bg-primary p-2 rounded-lg shadow-lg shadow-primary/20">
              <Building2 className="text-white h-6 w-6" />
            </div>
            <span className="font-extrabold text-xl tracking-tighter text-white">IndoConstruct</span>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            <NavItem 
              icon={<LayoutDashboard size={18} />} 
              label="Dashboard Utama" 
              active={activeTab === "dashboard"} 
              onClick={() => setActiveTab("dashboard")} 
            />
            {user?.role !== "customer" && (
              <>
                <NavItem 
                  icon={<Sparkles size={18} />} 
                  label="AI Render Pro" 
                  active={activeTab === "generator"} 
                  onClick={() => setActiveTab("generator")} 
                />
                <NavItem 
                  icon={<Calculator size={18} />} 
                  label="Kalkulator RAB" 
                  active={activeTab === "rab"} 
                  onClick={() => setActiveTab("rab")} 
                />
              </>
            )}
            <NavItem 
              icon={<Users size={18} />} 
              label={user?.role === "super_admin" ? "Manajemen User" : "Proyek & Klien"} 
              active={activeTab === "projects"} 
              onClick={() => setActiveTab("projects")} 
            />
          </nav>

          <div className="p-6">
            {/* Role Switcher Demo */}
            <div className="mb-4 bg-white/5 p-2 rounded-lg flex gap-1">
               <button onClick={() => fetchInitialData("user_1")} className={`flex-1 text-[9px] font-bold p-1 rounded ${user?.id === 'user_1' ? 'bg-primary' : ''}`}>CONT</button>
               <button onClick={() => fetchInitialData("user_3")} className={`flex-1 text-[9px] font-bold p-1 rounded ${user?.id === 'user_3' ? 'bg-primary' : ''}`}>CUST</button>
               <button onClick={() => fetchInitialData("user_2")} className={`flex-1 text-[9px] font-bold p-1 rounded ${user?.id === 'user_2' ? 'bg-primary' : ''}`}>ADMIN</button>
            </div>

            <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{user?.role === 'super_admin' ? 'Sistem Status' : 'Paket Pro Aktif'}</span>
              </div>
              <Progress value={user?.role === 'super_admin' ? 95 : 75} className="h-1 bg-slate-800" />
              <div className="flex justify-between items-center mt-3">
                <span className="text-[10px] text-slate-500">
                  {user?.role === 'super_admin' ? 'Server: Online' : 'Berakhir dlm 12 hari'}
                </span>
                <span className="text-[10px] font-bold text-primary">INFO</span>
              </div>
            </div>
            
            <div className="mt-4 flex items-center gap-3 px-3 py-3 hover:bg-white/5 rounded-xl cursor-pointer transition-colors group">
              <div className="h-9 w-9 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs text-white border border-white/10 uppercase">
                {user?.name?.substring(0,2) || "??"}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-bold truncate text-white">{user?.name || "Memuat..."}</p>
                <p className="text-[9px] text-slate-500 uppercase font-bold tracking-tighter italic">{user?.role?.replace('_', ' ') || "..."}</p>
              </div>
              <LogOut size={14} className="text-slate-500 group-hover:text-white transition-colors" />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto flex flex-col">
          <header className="h-20 bg-background/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-10 border-b border-border/50">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 italic">
                {user?.role === 'customer' ? 'Melihat Progres' : user?.role === 'super_admin' ? 'Admin Central' : 'Panel Arsitek'}
              </h1>
              <p className="text-slate-500 text-sm font-medium">Selamat datang kembali, {user?.name}</p>
            </div>
            <div className="flex items-center gap-6">
              <NotificationBell notifications={notifications} />

              {user?.role !== 'customer' && (
                <div className="bg-secondary px-5 py-2.5 rounded-full border border-primary/20 flex items-center gap-2">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">Saldo:</span>
                  <span className="text-sm font-extrabold text-primary">{user?.credits} Kredit</span>
                </div>
              )}
              
              <Button size="sm" className="rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 h-10 px-6">
                <Plus size={18} className="mr-2" /> 
                {user?.role === 'customer' ? 'Buka Support' : user?.role === 'super_admin' ? 'User Baru' : 'Render Baru'}
              </Button>
            </div>
          </header>

          <div className="p-10 space-y-10 max-w-[1400px] mx-auto w-full">
            <AnimatePresence mode="wait">
              {activeTab === "dashboard" && (
                <motion.div 
                  key="dashboard"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {user?.role === 'customer' ? (
                      <>
                        <StatCard label="Proyek Anda" value="1" subtext="Sedang berjalan" />
                        <StatCard label="Milestone Selesai" value="2 / 4" subtext="50% progres fisik" />
                        <StatCard label="Hari Terbuang" value="15" subtext="Sejak mulai kerja" />
                        <StatCard label="Sisa Pembayaran" value="Rp 45jt" subtext="Termin 3 mendatangkan" />
                      </>
                    ) : (
                      <>
                        <StatCard label={user?.role === 'super_admin' ? "Total Users" : "Proyek Berjalan"} value={user?.role === 'super_admin' ? "128" : "12"} subtext="+2 bulan ini" />
                        <StatCard label={user?.role === 'super_admin' ? "Total Pendapatan" : "Total Klien Aktif"} value={user?.role === 'super_admin' ? "Rp 420jt" : "8"} subtext="Berdasarkan data 30 hari" />
                        <StatCard label="RAB Terbuat" value="24" subtext="Rp 4.2M dihitung" />
                        <StatCard label="Efisiensi Biaya" value="AI Driven" subtext="+22% penghematan" trend="up" />
                      </>
                    )}
                  </div>

                  {/* Main Dashboard Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
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
                className="max-w-4xl mx-auto space-y-8"
              >
                <div className="space-y-2 text-center mb-8">
                  <h2 className="text-3xl font-black tracking-tighter">AI Design Laboratory</h2>
                  <p className="text-gray-500">Ubah teks atau sketsa menjadi render hyper-realistic dalam hitungan detik.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <Card className="border-border/60 shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden">
                    <CardHeader className="bg-slate-50/50 border-b border-border/50 py-6">
                      <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                        <Settings size={16} className="text-primary" /> Generasi Desain Terakhir
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 p-8">
                      <div className="space-y-2">
                        <Label>Prompt / Deskripsi</Label>
                        <Input 
                          placeholder="Contoh: Rumah modern 2 lantai dengan facade batu alam dan pencahayaan sore..." 
                          className="h-24 align-top"
                          value={aiPrompt}
                          onChange={(e) => setAiPrompt(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Gaya Arsitektur</Label>
                          <Select defaultValue="modern">
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih gaya" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="modern">Modern</SelectItem>
                              <SelectItem value="minimalist">Minimalis</SelectItem>
                              <SelectItem value="industrial">Industrial</SelectItem>
                              <SelectItem value="classic">Klasik</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Pencahayaan</Label>
                          <Select defaultValue="golden">
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih cahaya" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="golden">Golden Hour</SelectItem>
                              <SelectItem value="sunny">Sunny Day</SelectItem>
                              <SelectItem value="overcast">Overcast</SelectItem>
                              <SelectItem value="night">Night Render</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Material Utama</Label>
                        <Select defaultValue="wood">
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih material" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="wood">Kayu & Kaca</SelectItem>
                            <SelectItem value="concrete">Exposed Concrete</SelectItem>
                            <SelectItem value="brick">Bata Ekspos</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full bg-[#141414] hover:bg-black text-white h-12 rounded-xl"
                        disabled={isGenerating}
                        onClick={handleGenerateAI}
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Merender Desain...
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 h-4 w-4" /> GENERATE RENDER (5 Kredit)
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>

                      <div className="aspect-[4/3] bg-slate-100 rounded-2xl border border-border flex flex-col items-center justify-center overflow-hidden relative group shadow-inner">
                        <div className="absolute inset-0 grid grid-cols-2 gap-px bg-border">
                          <div className="bg-white relative flex flex-col items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 opacity-10" style={{ 
                              backgroundImage: "repeating-linear-gradient(45deg, #cbd5e1 0, #cbd5e1 1px, transparent 0, transparent 50%)",
                              backgroundSize: "10px 10px"
                            }} />
                            <span className="relative z-10 text-[10px] font-bold text-slate-400 border border-slate-200 bg-white px-2 py-1 rounded shadow-sm">SKETSA AWAL</span>
                          </div>
                          
                          <div className="bg-slate-900 relative flex flex-col items-center justify-center overflow-hidden">
                            {generatedImage ? (
                              <img 
                                src={generatedImage} 
                                alt="AI Result" 
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover" 
                              />
                            ) : isGenerating ? (
                              <div className="flex flex-col items-center gap-2 px-8 text-center">
                                <Loader2 className="h-6 w-6 text-white animate-spin" />
                                <p className="text-[10px] font-bold text-white/60">RENDERING...</p>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center gap-3 text-white/20">
                                <Sparkles size={32} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Render AI</span>
                              </div>
                            )}
                            <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wider backdrop-blur-sm">Hasil AI - Realistic</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white border border-border/80 p-5 rounded-2xl flex items-center justify-between shadow-sm">
                        <div className="space-y-1">
                          <p className="text-sm font-extrabold text-slate-900">{aiPrompt || "Villa Modern 2 Lantai - Canggu"}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter italic">Generated via Gemini 2.5 • 15 Kredit</p>
                        </div>
                        <div className="h-10 w-10 bg-slate-50 flex items-center justify-center rounded-full text-slate-400 hover:text-primary transition-colors cursor-pointer border border-border">
                          <ArrowRight size={18} />
                        </div>
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
                    <Card className="border-[#E4E3E0]">
                      <CardHeader>
                        <CardTitle className="text-base">Input BoQ Otomatis</CardTitle>
                        <CardDescription>Berdasarkan Standar AHSP 2024</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label>Luas Bangunan (m2)</Label>
                          <Input 
                            type="number" 
                            placeholder="Contoh: 45" 
                            value={buildingArea}
                            onChange={(e) => setBuildingArea(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Tipe Konstruksi</Label>
                          <Select value={houseType} onValueChange={setHouseType}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="minimalis">Minimalis Standar</SelectItem>
                              <SelectItem value="premium">Premium Industrial</SelectItem>
                              <SelectItem value="luxury">Luxury Classical</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Wilayah Harga</Label>
                          <Select defaultValue="jakarta">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="jakarta">DKI Jakarta</SelectItem>
                              <SelectItem value="jabar">Jawa Barat</SelectItem>
                              <SelectItem value="jateng">Jawa Tengah</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full bg-[#141414] hover:bg-black" 
                          onClick={handleCalculateRAB}
                          disabled={isCalculating}
                        >
                          {isCalculating ? <Loader2 className="animate-spin" /> : "HITUNG ESTIMASI RAB"}
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card className="bg-[#F5F5F0] border-none">
                      <CardHeader>
                        <CardTitle className="text-sm font-bold">Tips Efisiensi</CardTitle>
                      </CardHeader>
                      <CardContent className="text-xs text-gray-600 leading-relaxed">
                        Gunakan material bata ringan untuk mempercepat pengerjaan dinding sebesar 20% dan mengurangi beban struktur utama. AI kami menyarankan penggabungan area servis untuk efisiensi pemipaan.
                      </CardContent>
                    </Card>
                  </div>

                  <div className="lg:col-span-2">
                    <Card className="border-border/60 shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden min-h-[500px]">
                      <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 bg-slate-50/50 py-6 px-8">
                        <div>
                          <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-500">Engine Estimasi RAB (AI)</CardTitle>
                          <CardDescription className="text-[10px] font-bold text-green-600">SYNC: AHSP 2024</CardDescription>
                        </div>
                        {rabResult && (
                          <div className="text-right">
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Grand Total</p>
                             <p className="text-2xl font-black text-primary tracking-tighter">{formatCurrency(rabResult.total)}</p>
                          </div>
                        )}
                      </CardHeader>
                      <CardContent className="p-0">
                        {rabResult ? (
                          <ScrollArea className="h-[400px]">
                            <Table className="text-[13px]">
                              <TableHeader className="bg-slate-50 border-b border-border/50">
                                <TableRow className="hover:bg-transparent">
                                  <TableHead className="text-[10px] font-bold uppercase tracking-wider text-slate-400 h-12 px-8">Komponen Pekerjaan</TableHead>
                                  <TableHead className="text-[10px] font-bold uppercase tracking-wider text-slate-400 h-12 text-right">Vol</TableHead>
                                  <TableHead className="text-[10px] font-bold uppercase tracking-wider text-slate-400 h-12 text-right px-8">Total Estimasi</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {rabResult.boq.map((item: any, i: number) => (
                                  <TableRow key={i} className="hover:bg-slate-50/50 transition-colors border-b border-border/30 last:border-0 h-14">
                                    <TableCell className="font-bold text-slate-700 px-8">{item.name}</TableCell>
                                    <TableCell className="text-right font-bold text-slate-500">{item.qty} {item.unit}</TableCell>
                                    <TableCell className="text-right font-black text-slate-900 px-8">{formatCurrency(item.total)}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </ScrollArea>
                        ) : (
                          <div className="flex flex-col items-center justify-center p-20 text-gray-400 space-y-4">
                            <Calculator size={64} strokeWidth={1} />
                            <p className="text-sm font-semibold">Silakan masukkan data luas bangunan untuk melihat breakdown biaya.</p>
                          </div>
                        )}
                      </CardContent>
                      {rabResult && (
                        <CardFooter className="border-t py-4 justify-end gap-3 bg-gray-50">
                          <Button variant="outline" size="sm" className="font-bold border-[#141414]">
                            <Download size={14} className="mr-2" /> EXPORT PDF
                          </Button>
                          <Button className="bg-[#141414] text-white" size="sm">
                            SIMPAN KE PROYEK
                          </Button>
                        </CardFooter>
                      )}
                    </Card>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
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
    
    fetch(`/api/milestones/${project.id}`)
      .then(res => res.json())
      .then(data => {
        setMilestones(data);
        setLoading(false);
      });
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
    <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">{label}</p>
        <div className="flex items-baseline gap-2">
          <p className="text-3xl font-extrabold tracking-tight text-slate-900">{value}</p>
          {trend === "up" && <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">+22%</span>}
        </div>
        <p className="text-[11px] text-slate-400 mt-2 font-medium"> {subtext} </p>
      </CardContent>
    </Card>
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

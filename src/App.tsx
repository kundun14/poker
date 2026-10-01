import React, { useState, useEffect } from 'react';
import { MODULES } from './data/modules';
import { PROBLEMS } from './data/problems';
import { Navbar } from './components/layout/Navbar';
import { Dashboard } from './components/layout/Dashboard';
import { ModuleDetailView } from './components/layout/ModuleDetailView';
import { SandboxLabView } from './components/layout/SandboxLabView';
import { GlossaryModal } from './components/glossary/GlossaryModal';

const STORAGE_KEY = 'poker_math_progress_v1';

export const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'dashboard' | 'module' | 'sandbox'>('dashboard');
  const [selectedModuleId, setSelectedModuleId] = useState<string>('c1');
  
  // Glossary Modal state
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);
  const [selectedGlossaryTermId, setSelectedGlossaryTermId] = useState<string | null>(null);

  // Android installation prompt support
  const [deferredInstallPrompt, setDeferredInstallPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState<boolean>(false);

  useEffect(() => {
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredInstallPrompt(e);
      setShowInstallBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallApp = async () => {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      const choiceResult = await deferredInstallPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setShowInstallBanner(false);
      }
      setDeferredInstallPrompt(null);
    }
  };

  // Persisted user state
  const [solvedProblems, setSolvedProblems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [xp, setXp] = useState<number>(() => {
    const count = Object.keys(solvedProblems).length;
    return count * 15;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(solvedProblems));
    } catch (e) {
      console.error('Failed to save progress', e);
    }
  }, [solvedProblems]);

  const handleOpenGlossary = (termId?: string) => {
    setSelectedGlossaryTermId(termId || null);
    setIsGlossaryOpen(true);
  };

  const handleSelectModule = (moduleId: string) => {
    setSelectedModuleId(moduleId);
    setActiveView('module');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSolveProblem = (problemId: string, isCorrect: boolean) => {
    if (isCorrect && !solvedProblems[problemId]) {
      setSolvedProblems((prev) => ({ ...prev, [problemId]: true }));
      setXp((prev) => prev + 15);
    }
  };

  const handleNextModule = () => {
    const currentIdx = MODULES.findIndex((m) => m.id === selectedModuleId);
    if (currentIdx !== -1 && currentIdx < MODULES.length - 1) {
      setSelectedModuleId(MODULES[currentIdx + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveView('dashboard');
    }
  };

  const selectedModule = MODULES.find((m) => m.id === selectedModuleId) || MODULES[0];
  const solvedCount = Object.values(solvedProblems).filter(Boolean).length;
  const totalProblems = PROBLEMS.length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar
        xp={xp}
        streak={3}
        solvedCount={solvedCount}
        totalProblems={totalProblems}
        activeView={activeView}
        onNavigate={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenGlossary={() => handleOpenGlossary()}
      />

      {/* Android Install Banner (shows when installable on mobile Chrome/Android) */}
      {showInstallBanner && (
        <div className="sticky top-14 z-40 mx-3 my-2 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 text-slate-950 p-3 rounded-2xl shadow-xl flex items-center justify-between gap-3 animate-fadeIn border border-emerald-300">
          <div className="flex items-center gap-2">
            <span className="text-xl">📲</span>
            <div>
              <span className="font-black text-xs block leading-tight">
                Instalar PokerMath en tu Celular
              </span>
              <span className="text-[10px] font-medium opacity-90 block">
                Úsala como app nativa a pantalla completa y sin conexión.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleInstallApp}
              className="bg-slate-950 text-emerald-400 font-extrabold text-xs px-3 py-1.5 rounded-xl shadow hover:bg-slate-900 transition-all cursor-pointer"
            >
              Instalar
            </button>
            <button
              onClick={() => setShowInstallBanner(false)}
              className="text-slate-950/70 hover:text-slate-950 p-1 text-xs font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 pb-16">
        {activeView === 'dashboard' && (
          <Dashboard
            modules={MODULES}
            solvedProblems={solvedProblems}
            onSelectModule={handleSelectModule}
            onOpenSandbox={() => {
              setActiveView('sandbox');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenGlossary={() => handleOpenGlossary()}
            onOpenGlossaryWithTab={(tab) => handleOpenGlossary(tab)}
          />
        )}

        {activeView === 'module' && (
          <ModuleDetailView
            key={selectedModule.id}
            module={selectedModule}
            solvedProblems={solvedProblems}
            onBack={() => setActiveView('dashboard')}
            onSolveProblem={handleSolveProblem}
            onNextModule={handleNextModule}
            onOpenFullGlossary={handleOpenGlossary}
          />
        )}

        {activeView === 'sandbox' && (
          <SandboxLabView onBack={() => setActiveView('dashboard')} />
        )}
      </main>

      {/* Floating Glosario Quick Access Button */}
      <button
        onClick={() => handleOpenGlossary()}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 font-extrabold px-3.5 py-2.5 rounded-full shadow-2xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all text-xs border border-emerald-300/40 cursor-pointer"
        title="¿No entiendes una palabra técnica? Haz clic para abrir el Glosario de Poker"
      >
        <span className="text-base">📖</span>
        <span className="hidden sm:inline">Glosario Poker (Novatos)</span>
        <span className="sm:hidden">Glosario</span>
      </button>

      {/* Full Interactive Glossary Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
        initialTermId={selectedGlossaryTermId}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto space-y-2">
          <p className="font-semibold text-slate-400">
            ♠ PokerMath Interactive • Metodología Inspirada en Brilliant.org
          </p>
          <p>
            Basado en las fórmulas y principios del libro de <strong>Alton Hardin</strong>: <em>"Essential Poker Math: Fundamental No Limit Hold'em Mathematics You Need to Know"</em>.
          </p>
          <p className="text-[11px] text-slate-600">
            Diseñado para asimilar la intuición matemática del poker jugando de manera visual, rápida y elegante.
          </p>
        </div>
      </footer>
    </div>
  );
};
export default App;

import React from 'react';
import { useApp } from '../context/AppContext';
import { ThemeAccent, ThemeBackground, ThemeGlow, ThemeDensity } from '../types';
import {
  X,
  Palette,
  Sparkles,
  Layout,
  SunMoon,
  Check,
  CheckCircle2,
  Sliders,
  ShieldAlert,
} from 'lucide-react';

export const ThemeCustomizerModal: React.FC = () => {
  const { isThemeModalOpen, setIsThemeModalOpen, currentUser, updateStudentTheme } = useApp();

  if (!isThemeModalOpen || !currentUser) return null;

  const currentSettings = currentUser.themeSettings || {
    accent: 'violet',
    background: 'obsidian',
    glow: 'vivid',
    density: 'comfortable',
  };

  const accents: { id: ThemeAccent; label: string; previewClass: string; hex: string }[] = [
    { id: 'violet', label: 'Electric Violet', previewClass: 'from-purple-500 to-indigo-600', hex: '#8B5CF6' },
    { id: 'cyan', label: 'Neon Cyan', previewClass: 'from-cyan-400 to-blue-600', hex: '#06B6D4' },
    { id: 'emerald', label: 'Emerald Matrix', previewClass: 'from-emerald-400 to-teal-600', hex: '#10B981' },
    { id: 'amber', label: 'Cyber Amber', previewClass: 'from-amber-400 to-orange-600', hex: '#F59E0B' },
    { id: 'rose', label: 'Rose Quartz', previewClass: 'from-rose-400 to-pink-600', hex: '#F43F5E' },
  ];

  const backgrounds: { id: ThemeBackground; label: string; hex: string; description: string }[] = [
    { id: 'obsidian', label: 'Deep Obsidian', hex: '#07070B', description: 'Original high-contrast futuristic obsidian' },
    { id: 'midnight', label: 'Midnight Blue', hex: '#090D16', description: 'Deep cool indigo and aerospace blue cast' },
    { id: 'pure-black', label: 'Pure OLED Black', hex: '#000000', description: 'Zero luminance true black for OLED displays' },
  ];

  const glowLevels: { id: ThemeGlow; label: string; description: string }[] = [
    { id: 'vivid', label: 'Cinematic Vivid', description: 'Full ultraviolet ambient spill & interactive highlights' },
    { id: 'subtle', label: 'Subtle Atmosphere', description: 'Gentle diffusion, softer card borders' },
    { id: 'off', label: 'Minimal / Clean', description: 'Structured border outlines with zero ambient glow' },
  ];

  const densities: { id: ThemeDensity; label: string; description: string }[] = [
    { id: 'comfortable', label: 'Comfortable', description: 'Spacious padding and breathable card layouts' },
    { id: 'compact', label: 'Compact', description: 'Higher data density for focused study screens' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div
        className="relative w-full max-w-xl rounded-3xl border border-white/[0.12] bg-[#09090F] p-6 sm:p-8 text-white shadow-2xl my-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Scoped glow preview */}
        <div
          className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full blur-[70px] opacity-25"
          style={{
            backgroundColor:
              currentSettings.accent === 'violet'
                ? '#8B5CF6'
                : currentSettings.accent === 'cyan'
                ? '#06B6D4'
                : currentSettings.accent === 'emerald'
                ? '#10B981'
                : currentSettings.accent === 'amber'
                ? '#F59E0B'
                : '#F43F5E',
          }}
        />

        {/* Modal Close Button */}
        <button
          onClick={() => setIsThemeModalOpen(false)}
          className="absolute right-5 top-5 rounded-full p-2 text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
          aria-label="Close theme customizer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.08]">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-950/40 border border-purple-500/20 text-purple-400">
            <Palette className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-white">
              Student Workspace Appearance
            </h2>
            <p className="text-xs text-[#A5A5B8]">
              Personalize theme accents, dark canvas tone, and glow for your dashboard.
            </p>
          </div>
        </div>

        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-1">
          {/* 1. Accent Color */}
          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-200 mb-3">
              <Sparkles className="h-3.5 w-3.5 text-purple-400" />
              <span>Accent Glow Color</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {accents.map((acc) => {
                const isSelected = currentSettings.accent === acc.id;
                return (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => updateStudentTheme({ accent: acc.id })}
                    className={`flex items-center gap-2.5 rounded-xl border p-2.5 text-xs font-medium transition-all text-left cursor-pointer ${
                      isSelected
                        ? 'border-white/30 bg-white/[0.08] text-white shadow-sm'
                        : 'border-white/[0.06] bg-white/[0.02] text-[#A5A5B8] hover:border-white/[0.14] hover:text-white'
                    }`}
                  >
                    <span
                      className="h-4 w-4 rounded-full shrink-0 shadow-sm flex items-center justify-center"
                      style={{ backgroundColor: acc.hex }}
                    >
                      {isSelected && <Check className="h-2.5 w-2.5 text-black stroke-[3]" />}
                    </span>
                    <span className="truncate">{acc.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Background Tone */}
          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-200 mb-3">
              <SunMoon className="h-3.5 w-3.5 text-indigo-400" />
              <span>Dark Canvas Atmosphere</span>
            </label>
            <div className="space-y-2">
              {backgrounds.map((bg) => {
                const isSelected = currentSettings.background === bg.id;
                return (
                  <div
                    key={bg.id}
                    onClick={() => updateStudentTheme({ background: bg.id })}
                    className={`flex items-center justify-between rounded-xl border p-3 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-white/30 bg-white/[0.08] text-white'
                        : 'border-white/[0.06] bg-white/[0.02] text-[#A5A5B8] hover:border-white/[0.14] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="h-5 w-5 rounded-lg border border-white/20 shrink-0 shadow-inner"
                        style={{ backgroundColor: bg.hex }}
                      />
                      <div>
                        <div className="text-xs font-semibold text-white">{bg.label}</div>
                        <div className="text-[11px] text-[#A5A5B8]">{bg.description}</div>
                      </div>
                    </div>
                    {isSelected && <CheckCircle2 className="h-4 w-4 text-purple-400 shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Ambient Glow Level */}
          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-200 mb-3">
              <Sliders className="h-3.5 w-3.5 text-emerald-400" />
              <span>Ambient Glow Intensity</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {glowLevels.map((gl) => {
                const isSelected = currentSettings.glow === gl.id;
                return (
                  <button
                    key={gl.id}
                    type="button"
                    onClick={() => updateStudentTheme({ glow: gl.id })}
                    className={`rounded-xl border p-2.5 text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'border-white/30 bg-white/[0.08] text-white'
                        : 'border-white/[0.06] bg-white/[0.02] text-[#A5A5B8] hover:border-white/[0.14] hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-semibold">{gl.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{gl.description}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Layout Density */}
          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-200 mb-3">
              <Layout className="h-3.5 w-3.5 text-purple-400" />
              <span>Dashboard Density</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {densities.map((den) => {
                const isSelected = currentSettings.density === den.id;
                return (
                  <button
                    key={den.id}
                    type="button"
                    onClick={() => updateStudentTheme({ density: den.id })}
                    className={`rounded-xl border p-2.5 text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-white/30 bg-white/[0.08] text-white'
                        : 'border-white/[0.06] bg-white/[0.02] text-[#A5A5B8] hover:border-white/[0.14] hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-semibold">{den.label}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{den.description}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scoping notice for user assurance */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-[11px] text-[#A5A5B8] flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
            <span>Theme preferences apply to your authenticated student dashboard. Public landing pages remain in their original design.</span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-end">
          <button
            type="button"
            onClick={() => setIsThemeModalOpen(false)}
            className="rounded-full bg-white px-6 py-2.5 text-xs font-semibold text-black hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Apply & Save
          </button>
        </div>
      </div>
    </div>
  );
};

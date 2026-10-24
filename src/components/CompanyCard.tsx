import React from 'react';
import { CompanyProfile } from '../types';
import { CompanyLogo } from './CompanyLogo';
import { ShieldCheck, ArrowRight, MapPin } from 'lucide-react';

interface CompanyCardProps {
  company: CompanyProfile;
  onClick: () => void;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative rounded-2xl border border-white/[0.08] bg-[#09090F] p-5 hover:border-purple-500/60 hover:bg-[#0E0E18] hover:shadow-[0_0_28px_rgba(139,92,246,0.18)] hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Top bar with authentic logo and verification badge */}
        <div className="flex items-center justify-between mb-4">
          <CompanyLogo
            companyId={company.id}
            name={company.name}
            size="md"
            forceLightBg={company.logoBg === 'light'}
          />
          <div className="flex items-center gap-1 text-[10px] font-mono font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded-full">
            <ShieldCheck className="h-3 w-3" />
            <span>Verified</span>
          </div>
        </div>

        {/* Company Title & Category */}
        <div className="space-y-1">
          <h3 className="text-base font-bold text-white group-hover:text-purple-200 transition-colors flex items-center justify-between">
            <span>{company.name}</span>
            <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all shrink-0 ml-1" />
          </h3>
          <div className="text-[11px] font-mono text-purple-300 font-medium">
            {company.industryCategory}
          </div>
          <p className="text-xs text-[#A5A5B8] mt-2 line-clamp-2 leading-relaxed">
            {company.tagline}
          </p>
        </div>
      </div>

      {/* Footer with package insight and action link */}
      <div className="mt-5 pt-3 border-t border-white/[0.06] text-xs space-y-1.5">
        <div className="flex items-center justify-between text-[11px] font-mono">
          <span className="text-slate-500">Full-Time CTC</span>
          <span className="text-emerald-400 font-semibold tabular-nums">
            {company.packageInsights.fullTimeCTCLPA.split('(')[0]}
          </span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-500 flex items-center gap-1">
            <MapPin className="h-3 w-3 text-slate-600" />
            <span className="truncate max-w-[120px]">{company.packageInsights.locationInIndia[0]}</span>
          </span>
          <span className="text-purple-400 font-semibold group-hover:underline">
            Explore Careers →
          </span>
        </div>
      </div>
    </div>
  );
};

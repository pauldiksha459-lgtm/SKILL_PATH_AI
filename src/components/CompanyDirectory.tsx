import React, { useState, useMemo } from 'react';
import { COMPANIES_DATA } from '../data/companies';
import { CompanyProfile, IndustryCategory } from '../types';
import { CompanyCard } from './CompanyCard';
import { CompanyDetailsModal } from './CompanyDetailsModal';
import { Search, X, Sparkles, Building2, SlidersHorizontal } from 'lucide-react';

const CATEGORIES: IndustryCategory[] = [
  'All Companies',
  'Product Companies',
  'IT Services',
  'Consulting',
  'AI and Data',
  'Cloud and Enterprise Software',
];

export const CompanyDirectory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<IndustryCategory>('All Companies');
  const [activeModalCompany, setActiveModalCompany] = useState<CompanyProfile | null>(null);

  const filteredCompanies = useMemo(() => {
    return COMPANIES_DATA.filter((comp) => {
      const matchesSearch =
        comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.headquarters.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.supportedRoles.some((r) => r.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'All Companies' || comp.industryCategory === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="w-full space-y-8">
      {/* Search Bar & Category Filter Bar */}
      <div className="flex flex-col gap-4">
        {/* Search input with sleek dark styling */}
        <div className="relative max-w-xl mx-auto w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search companies by name, role, or technology..."
            className="w-full rounded-full border border-white/[0.12] bg-[#0E0E18] pl-11 pr-10 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-purple-500/80 focus:bg-[#121222] focus:shadow-[0_0_20px_rgba(139,92,246,0.25)] focus:outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.35)] border border-purple-400'
                    : 'bg-white/[0.04] text-[#A5A5B8] border border-white/[0.08] hover:bg-white/[0.08] hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Directory Status Header */}
      <div className="flex items-center justify-between text-xs text-[#A5A5B8] px-1 border-b border-white/[0.06] pb-3">
        <div className="flex items-center gap-2">
          <Building2 className="h-3.5 w-3.5 text-purple-400" />
          <span>
            Showing <strong className="text-white font-mono">{filteredCompanies.length}</strong> verified companies
          </span>
          {selectedCategory !== 'All Companies' && (
            <span className="text-[11px] font-mono text-purple-300 bg-purple-950/40 px-2 py-0.5 rounded-full border border-purple-500/20">
              {selectedCategory}
            </span>
          )}
        </div>

        <div className="text-[11px] font-mono text-slate-500 hidden sm:block">
          Official SVG Brand Logos
        </div>
      </div>

      {/* Grid of Company Cards */}
      {filteredCompanies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCompanies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              onClick={() => setActiveModalCompany(company)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-2xl border border-white/[0.08] bg-[#09090F] p-12 text-center max-w-md mx-auto">
          <Building2 className="h-10 w-10 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white">No companies found</h3>
          <p className="text-xs text-[#A5A5B8] mt-1.5">
            We couldn't find any companies matching "{searchQuery}". Try searching for another company or clear your filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All Companies');
            }}
            className="mt-4 rounded-full bg-purple-600/30 border border-purple-500/40 px-5 py-2 text-xs font-semibold text-purple-200 hover:bg-purple-600/50 transition-colors cursor-pointer"
          >
            Reset Search & Filters
          </button>
        </div>
      )}

      {/* Company Details & Role Selection Modal */}
      <CompanyDetailsModal
        company={activeModalCompany}
        onClose={() => setActiveModalCompany(null)}
      />
    </div>
  );
};

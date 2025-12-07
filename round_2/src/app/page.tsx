"use client";

import { useState } from "react";
import { SearchForm } from "@/components/ui/SearchForm";
import { ReportDashboard } from "@/components/ui/ReportDashboard";
import { analyzePackageAction } from "@/app/actions";
import { AuditResult } from "@/types/analyzer";

export default function Home() {
  const [result, setResult] = useState<AuditResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await analyzePackageAction(query);
      if (res.success && res.data) {
        setResult(res.data);
      } else {
        setError(res.error || "Unknown error occurred.");
      }
    } catch (err) {
      setError("Transmission interrupted.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full w-full max-w-7xl mx-auto">

      {!result ? (
        <div className="w-full transition-all duration-500">
          <SearchForm onSearch={handleSearch} isLoading={loading} />
          {error && (
            <div className="mt-8 text-center text-imperial-red font-bold animate-pulse border border-imperial-red p-2 bg-black/50 inline-block">
              [ERROR] {error}
            </div>
          )}
        </div>
      ) : (
        <ReportDashboard result={result} onReset={() => setResult(null)} />
      )}

      {/* Footer Branding */}
      <div className="fixed bottom-4 right-6 text-[10px] opacity-30 text-imperial-cyan text-right">
        ISB-TERMINAL-882<br />
        SECURE CONNECTION ESTABLISHED
      </div>
    </div>
  );
}

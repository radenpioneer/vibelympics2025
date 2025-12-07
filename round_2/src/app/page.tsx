"use client";

import { useRouter } from 'next/navigation';
import { SearchForm } from "@/components/ui/SearchForm";
// import { ReportDashboard } from "@/components/ui/ReportDashboard"; // Removed: Dashboard is now at /[package]
import { PopularPills } from "@/components/ui/PopularPills";

export default function Home() {
  const router = useRouter();

  const handleSearch = async (query: string) => {
    // Navigate to the dynamic package page
    router.push(`/${query}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full h-full w-full">
      <div className="w-full max-w-3xl transform -translate-y-12">
        <SearchForm onSearch={handleSearch} />
        <PopularPills />
      </div>

      {/* Footer Branding */}
      <div className="fixed bottom-4 right-6 text-[10px] opacity-30 text-imperial-cyan text-right">
        ISB-TERMINAL-882<br />
        SECURE CONNECTION ESTABLISHED
      </div>
    </div>
  );
}

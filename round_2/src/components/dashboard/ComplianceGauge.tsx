

import { ImperialCard } from "@/components/ui/ImperialCard";

interface ComplianceGaugeProps {
    score: number;
}

export function ComplianceGauge({ score }: ComplianceGaugeProps) {
    let gaugeColor = "text-imperial-cyan";
    let gaugeBorder = "border-imperial-cyan";

    if (score < 50) {
        gaugeColor = "text-imperial-red";
        gaugeBorder = "border-imperial-red";
    } else if (score < 80) {
        // Optional: Orange/Amber for amber? Sticking to strict palette for now.
        // Or maybe just red/cyan binary as per mood.
    }

    return (
        <ImperialCard title="COMPLIANCE RATING" className="h-full flex flex-col min-h-0">
            <div className="flex-1 w-full flex flex-col items-center justify-center">
                <div className={`relative w-24 h-24 rounded-full border-4 ${gaugeBorder} flex items-center justify-center mb-2 shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-black/40`}>
                    <span className={`text-3xl font-bold ${gaugeColor} [text-shadow:_0_0_5px_var(--color-imperial-cyan)]`}>
                        {score}
                    </span>
                    <div className="absolute inset-0 rounded-full border border-white/10 animate-pulse" />
                </div>
                <div className="text-center text-[10px] uppercase tracking-widest opacity-80">
                    {score > 80 ? "ACCEPTABLE STATUS" : score > 50 ? "CAUTION ADVISED" : "EXTREME THREAT"}
                </div>
            </div>
        </ImperialCard>
    );
}

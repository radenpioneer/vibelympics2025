

import { ImperialCard } from "@/components/ui/ImperialCard";
import { RiskFactor } from "@/types/analyzer";

interface InterrogationLogProps {
    transcript: string;
    riskFactors: RiskFactor[];
}

export function InterrogationLog({ transcript, riskFactors }: InterrogationLogProps) {
    return (
        <ImperialCard title="INTERROGATION TRANSCRIPT" className="h-full flex flex-col min-h-0">
            <div className="font-mono text-sm leading-relaxed text-justify mb-6 overflow-y-auto pr-2 flex-grow min-h-0">
                <span className="text-imperial-cyan opacity-70">{">"} </span>
                {transcript}
            </div>

            <div className="border-t border-imperial-dim pt-4 mt-auto">
                <div className="text-xs uppercase text-white/50 mb-2">PROTOCOL BREACH STATUS</div>
                {riskFactors.length === 0 ? (
                    <div className="text-imperial-cyan font-bold">STATUS: SECURE</div>
                ) : (
                    <ul className="space-y-1">
                        {riskFactors.map((r, i) => (
                            <li key={i} className="text-imperial-red text-xs font-bold animate-pulse">
                                [ALERT] {r.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </ImperialCard>
    );
}

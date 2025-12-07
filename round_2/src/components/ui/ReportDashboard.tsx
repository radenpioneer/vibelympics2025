"use client";

import React from 'react';
import { AuditResult } from "@/types/analyzer";
import { ImperialCard } from './ImperialCard';

export function ReportDashboard({ result, onReset }: { result: AuditResult; onReset: () => void }) {
    const { complianceRating, interrogationTranscript, riskFactors, packageName } = result;

    // Color coding for gauge
    let gaugeColor = "text-imperial-cyan";
    let gaugeBorder = "border-imperial-cyan";
    if (complianceRating < 50) {
        gaugeColor = "text-imperial-red";
        gaugeBorder = "border-imperial-red";
    }

    return (
        <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto animate-in fade-in duration-500">

            {/* Header / Nav */}
            <div className="flex justify-between items-center border-b border-imperial-dim pb-4">
                <h2 className="text-xl tracking-widest text-imperial-cyan">
                    AUDIT TARGET: <span className="font-bold">{packageName.toUpperCase()}</span>
                </h2>
                <button
                    onClick={onReset}
                    className="text-xs uppercase hover:text-imperial-cyan underline decoration-dotted"
                >
                    [ New Query ]
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Column 1: The Gauge */}
                <ImperialCard title="COMPLIANCE RATING" className="h-full flex flex-col items-center justify-center min-h-[300px]">
                    <div className={`relative w-48 h-48 rounded-full border-4 ${gaugeBorder} flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(0,0,0,0.5)]`}>
                        <span className={`text-6xl font-bold ${gaugeColor} [text-shadow:_0_0_5px_var(--color-imperial-cyan)]`}>
                            {complianceRating}
                        </span>
                        <div className="absolute inset-0 rounded-full border border-white/10 animate-pulse" />
                    </div>
                    <div className="text-center text-xs uppercase tracking-widest opacity-80">
                        {complianceRating > 80 ? "ACCEPTABLE STATUS" : complianceRating > 50 ? "CAUTION ADVISED" : "EXTREME THREAT"}
                    </div>
                </ImperialCard>

                {/* Column 2: The Roast */}
                <ImperialCard title="INTERROGATION TRANSCRIPT" className="h-full">
                    <div className="font-mono text-sm leading-relaxed text-justify mb-6 h-[200px] overflow-y-auto pr-2">
                        <span className="text-imperial-cyan opacity-70">{">"} </span>
                        {interrogationTranscript}
                    </div>

                    <div className="border-t border-imperial-dim pt-4 mt-4">
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

                {/* Column 3: The Evidence (Fine Print) */}
                <ImperialCard title="EVIDENCE & METADATA" className="h-full overflow-hidden">
                    <div className="h-full overflow-y-auto pr-2 space-y-4 text-xs font-mono">
                        {riskFactors.map((r) => (
                            <div key={r.id} className="border-l-2 border-imperial-dim pl-2">
                                <div className="text-imperial-cyan font-bold mb-1">{r.name}</div>
                                <div className="opacity-70 mb-1">{r.technicalTranslation}</div>
                                <div className="italic opacity-40">"{r.imperialTranslation}"</div>
                            </div>
                        ))}

                        {riskFactors.length === 0 && (
                            <div className="opacity-50 italic">
                                No significant anomalies detected in asset metadata.
                                <br /><br />
                                Version: {result.rawMetadata.version}
                                <br />
                                Maintainers: {result.rawMetadata.maintainers?.length || 0}
                                <br />
                                License: {result.rawMetadata.license || "N/A"}
                            </div>
                        )}

                        <div className="mt-6 pt-4 border-t border-imperial-dim opacity-50">
                            <div className="font-bold mb-2">RAW METADATA DUMP</div>
                            <pre className="text-[10px] overflow-x-auto">
                                {JSON.stringify({
                                    ver: result.rawMetadata.version,
                                    lic: result.rawMetadata.license,
                                    time: result.rawMetadata.time?.modified
                                }, null, 2)}
                            </pre>
                        </div>
                    </div>
                </ImperialCard>

            </div>
        </div>
    );
}

"use client";

import { NpmMetadata } from "@/types/analyzer";
import { ImperialCard } from "@/components/ui/ImperialCard";
import { Box, User, Globe, Github, Package } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface MetadataPanelProps {
    metadata: NpmMetadata;
}

export function MetadataPanel({ metadata }: MetadataPanelProps) {
    const [logoError, setLogoError] = useState(false);

    // Determine Owner (Author or first maintainer)
    const owner = metadata.author?.name || metadata.maintainers?.[0]?.name || "UNKNOWN_ENTITY";

    // License
    const license = metadata.license || "UNLICENSED";

    // Version
    const version = metadata.version || "LATEST";

    // URLs
    const npmUrl = `https://www.npmjs.com/package/${metadata.name}`;
    const logoUrl = `https://unavatar.io/npm/${metadata.name}`;

    let repoUrl = "";
    if (typeof metadata.repository === 'string') {
        repoUrl = metadata.repository.replace("github:", "https://github.com/").replace("git+", "");
    } else if (metadata.repository?.url) {
        repoUrl = metadata.repository.url.replace("git+", "").replace("ssh://git@", "https://").replace(".git", "");
    }

    const homepageUrl = metadata.homepage;

    return (
        <ImperialCard title="ASSET METADATA" className="h-full flex flex-col min-h-0">
            <div className="flex flex-col h-full gap-4 text-xs min-h-0">

                {/* Header: Logo, Name, Owner */}
                <div className="flex items-start gap-4 shrink-0">
                    <div key={metadata.name} className="w-14 h-14 bg-white/5 border border-imperial-cyan/30 rounded-md shrink-0 flex items-center justify-center overflow-hidden">
                        {!logoError ? (
                            <img
                                src={logoUrl}
                                alt={`${metadata.name} logo`}
                                className="w-full h-full object-contain p-1"
                                onError={() => setLogoError(true)}
                            />
                        ) : (
                            <Box className="w-8 h-8 text-imperial-cyan opacity-50" />
                        )}
                    </div>
                    <div className="flex flex-col justify-center min-w-0 pt-1">
                        <div className="text-xl font-bold text-imperial-cyan truncate tracking-wide">
                            {metadata.name}
                        </div>
                        <div className="flex items-center gap-1 opacity-60 text-[10px] uppercase tracking-wider">
                            <User className="w-3 h-3" />
                            <span className="truncate">{owner}</span>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="flex-grow min-h-0 overflow-y-auto pr-1">
                    <p className="opacity-80 leading-relaxed italic text-[11px] font-mono">
                        "{metadata.description || "No description provided."}"
                    </p>
                </div>

                {/* Footer: License • Version • Links */}
                <div className="shrink-0 pt-3 border-t border-imperial-dim/50 flex items-center justify-between text-[10px] font-mono uppercase opacity-70">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-imperial-cyan/80">{license}</span>
                        <span className="w-1 h-1 rounded-full bg-imperial-cyan/40" />
                        <span>v{version}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link href={npmUrl} target="_blank" className="hover:text-imperial-cyan transition-colors" title="NPM Registry">
                            <Package className="w-3 h-3" />
                        </Link>

                        {repoUrl && (
                            <Link href={repoUrl} target="_blank" className="hover:text-imperial-cyan transition-colors" title="Source Code">
                                <Github className="w-3 h-3" />
                            </Link>
                        )}

                        {homepageUrl && (
                            <Link href={homepageUrl} target="_blank" className="hover:text-imperial-cyan transition-colors" title="Official Website">
                                <Globe className="w-3 h-3" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </ImperialCard>
    );
}

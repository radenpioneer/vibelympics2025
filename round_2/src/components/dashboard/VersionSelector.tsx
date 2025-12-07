"use client";

import { ImperialCard } from "@/components/ui/ImperialCard";
import Link from 'next/link';
import { useState, use } from 'react'; // React 19 use()
import useSWR from 'swr';

interface VersionSelectorProps {
    initialVersionsPromise: Promise<string[]>;
    currentVersion: string;
    packageName: string;
}

const fetcher = (url: string) => fetch(url).then(r => r.json());

export function VersionSelector({ initialVersionsPromise, currentVersion, packageName }: VersionSelectorProps) {
    // 1. Unwrap the initial server data (Suspense-compatible)
    const initialVersions = use(initialVersionsPromise) as string[];

    // 2. Fetch the full list in the background
    const { data: fullVersions } = useSWR<string[]>(
        `/api/versions?package=${encodeURIComponent(packageName)}`,
        fetcher,
        {
            fallbackData: initialVersions, // Show initial 50 immediately
            revalidateOnFocus: false,
            suspense: true
        }
    );

    // Use the SWR data (which starts as initialVersions -> then becomes full list)
    const versions = fullVersions || initialVersions;

    const [displayLimit, setDisplayLimit] = useState(50);
    const displayVersions = versions.slice(0, displayLimit);
    const hasMore = versions.length > displayLimit;

    const handleLoadMore = () => {
        setDisplayLimit(prev => prev + 50);
    };

    return (
        <ImperialCard title={`FILE HISTORY (${versions.length})`} className="h-full flex flex-col min-h-0">
            <div className="flex flex-col gap-1 overflow-y-auto h-full pr-2 text-xs font-mono min-h-0 custom-scrollbar">
                {displayVersions.map((v: string) => (
                    <Link
                        key={v}
                        href={`/${packageName}?v=${v}`}
                        className={`block px-2 py-1 border-l-2 hover:bg-imperial-dim/30 transition-colors ${v === currentVersion
                            ? 'border-imperial-cyan text-imperial-cyan font-bold bg-imperial-dim/20'
                            : 'border-transparent opacity-60 hover:opacity-100'
                            }`}
                    >
                        {v === currentVersion && <span className="mr-2">{">"}</span>}
                        v{v}
                    </Link>
                ))}

                {hasMore && (
                    <button
                        onClick={handleLoadMore}
                        className="mt-2 w-full py-2 text-center border border-imperial-cyan/30 hover:bg-imperial-cyan/10 text-imperial-cyan uppercase tracking-wider text-[10px] hover:text-white transition-all cancel-now"
                    >
                        [ ACCESS DEEP ARCHIVES (+50) ]
                    </button>
                )}
            </div>
        </ImperialCard>
    );
}

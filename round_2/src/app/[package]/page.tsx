import { Suspense } from 'react';
import Link from 'next/link';
import { PackageSearch } from '@/components/dashboard/PackageSearch';
import { ComplianceGaugeContainer } from '@/components/dashboard/server/ComplianceGaugeContainer';
import { MetadataContainer } from '@/components/dashboard/server/MetadataContainer';
import { InterrogationContainer } from '@/components/dashboard/server/InterrogationContainer';
import { VersionSelectorContainer } from '@/components/dashboard/server/VersionSelectorContainer';
import { VulnerabilityContainer } from '@/components/dashboard/server/VulnerabilityContainer';
import { ImperialCard } from '@/components/ui/ImperialCard';

// Force dynamic rendering as we use searchParams
export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ package: string }>;
    searchParams: Promise<{ v?: string }>;
}

function LoadingSkeleton({ title }: { title: string }) {
    return (
        <ImperialCard title={title} className="h-full flex flex-col justify-center items-center opacity-50">
            <div className="text-imperial-cyan animate-pulse tracking-widest text-xs">
                SCANNING DATABASE...
            </div>
        </ImperialCard>
    );
}

export default async function PackagePage({ params, searchParams }: PageProps) {
    const { package: packageName } = await params;
    const { v: version } = await searchParams;

    const decodedName = decodeURIComponent(packageName);

    return (
        <div className="w-full h-full flex flex-col">
            {/* Header */}
            <div className="flex flex-col gap-4 mb-6 border-b border-imperial-dim pb-4 shrink-0">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold tracking-widest text-imperial-cyan [text-shadow:_0_0_10px_var(--color-imperial-cyan)]">
                        ASSET DESIGNATION: {decodedName.toUpperCase()}
                        {version && <span className="opacity-50 ml-2 text-lg">v{version}</span>}
                    </h1>
                    <Link href="/" className="text-xs uppercase hover:text-imperial-cyan underline decoration-dotted opacity-70 hover:opacity-100">
                        [ RETURN TO SEARCH INDEX ]
                    </Link>
                </div>
                <PackageSearch initialValue={decodedName} />
            </div>

            {/* Main Grid Area */}
            <div className="flex-1 min-h-0 relative">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full pb-8">

                    {/* Column 1: Metadata & Interrogation (Context) */}
                    <div className="flex flex-col gap-6 h-full min-h-[500px]">
                        <div className="flex-none">
                            <Suspense fallback={<LoadingSkeleton title="ASSET METADATA" />}>
                                <MetadataContainer packageName={decodedName} version={version} />
                            </Suspense>
                        </div>
                        <div className="flex-1 min-h-0">
                            <Suspense fallback={<LoadingSkeleton title="INTERROGATION TRANSCRIPT" />}>
                                <InterrogationContainer packageName={decodedName} version={version} />
                            </Suspense>
                        </div>
                    </div>

                    {/* Column 2: Score & Version History (Metrics) */}
                    <div className="flex flex-col gap-6 h-full min-h-[500px]">
                        <div className="flex-none h-[180px]"> {/* Compact fixed height for Gauge */}
                            <Suspense fallback={<LoadingSkeleton title="COMPLIANCE RATING" />}>
                                <ComplianceGaugeContainer packageName={decodedName} version={version} />
                            </Suspense>
                        </div>
                        <div className="flex-1 min-h-0">
                            <Suspense fallback={<LoadingSkeleton title="FILE HISTORY" />}>
                                <VersionSelectorContainer packageName={decodedName} version={version} />
                            </Suspense>
                        </div>
                    </div>

                    {/* Column 3: Vulnerabilities (Risks) */}
                    <div className="h-full min-h-[500px]">
                        <Suspense fallback={<LoadingSkeleton title="KNOWN VULNERABILITIES" />}>
                            <VulnerabilityContainer packageName={decodedName} version={version} />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
}



import Link from 'next/link';
import { TOP_50_PACKAGES } from '@/lib/top50';

export function PopularPills() {
    // Show a subset of Top 50 to avoid clutter
    const popular = TOP_50_PACKAGES.slice(0, 12);

    return (
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8 max-w-2xl mx-auto px-4">
            <div className="w-full text-center text-xs uppercase tracking-widest text-imperial-dim mb-2 opacity-70">
                Popular Targets
            </div>
            {popular.map((pkg) => (
                <Link
                    key={pkg}
                    href={`/${pkg}`}
                    className="px-3 py-1 text-xs font-mono border border-imperial-cyan text-imperial-cyan opacity-60 hover:opacity-100 hover:bg-imperial-cyan hover:text-black transition-all cursor-pointer rounded-full"
                >
                    {pkg}
                </Link>
            ))}
        </div>
    );
}

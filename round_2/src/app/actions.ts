import { cache } from 'react';
import { getNpmPackageData, analyzePackage } from "@/lib/analyzer";
import { NpmMetadata, AuditResult } from "@/types/analyzer";
import { compareVersions, getOsvVulnerabilities, Vulnerability } from "@/lib/osv";

// Deduplicate requests for the same package/version within a render cycle
export const cachedGetNpmPackage = cache(async (packageName: string): Promise<NpmMetadata | null> => {
    return await getNpmPackageData(packageName);
});

export const cachedAnalysis = cache(async (packageName: string, version?: string): Promise<AuditResult | null> => {
    const data = await cachedGetNpmPackage(packageName);
    if (!data) return null;
    return analyzePackage(data, version);
});

// Explicit versions fetcher (Robust fallback)
export const cachedGetVersions = cache(async (packageName: string): Promise<string[]> => {
    console.log(`[Cache] Fetching versions for ${packageName}`);
    const data = await cachedGetNpmPackage(packageName);
    if (!data) {
        console.log(`[Cache] No data found for ${packageName}`);
        return [];
    }

    // Try time-based sort first
    if (data.time) {
        const timeKeys = Object.keys(data.time).filter(k => k !== 'modified' && k !== 'created');
        if (timeKeys.length > 0) {
            return timeKeys.sort((a, b) => {
                return new Date(data.time![b]).getTime() - new Date(data.time![a]).getTime();
            });
        }
    }

    // Fallback to versions object keys (usually semver sorted-ish or insertion order)
    if (data.versions) {
        const keys = Object.keys(data.versions);
        // Sort using custom semver comparator (Newest/Highest first)
        return keys.sort((a, b) => compareVersions(b, a));
    }

    return [];
});

export const cachedGetVulns = cache(async (packageName: string, version: string): Promise<Vulnerability[]> => {
    return await getOsvVulnerabilities(packageName, version);
});


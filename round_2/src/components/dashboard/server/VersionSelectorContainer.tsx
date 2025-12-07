import { cachedGetVersions, cachedAnalysis } from "@/app/actions";
import { VersionSelector } from "../VersionSelector";

export async function VersionSelectorContainer({ packageName, version }: { packageName: string, version?: string }) {
    // We fetch ALL versions on server (cache hit likely).
    const allVersions = await cachedGetVersions(packageName);

    // Verify we have versions
    if (!allVersions || allVersions.length === 0) {
        console.warn(`[VersionContainer] No versions found for ${packageName}`);
    }

    // Pass a resolved promise to satisfy the user's "use()" requirement without serialization complexity
    const initialVersionsPromise = Promise.resolve(allVersions.slice(0, 50));

    // We also need latest for fallback active state
    const analysis = await cachedAnalysis(packageName, version);
    const latest = analysis?.rawMetadata["dist-tags"]?.latest || "latest";

    return (
        <VersionSelector
            initialVersionsPromise={initialVersionsPromise}
            currentVersion={version || latest}
            packageName={packageName}
        />
    );
}

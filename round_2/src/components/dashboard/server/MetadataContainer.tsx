import { cachedAnalysis } from "@/app/actions";
import { MetadataPanel } from "../MetadataPanel";

export async function MetadataContainer({ packageName, version }: { packageName: string, version?: string }) {
    const result = await cachedAnalysis(packageName, version);
    if (!result) return null;

    return <MetadataPanel metadata={result.rawMetadata} />;
}

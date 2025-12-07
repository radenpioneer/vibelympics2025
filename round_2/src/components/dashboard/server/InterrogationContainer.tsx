import { cachedAnalysis } from "@/app/actions";
import { InterrogationLog } from "../InterrogationLog";

export async function InterrogationContainer({ packageName, version }: { packageName: string, version?: string }) {
    const result = await cachedAnalysis(packageName, version);
    if (!result) return null;

    return <InterrogationLog transcript={result.interrogationTranscript} riskFactors={result.riskFactors} />;
}

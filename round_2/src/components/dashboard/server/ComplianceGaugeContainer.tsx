import { cachedAnalysis } from "@/app/actions";
import { ComplianceGauge } from "../ComplianceGauge";

export async function ComplianceGaugeContainer({ packageName, version }: { packageName: string, version?: string }) {
    const result = await cachedAnalysis(packageName, version);

    // If loading or error, we might want to show a skeleton or error state.
    // For now, if no result, return closed/error state or null.
    if (!result) return <div className="text-imperial-red text-center p-4 border border-imperial-red">DATA CORRUPTED</div>;

    return <ComplianceGauge score={result.complianceRating} />;
}

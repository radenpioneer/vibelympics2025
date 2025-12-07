import { NpmMetadata, AuditResult, RiskFactor } from "@/types/analyzer";
import { TOP_50_PACKAGES } from "@/lib/top50";

const REGISTRY_URL = "https://registry.npmjs.org";

// Simple Levenshtein implementation
function levenshtein(a: string, b: string): number {
    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) == a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
                );
            }
        }
    }

    return matrix[b.length][a.length];
}

export async function getNpmPackageData(packageName: string): Promise<NpmMetadata | null> {
    try {
        const res = await fetch(`${REGISTRY_URL}/${packageName}`, {
            next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (!res.ok) {
            if (res.status === 404) return null;
            throw new Error(`Failed to fetch package: ${res.statusText}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Error fetching npm data:", error);
        return null;
    }
}

export function analyzePackage(metadata: NpmMetadata): AuditResult {
    const risks: RiskFactor[] = [];
    let score = 100;

    // 1. Typosquatting (Deception Protocol)
    // Check against Top 50 list.
    // If not exact match, check distance.
    const isTop50 = TOP_50_PACKAGES.includes(metadata.name);

    if (!isTop50) {
        for (const popular of TOP_50_PACKAGES) {
            const distance = levenshtein(metadata.name, popular);
            // Risk if distance is small (1-2) but not 0 (exact match) and length is similar
            if (distance > 0 && distance <= 2 && Math.abs(metadata.name.length - popular.length) <= 2) {
                score -= 50; // Heavy penalty
                risks.push({
                    id: "TYPOSQUAT",
                    name: "DECEPTION PROTOCOL ALERT",
                    severity: "CRITICAL",
                    description: `Package name '${metadata.name}' is deceptively similar to popular package '${popular}'.`,
                    technicalTranslation: `Levenshtein distance of ${distance} from '${popular}'. Potential typosquatting.`,
                    imperialTranslation: `WARNING: Possible INSURGENT/REBEL DECEPTION ATTEMPT detected. Mimicry of authorized asset '${popular}'.`
                });
                break; // Only report one match to avoid spam
            }
        }
    }

    // 2. Install Scripts (High Risk)
    const scripts = metadata.scripts || {};
    const hasInstallScripts = Object.keys(scripts).some(s =>
        ["preinstall", "install", "postinstall"].includes(s)
    );

    if (hasInstallScripts) {
        score -= 30;
        risks.push({
            id: "EXEC_RISK",
            name: "UNAUTHORIZED CODE INJECTION",
            severity: "CRITICAL",
            description: "Package contains lifecycle scripts that execute automatically upon installation.",
            technicalTranslation: "Contains preinstall/install/postinstall scripts in package.json.",
            imperialTranslation: "CRITICAL: Asset contains self-executing payload. Violation of ISB Code 77-B."
        });
    }

    // 2. Abandonment (Dormant Asset)
    const modified = metadata.time["modified"];
    const lastPublish = new Date(modified);
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

    if (lastPublish < twoYearsAgo) {
        score -= 20;
        risks.push({
            id: "DORMANT",
            name: "ASSET VITALITY INDEX",
            severity: "MEDIUM",
            description: "Package has not been updated in over 2 years.",
            technicalTranslation: `Last publish date: ${lastPublish.toISOString().split('T')[0]}. > 2 years inactivity.`,
            imperialTranslation: "Asset DORMANT. Lack of recent maintenance indicates potential structural decay."
        });
    }

    // 3. Hygiene (Maintainers)
    const maintainers = metadata.maintainers || [];
    if (maintainers.length === 1) {
        score -= 10;
        risks.push({
            id: "BUS_FACTOR",
            name: "SINGLE POINT OF FAILURE",
            severity: "LOW",
            description: "Package relies on a single maintainer.",
            technicalTranslation: "Maintainer count: 1. Low Bus Factor.",
            imperialTranslation: "Asset entirely reliant on single biological unit. Redundancy protocols nonexistent."
        });
    }

    return {
        packageName: metadata.name,
        complianceRating: Math.max(0, score),
        riskFactors: risks,
        rawMetadata: metadata,
        interrogationTranscript: generateInterrogation(metadata.name, risks, score)
    };
}

function generateInterrogation(name: string, risks: RiskFactor[], score: number): string {
    if (score === 100) {
        return `Asset ${name} complies with Imperial standards. No immediate threat detected. Move along.`;
    }

    const severeRisk = risks.find(r => r.severity === "CRITICAL" || r.severity === "HIGH");
    if (severeRisk) {
        return `Asset ${name} is in DIRECT VIOLATION of Imperial Security protocols. ${severeRisk.imperialTranslation} Immediate quarantine recommended.`;
    }

    return `Asset ${name} shows signs of deviation. ${risks.map(r => r.imperialTranslation).join(" ")} Surveillance increased.`;
}

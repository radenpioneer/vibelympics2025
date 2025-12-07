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
            cache: 'no-store', // Disable caching to avoid 2MB limit error for large packages
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

export function analyzePackage(metadata: NpmMetadata, version?: string): AuditResult {
    const risks: RiskFactor[] = [];
    let score = 100;

    // Determine target version data
    const targetVersionFn = version || metadata["dist-tags"]?.latest;
    const versionData = metadata.versions?.[targetVersionFn] || {};

    // Use properties from the specific version if available, falling back to top-level metadata which is usually latest
    // Note: top-level metadata `name` is constant. `scripts`, `dependencies` are in `versions[v]`.
    // The `metadata` object from registry root often has `readme`, `maintainers`, etc.
    // Spec: https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md

    // We MUST use the version-specific data for analysis if possible.
    // If selecting a specific version, we treat *it* as the subject.

    // 1. Typosquatting (Deception Protocol) -> Unaffected by version usually, but good to keep check.
    const isTop50 = TOP_50_PACKAGES.includes(metadata.name);

    if (!isTop50) {
        for (const popular of TOP_50_PACKAGES) {
            const distance = levenshtein(metadata.name, popular);
            if (distance > 0 && distance <= 2 && Math.abs(metadata.name.length - popular.length) <= 2) {
                score -= 50;
                risks.push({
                    id: "TYPOSQUAT",
                    name: "DECEPTION PROTOCOL ALERT",
                    severity: "CRITICAL",
                    description: `Package name '${metadata.name}' is deceptively similar to popular package '${popular}'.`,
                    technicalTranslation: `Levenshtein distance of ${distance} from '${popular}'. Potential typosquatting.`,
                    imperialTranslation: `WARNING: Possible INSURGENT/REBEL DECEPTION ATTEMPT detected. Mimicry of authorized asset '${popular}'.`
                });
                break;
            }
        }
    }

    // 2. Install Scripts (High Risk) -> VERSION SPECIFIC
    const scripts = versionData.scripts || metadata.scripts || {};
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
    // Abbreviated metadata might exclude 'time' object. Handle gracefully.
    const modified = metadata.time ? metadata.time["modified"] : null;

    if (modified) {
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
    }

    // 3. Hygiene (Maintainers) -> Project level
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

    // Construct a "Mixed" metadata object that represents the view for the requested version
    // We override top-level props with version-specific ones for display
    const resultMetadata = {
        ...metadata,
        ...versionData, // Overlay version specific stuff (scripts, dependencies, etc)
        version: targetVersionFn, // Ensure version is explicitly set to what we analyzed
        maintainers: metadata.maintainers, // Maintainers usually global or from latest, keep global
        "dist-tags": metadata["dist-tags"], // Keep tags
        time: metadata.time,
        versions: metadata.versions
    };

    return {
        packageName: metadata.name,
        complianceRating: Math.max(0, score),
        riskFactors: risks,
        rawMetadata: resultMetadata,
        interrogationTranscript: generateInterrogation(metadata.name, risks, score, resultMetadata.version),
        versions: metadata.versions,
        time: metadata.time,
        "dist-tags": metadata["dist-tags"],
    };
}

function generateInterrogation(name: string, risks: RiskFactor[], score: number, version?: string): string {
    const vLabel = version ? `(v${version})` : "";

    if (score === 100) {
        return `Asset ${name} ${vLabel} complies with Imperial standards. No immediate threat detected. Move along.`;
    }

    const severeRisk = risks.find(r => r.severity === "CRITICAL" || r.severity === "HIGH");
    if (severeRisk) {
        return `Asset ${name} ${vLabel} is in DIRECT VIOLATION of Imperial Security protocols. ${severeRisk.imperialTranslation} Immediate quarantine recommended.`;
    }

    return `Asset ${name} ${vLabel} shows signs of deviation. ${risks.map(r => r.imperialTranslation).join(" ")} Surveillance increased.`;
}

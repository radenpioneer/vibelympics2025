export interface AuditResult {
    packageName: string;
    complianceRating: number; // 0-100
    riskFactors: RiskFactor[];
    rawMetadata: NpmMetadata;
    interrogationTranscript: string;
    versions?: Record<string, any>;
    time?: Record<string, string>;
    "dist-tags"?: { latest: string;[key: string]: string };
}

export interface RiskFactor {
    id: string;
    name: string;
    severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    description: string; // The "Fine Print"
    technicalTranslation: string; // The absolute technical truth
    imperialTranslation: string; // The "Weird" version
}

export interface NpmMetadata {
    name: string;
    description: string;
    maintainers: { name: string; email: string }[];
    "dist-tags": { latest: string;[key: string]: string };
    versions: Record<string, any>;
    time?: Record<string, string>;
    license?: string;
    version: string;
    scripts?: { [key: string]: string };
    repository?: string | { type: string; url: string }; // Can be string or object
    dist?: { shasum: string; tarball: string; integrity?: string };
    author?: { name: string; email?: string; url?: string };
    homepage?: string;
}

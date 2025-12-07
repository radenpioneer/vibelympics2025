export interface AuditResult {
    packageName: string;
    complianceRating: number; // 0-100
    riskFactors: RiskFactor[];
    rawMetadata: any;
    interrogationTranscript: string;
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
    version: string;
    description: string;
    maintainers: { name: string; email: string }[];
    time: { [key: string]: string };
    repository?: { type: string; url: string };
    scripts?: { [key: string]: string };
    license?: string;
    dist?: { shasum: string; tarball: string; integrity?: string };
}

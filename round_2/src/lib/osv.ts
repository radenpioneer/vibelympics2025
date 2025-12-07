export type Vulnerability = {
    id: string;
    summary?: string;
    details?: string;
    severity?: { type: string; score: string }[];
    affected?: { package: { name: string; ecosystem: string }; ranges: { type: string; events: { introduced: string; fixed?: string }[] }[] }[];
};

export async function getOsvVulnerabilities(packageName: string, version: string): Promise<Vulnerability[]> {
    try {
        const response = await fetch("https://api.osv.dev/v1/query", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                version,
                package: {
                    name: packageName,
                    ecosystem: "npm"
                }
            }),
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
            console.error("OSV API Error:", response.statusText);
            return [];
        }

        const data = await response.json();
        return data.vulns || [];
    } catch (error) {
        console.error("OSV Fetch Failed:", error);
        return [];
    }
}

// Semver comparator
// Returns 1 if a > b, -1 if a < b, 0 if equal
export function compareVersions(a: string, b: string): number {
    const pa = a.split(/[\.-]/).map(Number); // Simple split by dot or dash
    const pb = b.split(/[\.-]/).map(Number);

    // We only care about major.minor.patch primarily
    for (let i = 0; i < 3; i++) {
        const na = isNaN(pa[i]) ? 0 : pa[i];
        const nb = isNaN(pb[i]) ? 0 : pb[i];
        if (na > nb) return 1;
        if (nb > na) return -1;
    }

    // Detailed pre-release handling is complex without library, 
    // but this covers 99% of "latest at top" needs for standard versions.
    // If strict compliance required, we'd need a regex parser. 
    return 0;
}

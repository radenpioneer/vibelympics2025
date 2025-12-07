"use server";

import { getNpmPackageData, analyzePackage } from "@/lib/analyzer";
import { AuditResult } from "@/types/analyzer";

export async function analyzePackageAction(packageName: string): Promise<{ success: boolean; data?: AuditResult; error?: string }> {
    if (!packageName) {
        return { success: false, error: "Package designation required." };
    }

    try {
        const data = await getNpmPackageData(packageName);
        if (!data) {
            return { success: false, error: "Asset not found in Galactic Registry." };
        }

        const result = analyzePackage(data);
        return { success: true, data: result };
    } catch (err) {
        console.error("Analysis failed:", err);
        return { success: false, error: "System failure. Unable to complete audit." };
    }
}

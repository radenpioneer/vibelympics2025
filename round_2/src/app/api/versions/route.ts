import { cachedGetVersions } from "@/app/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const packageName = searchParams.get('package');

    if (!packageName) {
        return NextResponse.json({ error: 'Package Name required' }, { status: 400 });
    }

    const versions = await cachedGetVersions(packageName);
    return NextResponse.json(versions);
}

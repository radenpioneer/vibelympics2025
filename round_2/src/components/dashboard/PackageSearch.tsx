"use client";

import { useRouter } from 'next/navigation';
import { SearchForm } from "@/components/ui/SearchForm";

interface PackageSearchProps {
    initialValue: string;
}

export function PackageSearch({ initialValue }: PackageSearchProps) {
    const router = useRouter();

    const handleSearch = (query: string) => {
        router.push(`/${query}`);
    };

    return (
        <SearchForm
            onSearch={handleSearch}
            initialValue={initialValue}
            compact={true}
        />
    );
}

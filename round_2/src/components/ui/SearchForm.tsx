"use client";

import React, { useState } from 'react';
import { ImperialCard } from './ImperialCard';

interface SearchFormProps {
    onSearch: (query: string) => void;
    isLoading?: boolean;
}

export function SearchForm({ onSearch, isLoading = false }: SearchFormProps) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    return (
        <ImperialCard className="max-w-2xl mx-auto mt-20 text-center">
            <h1 className="text-3xl mb-8 font-bold tracking-widest text-imperial-cyan [text-shadow:_0_0_5px_var(--color-imperial-cyan)]">
                GALACTIC NETWORKS
                <div className="text-sm mt-2 opacity-80">PACKAGE ASSET AUDIT PORTAL v8.2</div>
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col items-start gap-2">
                    <label htmlFor="pkg-search" className="text-xs uppercase tracking-widest text-imperial-cyan">
                        Enter Package Designation
                    </label>
                    <div className="w-full relative group">
                        <span className="absolute left-3 top-3 text-imperial-cyan opacity-70">{">"}</span>
                        <input
                            id="pkg-search"
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="CORE-LOGIC-BINDING..."
                            className="w-full bg-black/50 border border-imperial-dim p-3 pl-8 text-imperial-cyan font-mono focus:border-imperial-cyan focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] transition-all uppercase placeholder:opacity-30"
                            autoComplete="off"
                            autoFocus
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading || !query}
                    className="group relative px-8 py-3 bg-black border border-imperial-cyan text-imperial-cyan uppercase tracking-[0.2em] hover:bg-imperial-cyan hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                >
                    <span className="relative z-10">
                        {isLoading ? "SCANNING ASSET..." : ":: AUTHORIZE AUDIT ::"}
                    </span>
                    {/* Hover scanline effect for button */}
                    <div className="absolute inset-0 bg-imperial-cyan opacity-0 group-hover:opacity-10 transition-opacity" />
                </button>
            </form>
        </ImperialCard>
    );
}

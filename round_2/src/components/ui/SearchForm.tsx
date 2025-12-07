"use client";

import React, { useState } from 'react';
import { ImperialCard } from './ImperialCard';

interface SearchFormProps {
    onSearch: (query: string) => void;
    isLoading?: boolean;
    initialValue?: string;
    compact?: boolean;
}

export function SearchForm({ onSearch, isLoading = false, initialValue = "", compact = false }: SearchFormProps) {
    const [query, setQuery] = useState(initialValue);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    return (
        <ImperialCard className={`mx-auto ${compact ? 'w-full mb-6' : 'max-w-2xl mt-20 text-center'}`}>
            {!compact && (
                <h1 className="text-3xl mb-8 font-bold tracking-widest text-imperial-cyan [text-shadow:_0_0_5px_var(--color-imperial-cyan)]">
                    GALACTIC NETWORKS
                    <div className="text-sm mt-2 opacity-80">PACKAGE ASSET AUDIT PORTAL v8.2</div>
                </h1>
            )}

            <form onSubmit={handleSubmit} className={`flex ${compact ? 'flex-row items-center gap-4' : 'flex-col gap-6'}`}>
                <div className={`flex flex-col items-start gap-2 ${compact ? 'flex-1' : ''}`}>
                    {!compact && (
                        <label htmlFor="pkg-search" className="text-xs uppercase tracking-widest text-imperial-cyan">
                            Enter Package Designation
                        </label>
                    )}
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
                            autoFocus={!compact}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading || !query}
                    className={`group relative bg-black border border-imperial-cyan text-imperial-cyan uppercase tracking-[0.2em] hover:bg-imperial-cyan hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden ${compact
                            ? 'w-12 h-12 flex items-center justify-center p-0 shrink-0'
                            : 'px-8 py-3 w-full'
                        }`}
                >
                    <span className="relative z-10 flex items-center justify-center">
                        {isLoading ? (
                            <span className="animate-spin text-lg">☼</span>
                        ) : compact ? (
                            // Icon for compact mode (Search / Scan)
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                <line x1="11" y1="8" x2="11" y2="14" className="opacity-50"></line>
                                <line x1="8" y1="11" x2="14" y2="11" className="opacity-50"></line>
                            </svg>
                        ) : (
                            ":: AUTHORIZE AUDIT ::"
                        )}
                    </span>
                    {/* Hover scanline effect for button */}
                    <div className="absolute inset-0 bg-imperial-cyan opacity-0 group-hover:opacity-10 transition-opacity" />
                </button>
            </form>
        </ImperialCard>
    );
}

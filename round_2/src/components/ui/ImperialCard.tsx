import React from 'react';

interface ImperialCardProps {
    children: React.ReactNode;
    title?: string;
    className?: string;
    variant?: 'default' | 'danger';
}

export function ImperialCard({ children, title, className = "", variant = 'default' }: ImperialCardProps) {
    const borderColor = variant === 'danger' ? 'border-imperial-red' : 'border-imperial-cyan';
    const textColor = variant === 'danger' ? 'text-imperial-red' : 'text-imperial-cyan';
    const shadowClass = variant === 'danger' ? 'shadow-[0_0_15px_rgba(153,0,0,0.3)]' : 'shadow-[0_0_15px_rgba(0,255,255,0.2)]';

    return (
        <div className={`relative border-2 ${borderColor} bg-black/80 p-4 ${shadowClass} ${className}`}>
            {/* Top Left Corner Accent */}
            <div className={`absolute -top-1 -left-1 w-4 h-4 border-t-4 border-l-4 ${borderColor}`} />

            {/* Bottom Right Corner Accent */}
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-b-4 border-r-4 ${borderColor}`} />

            {title && (
                <div className={`absolute -top-3 left-4 bg-black px-2 ${textColor} font-bold tracking-widest uppercase text-sm`}>
                    {title}
                </div>
            )}

            <div className="relative z-10 h-full w-full flex flex-col">
                {children}
            </div>
        </div>
    );
}

import React from 'react';

interface AppContainerProps {
    children: React.ReactNode;
}

export function AppContainer({ children }: AppContainerProps) {
    return (
        <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-background overflow-hidden p-4 md:p-8 lg:p-12">
            {/* 
        Container with 4:3 aspect ratio (Landscape). 
        Constraints:
        - Max height: 100% of wrapper (minus padding)
        - Max width: 100% of wrapper (minus padding)
        - Maintain 4/3 aspect ratio
      */}
            <div className="relative aspect-[4/3] w-full md:w-auto h-auto md:h-full max-w-full max-h-full bg-black border-4 border-double border-imperial-dim shadow-[0_0_40px_rgba(0,68,68,0.3)] flex flex-col overflow-hidden">

                {/* Scoped CRT Effects */}
                <div className="absolute inset-0 z-50 pointer-events-none bg-[linear-gradient(to_bottom,rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] animate-flicker" />
                <div className="absolute top-0 left-0 z-51 w-full h-[2px] bg-[rgba(0,255,255,0.1)] pointer-events-none animate-scanline" />

                {/* Content Area - Padding approx 8rem as requested originally, but scaled for usability */}
                <div className="relative z-10 w-full h-full overflow-y-auto px-6 pt-4 pb-12 md:px-12 md:pt-6 md:pb-20 lg:px-20 lg:pt-10 lg:pb-32 scrollbar-hide">
                    {children}
                </div>
            </div>
        </div>
    );
}

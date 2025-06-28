import React, { useState } from 'react'
import { useThemeStore } from '../store/useTheme.store'
import { THEMES } from '../constants'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Themes = () => {
    const { theme, setTheme } = useThemeStore();
    const [currentPage, setCurrentPage] = useState(0);
    
    // Show 12 themes per page (3x4 grid)
    const themesPerPage = 12;
    const totalPages = Math.ceil(THEMES.length / themesPerPage);
    
    // Get current themes to display
    const currentThemes = THEMES.slice(
        currentPage * themesPerPage,
        (currentPage + 1) * themesPerPage
    );
    
    // Navigation functions
    const goToNextPage = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };
    
    const goToPrevPage = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };
    
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {currentThemes.map((t) => (
                    <button
                        key={t}
                        className={`
                            group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                            ${theme === t ? "bg-base-300 ring-1 ring-primary" : "hover:bg-base-300"}
                        `}
                        onClick={() => setTheme(t)}
                        aria-label={`Select ${t} theme`}
                    >
                        <div 
                            className="relative h-8 w-full rounded-md overflow-hidden shadow-sm" 
                            data-theme={t}
                        >
                            <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                                <div className="rounded bg-primary"></div>
                                <div className="rounded bg-secondary"></div>
                                <div className="rounded bg-accent"></div>
                                <div className="rounded bg-neutral"></div>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className={`text-xs font-medium truncate w-full text-center ${theme === t ? "text-primary" : ""}`}>
                                {t.charAt(0).toUpperCase() + t.slice(1)}
                            </span>
                        </div>
                    </button>
                ))}
            </div>
            
            {/* Pagination controls */}
            <div className="flex justify-between items-center pt-2">
                <div className="text-xs text-base-content/70">
                    Page {currentPage + 1} of {totalPages}
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={goToPrevPage}
                        className="btn btn-sm btn-circle btn-ghost"
                        aria-label="Previous page"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button 
                        onClick={goToNextPage}
                        className="btn btn-sm btn-circle btn-ghost"
                        aria-label="Next page"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Themes
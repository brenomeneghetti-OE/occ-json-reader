import { FileText } from "lucide-react";
import type React from "react";

export const AppHeader: React.FC = () => (
    <header className="flex flex-col items-center gap-3 py-6 sm:py-8">
        <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-cyan-500/20">
            <FileText className="h-7 w-7 sm:h-8 sm:w-8 text-cyan-400" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white">Log Compiler</h1>
        <p className="text-sm sm:text-base text-slate-400">Upload and analyze your NDJSON log files</p>
    </header>
);

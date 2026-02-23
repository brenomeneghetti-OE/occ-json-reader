import { FileText } from "lucide-react";
import type React from "react";

export const AppHeader: React.FC = () => (
    <header className="flex flex-col items-center gap-3 py-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/20">
            <FileText className="h-8 w-8 text-cyan-400" />
        </div>
        <h1 className="text-4xl font-bold text-white">Log Compiler</h1>
        <p className="text-slate-400">Upload and analyze your NDJSON log files</p>
    </header>
);

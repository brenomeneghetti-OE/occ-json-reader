import { FileText, RefreshCw } from "lucide-react";
import type React from "react";

type FileInfoBarProps = {
    filename: string;
    totalEntries: number;
    onReset: () => void;
};

export const FileInfoBar: React.FC<FileInfoBarProps> = ({
    filename,
    totalEntries,
    onReset,
}) => (
    <div className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800/60 px-5 py-3">
        <div className="flex items-center gap-3 min-w-0">
            <FileText className="h-5 w-5 shrink-0 text-cyan-400" />
            <span className="truncate font-mono text-sm text-white">{filename}</span>
            <span className="shrink-0 text-sm text-slate-400">
                ·{" "}
                <span className="text-cyan-400 font-semibold">{totalEntries}</span> log{" "}
                {totalEntries === 1 ? "entry" : "entries"} loaded
            </span>
        </div>
        <button
            type="button"
            onClick={onReset}
            className="ml-4 flex shrink-0 items-center gap-2 rounded-lg border border-slate-600 px-3 py-1.5 text-sm text-slate-300 transition-colors hover:border-cyan-400 hover:text-cyan-400"
        >
            <RefreshCw className="h-4 w-4" />
            Load New File
        </button>
    </div>
);

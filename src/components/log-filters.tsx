import { Search } from "lucide-react";
import type React from "react";
import type { UseLogFiltersResult } from "../hooks/use-log-filters";

type LogFiltersProps = Pick<
    UseLogFiltersResult,
    | "availableLevels"
    | "availableClusterIds"
    | "selectedLevels"
    | "selectedClusterIds"
    | "textSearch"
    | "fromDate"
    | "toDate"
    | "toggleLevel"
    | "toggleClusterId"
    | "setTextSearch"
    | "setFromDate"
    | "setToDate"
>;

const LEVEL_ACTIVE: Record<string, string> = {
    info: "bg-blue-500 text-white border-blue-500",
    error: "bg-red-500 text-white border-red-500",
    warning: "bg-amber-500 text-white border-amber-500",
    debug: "bg-slate-500 text-white border-slate-500",
};

const LEVEL_INACTIVE = "bg-transparent text-slate-400 border-slate-600 hover:border-slate-400 hover:text-slate-300";

export const LogFilters: React.FC<LogFiltersProps> = ({
    availableLevels,
    availableClusterIds,
    selectedLevels,
    selectedClusterIds,
    textSearch,
    fromDate,
    toDate,
    toggleLevel,
    toggleClusterId,
    setTextSearch,
    setFromDate,
    setToDate,
}) => (
    <div className="rounded-xl border border-slate-700 bg-slate-800/40 px-5 py-4 space-y-4">
        {/* Log Levels */}
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 sm:w-24 sm:shrink-0">
                Log Levels
            </span>
            <div className="flex flex-wrap gap-2">
                {availableLevels.map((level) => {
                    const isActive = selectedLevels.includes(level);
                    const activeClass = LEVEL_ACTIVE[level] ?? "bg-cyan-500 text-white border-cyan-500";
                    return (
                        <button
                            key={level}
                            type="button"
                            onClick={() => toggleLevel(level)}
                            className={`rounded-full border px-3 py-1 text-xs font-medium capitalize transition-colors ${isActive ? activeClass : LEVEL_INACTIVE}`}
                        >
                            {level}
                        </button>
                    );
                })}
            </div>
        </div>

        {/* Cluster IDs */}
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 sm:w-24 sm:shrink-0">
                Cluster IDs
            </span>
            <div className="flex flex-wrap gap-2">
                {availableClusterIds.map((id) => {
                    const isActive = selectedClusterIds.includes(id);
                    return (
                        <button
                            key={id}
                            type="button"
                            onClick={() => toggleClusterId(id)}
                            className={`rounded-full border px-3 py-1 text-xs font-mono transition-colors ${isActive
                                ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/60"
                                : LEVEL_INACTIVE
                                }`}
                        >
                            {id}
                        </button>
                    );
                })}
            </div>
        </div>

        {/* Timeframe */}
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 sm:w-24 sm:shrink-0">
                Timeframe
            </span>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                <label className="flex items-center gap-2">
                    <span className="w-6 text-xs text-slate-500">From</span>
                    <input
                        type="datetime-local"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="w-full sm:w-auto rounded-lg border border-slate-600 bg-slate-900/60 px-2 py-1 text-xs text-slate-300 focus:border-cyan-500 focus:outline-none [color-scheme:dark]"
                    />
                </label>
                <label className="flex items-center gap-2">
                    <span className="w-6 text-xs text-slate-500">To</span>
                    <input
                        type="datetime-local"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="w-full sm:w-auto rounded-lg border border-slate-600 bg-slate-900/60 px-2 py-1 text-xs text-slate-300 focus:border-cyan-500 focus:outline-none [color-scheme:dark]"
                    />
                </label>
                {(fromDate || toDate) && (
                    <button
                        type="button"
                        onClick={() => { setFromDate(""); setToDate(""); }}
                        className="self-start text-xs text-slate-500 hover:text-slate-300 transition-colors sm:self-auto"
                    >
                        Clear
                    </button>
                )}
            </div>
        </div>

        {/* Text Search */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 sm:w-24 sm:shrink-0">
                Search
            </span>
            <div className="relative flex-1 sm:max-w-sm">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
                <input
                    type="text"
                    placeholder="Search across all fields…"
                    value={textSearch}
                    onChange={(e) => setTextSearch(e.target.value)}
                    className="w-full rounded-lg border border-slate-600 bg-slate-900/60 py-1.5 pl-8 pr-3 text-sm text-slate-300 placeholder-slate-600 focus:border-cyan-500 focus:outline-none"
                />
            </div>
        </div>
    </div>
);

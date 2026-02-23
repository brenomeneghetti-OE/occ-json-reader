import { ArrowDown, ArrowUp, ArrowUpDown, Download } from "lucide-react";
import type React from "react";
import { useCallback, useMemo, useState } from "react";
import type { LogEntry } from "../types";

type SortDir = "asc" | "desc" | "none";

type LogTableProps = {
    entries: LogEntry[];
    filteredEntries: LogEntry[];
    filename: string;
    onRowClick: (entry: LogEntry) => void;
};

const LEVEL_BADGE: Record<string, string> = {
    info: "bg-blue-500/20 text-blue-400 border border-blue-500/40",
    error: "bg-red-500/20 text-red-400 border border-red-500/40",
    warning: "bg-amber-500/20 text-amber-400 border border-amber-500/40",
    debug: "bg-slate-600/40 text-slate-400 border border-slate-500/40",
};

const fallbackBadge = "bg-slate-600/40 text-slate-400 border border-slate-500/40";

export const LogTable: React.FC<LogTableProps> = ({
    entries,
    filteredEntries,
    filename,
    onRowClick,
}) => {
    const [sortDir, setSortDir] = useState<SortDir>("none");

    const sorted = useMemo(() => {
        if (sortDir === "none") return filteredEntries;
        return [...filteredEntries].sort((a, b) => {
            const ta = new Date(a.timestamp).getTime();
            const tb = new Date(b.timestamp).getTime();
            return sortDir === "asc" ? ta - tb : tb - ta;
        });
    }, [filteredEntries, sortDir]);

    const toggleSort = () => {
        setSortDir((prev) =>
            prev === "none" ? "asc" : prev === "asc" ? "desc" : "none",
        );
    };

    const handleDownload = useCallback(() => {
        const content = filteredEntries.map((e) => JSON.stringify(e)).join("\n");
        const blob = new Blob([content], { type: "application/x-ndjson" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        const baseName = filename.replace(/\.[^.]+$/, "");
        a.href = url;
        a.download = `${baseName}-filtered.log`;
        a.click();
        URL.revokeObjectURL(url);
    }, [filteredEntries, filename]);

    const SortIcon =
        sortDir === "asc" ? ArrowUp : sortDir === "desc" ? ArrowDown : ArrowUpDown;

    return (
        <div className="flex flex-col overflow-hidden rounded-xl border border-slate-700 bg-slate-800/40">
            {/* Entry count bar */}
            <div className="flex items-center justify-between border-b border-slate-700 px-4 py-3">
                <span className="text-sm text-slate-400">
                    <span className="font-semibold text-white">{filteredEntries.length}</span>{" "}
                    of{" "}
                    <span className="font-semibold text-white">{entries.length}</span>{" "}
                    entries
                </span>
                <button
                    type="button"
                    onClick={handleDownload}
                    disabled={filteredEntries.length === 0}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-600 px-3 py-1.5 text-xs text-slate-300 transition-colors hover:border-cyan-400 hover:text-cyan-400 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <Download className="h-3.5 w-3.5" />
                    Download
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-slate-700 text-left text-xs uppercase tracking-wider text-slate-500">
                            <th className="px-4 py-3">
                                <button
                                    type="button"
                                    onClick={toggleSort}
                                    className="flex items-center gap-1 transition-colors hover:text-slate-300"
                                    aria-label="Sort by timestamp"
                                >
                                    Timestamp
                                    <SortIcon className="h-3 w-3" />
                                </button>
                            </th>
                            <th className="px-4 py-3">#</th>
                            <th className="px-4 py-3">Level</th>
                            <th className="px-4 py-3">Method</th>
                            <th className="px-4 py-3">Endpoint</th>
                            <th className="px-4 py-3">Cluster ID</th>
                            <th className="px-4 py-3">Request ID</th>
                            <th className="px-4 py-3">Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sorted.map((entry, i) => (
                            <tr
                                // biome-ignore lint/suspicious/noArrayIndexKey: stable list with no reorder
                                key={i}
                                onClick={() => onRowClick(entry)}
                                className="cursor-pointer border-b border-slate-800/60 transition-colors hover:bg-slate-700/40"
                            >
                                <td className="whitespace-nowrap px-4 py-3 font-mono text-amber-400">
                                    {new Date(entry.timestamp).toLocaleString()}
                                </td>
                                <td className="px-4 py-3 text-slate-500">{i + 1}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${LEVEL_BADGE[entry.level?.toLowerCase()] ?? fallbackBadge
                                            }`}
                                    >
                                        {entry.level}
                                    </span>
                                </td>
                                <td className="px-4 py-3 font-mono text-slate-300">
                                    {entry.requestMethod}
                                </td>
                                <td
                                    className="max-w-56 truncate px-4 py-3 font-mono text-slate-300"
                                    title={entry.endpoint}
                                >
                                    {entry.endpoint}
                                </td>
                                <td className="px-4 py-3 font-mono text-slate-300">
                                    {entry.clusterId}
                                </td>
                                <td className="px-4 py-3 font-mono text-slate-300">
                                    {entry.requestId}
                                </td>
                                <td
                                    className="max-w-56 truncate px-4 py-3 font-mono text-slate-300"
                                    title={entry.message}
                                >
                                    {entry.message}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {sorted.length === 0 && (
                    <div className="py-12 text-center text-slate-500">
                        No entries to display
                    </div>
                )}
            </div>
        </div>
    );
};

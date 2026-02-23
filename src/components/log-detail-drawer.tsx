import { X } from "lucide-react";
import type React from "react";
import { useEffect } from "react";
import type { LogEntry } from "../types";

const LEVEL_BADGE: Record<string, string> = {
    info: "bg-blue-500/20 text-blue-400 border border-blue-500/40",
    error: "bg-red-500/20 text-red-400 border border-red-500/40",
    warning: "bg-amber-500/20 text-amber-400 border border-amber-500/40",
    debug: "bg-slate-600/40 text-slate-400 border border-slate-500/40",
};

const fallbackBadge = "bg-slate-600/40 text-slate-400 border border-slate-500/40";

type FieldProps = {
    label: string;
    value: string;
};

const Field: React.FC<FieldProps> = ({ label, value }) => (
    <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {label}
        </span>
        <div className="rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 font-mono text-sm text-slate-300 break-all">
            {value || <span className="text-slate-600 italic">—</span>}
        </div>
    </div>
);

type LogDetailDrawerProps = {
    entry: LogEntry | null;
    onClose: () => void;
};

export const LogDetailDrawer: React.FC<LogDetailDrawerProps> = ({
    entry,
    onClose,
}) => {
    // Close on Escape key
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    const isOpen = entry !== null;

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Drawer panel */}
            <aside
                role="dialog"
                aria-modal="true"
                aria-label="Log entry details"
                className={`fixed right-0 top-0 z-50 flex h-full w-full flex-col border-l border-slate-700 bg-[#0a1628] shadow-2xl transition-transform duration-300 ease-in-out sm:max-w-lg md:max-w-[48vw] ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                {isOpen && entry && (
                    <>
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-slate-700 px-6 py-4">
                            <div className="flex items-center gap-3 min-w-0">
                                <h2 className="text-sm font-semibold text-slate-300">
                                    Log Details
                                </h2>
                                <span
                                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${LEVEL_BADGE[entry.level?.toLowerCase()] ?? fallbackBadge}`}
                                >
                                    {entry.level}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Close details panel"
                                className="ml-4 flex items-center justify-center rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-700/60 hover:text-slate-200"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Timestamp sub-header */}
                        <div className="border-b border-slate-800 px-6 py-3">
                            <span className="font-mono text-sm text-amber-400">
                                {new Date(entry.timestamp).toLocaleString()}
                            </span>
                        </div>

                        {/* Fields */}
                        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
                            <Field label="Method" value={entry.requestMethod} />
                            <Field label="Endpoint" value={entry.endpoint} />
                            <Field label="Cluster ID" value={entry.clusterId} />
                            <Field label="Request ID" value={entry.requestId} />
                            <Field label="Message" value={entry.message} />
                        </div>
                    </>
                )}
            </aside>
        </>
    );
};

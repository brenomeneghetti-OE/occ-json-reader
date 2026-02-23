import type React from "react";

const EXAMPLE = `{
  "clusterId": "Worker 20",
  "endpoint": "/ccstorex/custom/v1/bopis_order",
  "level": "info",
  "message": "",
  "requestId": "",
  "requestMethod": "POST",
  "timestamp": "2025-09-05T14:25:43.179Z"
}`;

export const LogFormatCard: React.FC = () => (
    <div className="rounded-xl border border-slate-700 bg-slate-800/40 p-6">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Expected Log Format
        </h2>
        <pre className="overflow-x-auto rounded-lg bg-slate-900/80 p-4 font-mono text-sm leading-relaxed text-slate-300">
            {EXAMPLE}
        </pre>
    </div>
);

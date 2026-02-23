import type React from "react";
import { AppHeader } from "./components/app-header";
import { FileInfoBar } from "./components/file-info-bar";
import { FileUpload } from "./components/file-upload";
import { LogFormatCard } from "./components/log-format-card";
import { LogTable } from "./components/log-table";
import { useLogFile } from "./hooks/use-log-file";
import type { LogEntry } from "./types";

export function App(): React.ReactElement {
  const { entries, filename, error, loadFile, reset } = useLogFile();

  // FR-05 handler placeholder (drawer to be implemented)
  const handleRowClick = (_entry: LogEntry) => { };

  return (
    <div className="flex min-h-screen flex-col bg-[#060d1a] text-white">
      <div className="mx-auto w-full max-w-7xl px-4">
        <AppHeader />
        {entries === null ? (
          <div className="mx-auto max-w-2xl space-y-4 pb-12">
            <FileUpload onFile={loadFile} error={error} />
            <LogFormatCard />
          </div>
        ) : (
          <div className="space-y-4 pb-12">
            <FileInfoBar
              filename={filename ?? ""}
              totalEntries={entries.length}
              onReset={reset}
            />
            <LogTable
              entries={entries}
              filteredEntries={entries}
              onRowClick={handleRowClick}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

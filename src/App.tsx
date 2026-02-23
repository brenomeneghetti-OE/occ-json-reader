import type React from "react";
import { useState } from "react";
import { AppHeader } from "./components/app-header";
import { FileInfoBar } from "./components/file-info-bar";
import { FileUpload } from "./components/file-upload";
import { LogDetailDrawer } from "./components/log-detail-drawer";
import { LogFilters } from "./components/log-filters";
import { LogFormatCard } from "./components/log-format-card";
import { LogTable } from "./components/log-table";
import { useLogFilters } from "./hooks/use-log-filters";
import { useLogFile } from "./hooks/use-log-file";
import type { LogEntry } from "./types";

export function App(): React.ReactElement {
  const { entries, filename, error, loadFile, reset } = useLogFile();
  const filters = useLogFilters(entries ?? []);
  const [selectedEntry, setSelectedEntry] = useState<LogEntry | null>(null);

  return (
    <div className="flex min-h-screen flex-col bg-[#060d1a] text-white">
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-4">
        <AppHeader />
      </div>
      {entries === null ? (
        <div className="mx-auto w-full max-w-2xl px-3 sm:px-4 space-y-4 pb-12">
          <FileUpload onFile={loadFile} error={error} />
          <LogFormatCard />
        </div>
      ) : (
        <div className="w-full px-3 sm:px-4 space-y-4 pb-12">
          <FileInfoBar
            filename={filename ?? ""}
            totalEntries={entries.length}
            onReset={reset}
          />
          <LogFilters
            availableLevels={filters.availableLevels}
            availableClusterIds={filters.availableClusterIds}
            selectedLevels={filters.selectedLevels}
            selectedClusterIds={filters.selectedClusterIds}
            textSearch={filters.textSearch}
            fromDate={filters.fromDate}
            toDate={filters.toDate}
            toggleLevel={filters.toggleLevel}
            toggleClusterId={filters.toggleClusterId}
            setTextSearch={filters.setTextSearch}
            setFromDate={filters.setFromDate}
            setToDate={filters.setToDate}
          />
          <LogTable
            entries={entries}
            filteredEntries={filters.filteredEntries}
            filename={filename ?? "logs"}
            onRowClick={setSelectedEntry}
          />
        </div>
      )}

      <LogDetailDrawer
        entry={selectedEntry}
        onClose={() => setSelectedEntry(null)}
      />
    </div>
  );
}

export default App;

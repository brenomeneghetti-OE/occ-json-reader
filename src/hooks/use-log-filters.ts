import { useEffect, useMemo, useState } from "react";
import type { LogEntry } from "../types";

export interface UseLogFiltersResult {
    filteredEntries: LogEntry[];
    availableLevels: string[];
    availableClusterIds: string[];
    selectedLevels: string[];
    selectedClusterIds: string[];
    textSearch: string;
    fromDate: string;
    toDate: string;
    toggleLevel: (level: string) => void;
    toggleClusterId: (id: string) => void;
    setTextSearch: (text: string) => void;
    setFromDate: (date: string) => void;
    setToDate: (date: string) => void;
}

export function useLogFilters(entries: LogEntry[]): UseLogFiltersResult {
    const availableLevels = useMemo(() => {
        const set = new Set<string>();
        for (const e of entries) if (e.level) set.add(e.level.toLowerCase());
        return [...set].sort();
    }, [entries]);

    const availableClusterIds = useMemo(() => {
        const set = new Set<string>();
        for (const e of entries) if (e.clusterId) set.add(e.clusterId);
        return [...set].sort();
    }, [entries]);

    const [selectedLevels, setSelectedLevels] = useState<string[]>(availableLevels);
    const [selectedClusterIds, setSelectedClusterIds] = useState<string[]>(availableClusterIds);
    const [textSearch, setTextSearch] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    // Re-initialise when a new file is loaded (available options change)
    useEffect(() => {
        setSelectedLevels(availableLevels);
    }, [availableLevels]);

    useEffect(() => {
        setSelectedClusterIds(availableClusterIds);
    }, [availableClusterIds]);

    const toggleLevel = (level: string) => {
        setSelectedLevels((prev) =>
            prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level],
        );
    };

    const toggleClusterId = (id: string) => {
        setSelectedClusterIds((prev) =>
            prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
        );
    };

    const filteredEntries = useMemo(() => {
        return entries.filter((entry) => {
            // Level filter
            if (
                selectedLevels.length > 0 &&
                !selectedLevels.includes(entry.level?.toLowerCase())
            )
                return false;

            // Cluster ID filter
            if (
                selectedClusterIds.length > 0 &&
                !selectedClusterIds.includes(entry.clusterId)
            )
                return false;

            // Timeframe filter
            if (fromDate && new Date(entry.timestamp) < new Date(fromDate)) return false;
            if (toDate && new Date(entry.timestamp) > new Date(toDate)) return false;

            // Text search across all visible fields
            if (textSearch.trim()) {
                const q = textSearch.toLowerCase();
                const haystack = [
                    entry.timestamp,
                    entry.level,
                    entry.requestMethod,
                    entry.endpoint,
                    entry.clusterId,
                    entry.requestId,
                    entry.message,
                ]
                    .join(" ")
                    .toLowerCase();
                if (!haystack.includes(q)) return false;
            }

            return true;
        });
    }, [entries, selectedLevels, selectedClusterIds, fromDate, toDate, textSearch]);

    return {
        filteredEntries,
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
    };
}

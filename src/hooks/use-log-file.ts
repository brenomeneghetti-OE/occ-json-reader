import { useCallback, useState } from "react";
import type { LogEntry } from "../types";

interface UseLogFileResult {
    entries: LogEntry[] | null;
    filename: string | null;
    error: string | null;
    loadFile: (file: File) => void;
    reset: () => void;
}

const ACCEPTED_EXTENSIONS = [".log", ".txt", ".json"];

export function useLogFile(): UseLogFileResult {
    const [entries, setEntries] = useState<LogEntry[] | null>(null);
    const [filename, setFilename] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const loadFile = useCallback((file: File) => {
        const ext = `.${file.name.split(".").pop()?.toLowerCase()}`;
        if (!ACCEPTED_EXTENSIONS.includes(ext)) {
            setError(`Unsupported file type "${ext}". Accepted: .log, .txt, .json`);
            return;
        }

        setError(null);
        const reader = new FileReader();

        reader.onload = (e) => {
            const text = e.target?.result as string;
            try {
                const lines = text
                    .split("\n")
                    .map((l) => l.trim())
                    .filter((l) => l.length > 0);

                const parsed = lines.map((line, i) => {
                    try {
                        return JSON.parse(line) as LogEntry;
                    } catch {
                        throw new Error(`Invalid JSON on line ${i + 1}: ${line.slice(0, 60)}`);
                    }
                });

                setEntries(parsed);
                setFilename(file.name);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Failed to parse file",
                );
            }
        };

        reader.onerror = () => setError("Failed to read file");
        reader.readAsText(file);
    }, []);

    const reset = useCallback(() => {
        setEntries(null);
        setFilename(null);
        setError(null);
    }, []);

    return { entries, filename, error, loadFile, reset };
}

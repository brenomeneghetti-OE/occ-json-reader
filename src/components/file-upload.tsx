import { Upload } from "lucide-react";
import type React from "react";
import { useCallback, useState } from "react";

type FileUploadProps = {
    onFile: (file: File) => void;
    error: string | null;
};

const ACCEPTED = [".log", ".txt", ".json"];

export const FileUpload: React.FC<FileUploadProps> = ({ onFile, error }) => {
    const [isDragging, setIsDragging] = useState(false);
    const inputId = "log-file-input";

    const handleFile = useCallback(
        (file: File) => {
            const ext = `.${file.name.split(".").pop()?.toLowerCase()}`;
            if (!ACCEPTED.includes(ext)) return;
            onFile(file);
        },
        [onFile],
    );

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = () => setIsDragging(false);

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
        // reset so same file can be re-selected
        e.target.value = "";
    };

    return (
        <label
            htmlFor={inputId}
            className={`cursor-pointer rounded-xl border-2 border-dashed p-8 sm:p-12 text-center transition-colors duration-200 block ${isDragging
                ? "border-cyan-400 bg-cyan-500/10"
                : "border-slate-600 bg-slate-800/40 hover:bg-slate-800/60"
                }`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
        >
            <input
                id={inputId}
                type="file"
                accept=".log,.txt,.json"
                className="sr-only"
                onChange={onInputChange}
            />
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/20">
                <Upload className="h-8 w-8 text-cyan-400" />
            </div>
            <p className="mb-2 text-lg font-semibold text-white">
                Drop your log file here
            </p>
            <p className="text-sm text-slate-400">or click to browse</p>
            <p className="mt-3 text-xs text-slate-500">
                Accepted formats: .log, .txt, .json
            </p>
            {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
        </label>
    );
};

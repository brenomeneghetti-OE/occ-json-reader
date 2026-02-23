export interface LogEntry {
    clusterId: string;
    endpoint: string;
    level: string;
    message: string;
    requestId: string;
    requestMethod: string;
    timestamp: string;
}

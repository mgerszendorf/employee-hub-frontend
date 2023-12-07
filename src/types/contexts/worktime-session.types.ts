export interface WorktimeSessionContextHandler {
    handleWorktimeSession: (e: string) => Promise<void>;
    setIsStartSessionActive: (value: boolean) => void;
    setIsFinishSessionActive: (value: boolean) => void;
    isStartSessionActive: boolean;
    isFinishSessionActive: boolean;
}

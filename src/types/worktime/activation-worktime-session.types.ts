export interface WorktimeSessionResponse {
    state: string;
    sessionInfo: SessionInfo;
};

export interface SessionInfo {
    description: string
}

export interface WorktimeSessionPayload {
    description: string
};

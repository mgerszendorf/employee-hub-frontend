export type WorktimeSessionResponse = {
    state: string;
    sessionInfo: SessionInfo;
};

export type SessionInfo = {
    description: string
}

export type WorktimeSessionPayload = {
    description: string
};

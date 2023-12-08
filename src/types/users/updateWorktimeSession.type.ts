export interface UpdateWorktimeSessionPayload {
    id: string;
    description: string;
    start: string;
    end: string;
}

export interface UpdateWorktimeSessionResponse {
    description: string;
}
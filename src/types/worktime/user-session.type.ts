export interface UserSessionResponse {
    $values: [SessionData] | null;
};

export interface SessionData {
    description: string,
    id: string,
    start: string,
    end: string,
    employeeId: string
}

export interface UserSessionPayload {
    id: string
};

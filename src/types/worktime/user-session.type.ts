export type UserSessionResponse = {
    $values: [SessionData] | null;
};

export type SessionData = {
    description: string,
    id: string,
    start: string,
    end: string,
    employeeId: string
}

export type UserSessionPayload = {
    id: string
};

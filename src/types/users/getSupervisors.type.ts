export interface GetSupervisors {
    $values: Supervisor[];
}

export interface Supervisor {
    firstName: string;
    id: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    active: boolean;
}
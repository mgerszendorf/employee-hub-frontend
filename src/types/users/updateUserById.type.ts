type UUID = string;

export interface UpdateUserByIdPayload {
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

export interface UpdateUserByIdResponse {
    $values: RootObject;
}

interface User {
    id: string;
    userName: string;
    normalizedUserName: string;
    email: string;
    normalizedEmail: string;
    emailConfirmed: boolean;
    passwordHash: string;
    securityStamp: string;
    concurrencyStamp: string;
    phoneNumber: string;
    phoneNumberConfirmed: boolean;
    twoFactorEnabled: boolean;
    lockoutEnd: string; // ISO date string
    lockoutEnabled: boolean;
    accessFailedCount: number;
    employeeAccount: string;
    active: boolean;
    firstName: string;
    lastName: string;
}

interface WorktimeSession {
    id: UUID;
    start: string; // ISO date string
    end: string; // ISO date string
    employeeId: UUID;
    description: string;
}

interface Employee {
    id: UUID;
    supervisor: string;
    supervisorId: UUID;
    employees: string[];
    department: number;
    user: User;
    userId: string;
    worktimeSessions: WorktimeSession[];
}

interface Supervisor extends Employee {
    // Inherits from Employee
}

interface EmployeeAccount {
    id: UUID;
    supervisor: Supervisor;
    employees: Employee[];
    department: number;
    user: User;
}

interface RootObject {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    employeeAccountId: UUID;
    employeeAccount: EmployeeAccount;
    active: boolean;
    roles: string[];
}

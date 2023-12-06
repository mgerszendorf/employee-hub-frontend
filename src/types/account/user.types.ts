export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  employeeAccountId: string;
  employeeAccount: {
    id: string;
    supervisor: {
      id: string;
      supervisor: string;
      employees: [
        string
      ],
      department: number;
      user: {
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
        lockoutEnd: Date;
        lockoutEnabled: boolean;
        accessFailedCount: number;
        employeeAccount: string;
        active: boolean;
        firstName: string;
        lastName: string;
      },
      userId: string;
      worktimeSessions: [
        {
          id: string;
          start: Date;
          end: Date;
          employeeId: string;
        }
      ]
    },
    employees: [
      {
        id: string;
        supervisor: string;
        employees: [
          string
        ],
        department: number;
        user: {
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
          lockoutEnd: Date;
          lockoutEnabled: boolean;
          accessFailedCount: number;
          employeeAccount: string;
          active: boolean;
          firstName: string;
          lastName: string;
        },
        userId: string;
        worktimeSessions: [
          {
            id: string;
            start: Date;
            end: Date;
            employeeId: string;
          }
        ]
      }
    ],
    department: number;
  },
  active: boolean;
  roles: {
    $values: [string]
  }
}

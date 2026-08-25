export declare enum RegistrationRole {
    PLAYER = "PLAYER",
    ACADEMY = "ACADEMY",
    SCOUT = "SCOUT",
    COACH = "COACH"
}
export declare class RegisterDto {
    email: string;
    password: string;
    role: RegistrationRole;
}

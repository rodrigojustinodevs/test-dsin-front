export interface IAuthContext {
    signIn: (email: string, password: string) => Promise<void>;
    signed: boolean;
    token: string;
    signOut: () => void;
    hasPermissions: (value: string) => boolean;
    permissions: [];
}

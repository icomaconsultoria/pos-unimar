export interface AuthService {
    createUser(
        email: string,
        password?: string,
        displayName?: string,
        uid?: string
    ): Promise<{ uid: string }>
}
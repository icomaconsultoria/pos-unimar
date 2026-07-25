export interface AuthService {
    createUser(
        email: string,
        password?: string,
        displayName?: string,
        uid?: string,
        photoUrl?:string
    ): Promise<{ uid: string }>
}
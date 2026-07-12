export interface CreateUserDTO {
    id: string
    email: string
    password?: string
    displayName: string
    githubUsername?: string
}
export interface GitHubProfileProvdier {
    getAvatarUrl(username: string): Promise<string | null>
}
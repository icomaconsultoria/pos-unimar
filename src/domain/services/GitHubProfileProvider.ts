export interface GitHubProfileProvider {
    getAvatarUrl(username: string): Promise<string | null>
}
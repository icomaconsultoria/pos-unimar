export interface GithubService {
    getAvatar(username: string): Promise<string>
}
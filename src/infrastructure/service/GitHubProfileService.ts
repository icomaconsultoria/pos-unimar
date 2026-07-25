import { GitHubProfileProvider } from "../../domain/services/GitHubProfileProvider"

export class GitHubProfileService implements GitHubProfileProvider {
    private readonly baseUrl = "https://api.github.com/users"

    async getAvatarUrl(username: string): Promise<string | null> {
        const response = await fetch(`${this.baseUrl}/${username}`, {
            headers: { "User-Agent": "pos-unimar-app" }
        })


        if (response.status === 404) {
            throw new Error("GitHub username not found")
        }
        // if (response.status === 404) {
        //     return { message: "GitHub username not found" } as any
        // }

        if (!response.ok) {
            throw new Error("Failed to fetch GitHub profile")
        }
        // if (!response.ok) {
        //     return { message: "Failed to fetch GitHub profile" } as any
        // }

        const data = await response.json()
        return data.avatar_url ?? null
    }
}
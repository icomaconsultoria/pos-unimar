import { GithubService } from "../../domain/services/GithubService";

export class GithubApiService implements GithubService {
    async getAvatar(username: string): Promise<string> {

        const response = await fetch(`https://api.github.com/users/${username}`);

        if (!response.ok)
            throw new Error("User not found.");

        const data = await response.json();

        return data.avatar_url;
    }
}
// src/domain/services/IGithubAvatarService.ts

export interface IGithubAvatarService {
    getAvatarUrl(githubUsername: string): Promise<string>;
}
import { IGithubAvatarService } from "../../domain/services/IGithubAvatarService";

export class GithubAvatarServiceImpl implements IGithubAvatarService {
    
    async getAvatarUrl(githubUsername: string): Promise<string> {
        try {
            // Adicionamos o "User-Agent" para o GitHub não bloquear a requisição
            const response = await fetch(`https://api.github.com/users/${githubUsername}`, {
                headers: {
                    "User-Agent": "Minha-API-Node-Pos-Unimar"
                }
            });
            
            if (!response.ok) {
                console.warn(`Usuário do GitHub '${githubUsername}' não encontrado.`);
                return ""; 
            }

            const data = await response.json();
            return data.avatar_url; 

        } catch (error) {
            console.error("Erro na comunicação com o GitHub", error);
            return "";
        }
    }
}
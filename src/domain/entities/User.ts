export class User {
    constructor(
        public readonly id: string,
        public email: string,
        public displayName: string,
        public createdAt: Date,
        public avatarUrl: string = ""
    ) { }

    public updateDisplayName(name: string) {
        this.displayName = name
    }
}
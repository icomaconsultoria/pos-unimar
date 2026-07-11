"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    id;
    email;
    displayName;
    createdAt;
    constructor(id, email, displayName, createdAt) {
        this.id = id;
        this.email = email;
        this.displayName = displayName;
        this.createdAt = createdAt;
    }
    updateDisplayName(name) {
        this.displayName = name;
    }
}
exports.User = User;

// types/user.ts
export interface AdminUser {
    uid: string;
    email: string;
    displayName?: string;
    role: 'admin';
    createdAt: Date;
}
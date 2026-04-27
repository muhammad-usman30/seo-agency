export interface Project {
    id: string;
    title: string;
    slug: string;
    category: string;
    excerpt: string;
    content: string;
    imageUrl: string;
    tags: string[];
    order: number;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
}
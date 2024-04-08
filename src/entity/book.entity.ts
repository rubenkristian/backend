import { Tag } from "./tag.entity";

export interface Book {
    id: number;
    title: string;
    writer: string;
    cover_image: string;
    points: number;
    tags: Tag[];
}
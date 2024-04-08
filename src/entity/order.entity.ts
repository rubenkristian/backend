export interface Order {
    id: number;
    user_id: number;
    book_id: number;
    created_at: Date;
    cancelled: boolean;
    cancelled_at: Date;
}
export interface customerObject {
    id: number | undefined;
    name: string;
}

export interface productObject {
    id: number | undefined;
    name: string;
    default_price: string;
    quantity_in_stock: string;
}

export interface databaseResponse {
    results: String;
}

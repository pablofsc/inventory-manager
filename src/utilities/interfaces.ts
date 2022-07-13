export interface customerObject {
    id: string;
    date: any;
    parsedDate?: string;
    name: string;
}

export interface productObject {
    id: string;
    name: string;
    default_price: string;
    quantity_in_stock: string;
}

export interface databaseResponse {
    results: String;
}

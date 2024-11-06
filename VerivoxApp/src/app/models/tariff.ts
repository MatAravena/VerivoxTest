export interface Tariff {
    id: number;
    name: string;
    price: number;
    supplier: string;
    description: string;
    selected?: boolean;
}

export interface CategoryData {
    name?: string;
    description?: string;
    image?: string;
    slug?: string;
    id?: number;
}

export interface Category {
    data: CategoryData;
    id: number;
    children?: Category[];
}

export interface PriceDataSet {
    currency?: string;
    excl_tax?: string;
    incl_tax?: string;
    tax?: string;
    id?: number;
}

export interface ProdutStockrecordsResults {
    id?: number;
    partner_sku?: string;
    price_currency?: string;
    price_excl_tax?: string;
    price_retail?: any;
    cost_price?: any;
    num_in_stock?: number;
    num_allocated?: any;
    low_stock_threshold?: any;
    date_created?: string;
    date_updated?: string;
    product?: number;
    partner?: number;
}

export interface ProdutStockrecords {
    count?: number;
    next?: any;
    previous?: any;
    results?: ProdutStockrecordsResults[];
}

export interface ProductAvailability {
    is_available_to_buy?: boolean;
    num_available?: number;
    message?: string;
}

export interface ProductImage {
    id?: number;
    original?: string;
    small_thumb?: string;
    large_thumb?: string;
    caption?: string;
    display_order?: number;
    date_created?: string;
    product: number;
}

export interface Product {
    url?: string;
    upc?: string;
    id?: number;
    title?: string;
    description?: string;
    structure?: string;
    slug?: string;
    date_created?: string;
    date_updated?: string;
    recommended_products?: any;
    attributes?: any;
    categories?: any;
    category_list?: any;
    product_class?: string;
    stockrecords?: any;
    image?: any;
    images?: ProductImage[];
    price?: any;
    availability?: any;
    options?: any;
    children?: any;
    price_data?: PriceDataSet;
    availability_data?: ProductAvailability;
    stockrecords_data?: ProdutStockrecords;
    rating?: number;
}

export const NOT_DOWLOADED = 0;
export const SUCCESS_DOWNLOADED = 1;
export const DOWNLOADING_IN_PROGRESS = 2;
export const FAIL_DOWNLOAD = 3;

export const EMPTY_PRODUCT: Product = {};


export interface ProductListResponse {
    count: number;
    next: string;
    previous: string;
    results: Product[];
}

export interface Item {
  loading: boolean;
  loaded: boolean;
  next: string;
  count: number;
  ts: number;
  list: number[];
}

export interface ImageArray {
    image: string;
    thumbImage: string;
  }

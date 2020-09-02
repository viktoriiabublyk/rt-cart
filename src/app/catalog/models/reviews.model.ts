
export interface ReviewsList {
  count: number;
  next: string;
  previous: string;
  results: Review[];
}
export interface Review {
  id?: number;
  product: number;
  score: number;
  title: string;
  body: string;
  user?: number;
  username?: string;
  name?: string;
  email?: string;
  homepage?: string;
  status: number;
  total_votes: number;
  delta_votes: number;
  date_created?: string;
}

export interface Item {
  loading: boolean;
  loaded: boolean;
  next: string;
  ts: number;
  list: number[];
}

export interface PokeResponse {
  count: number;
  next: string;
  previous?: any;
  results: Results[];
}

export interface Results {
  name: string;
  url: string;
}

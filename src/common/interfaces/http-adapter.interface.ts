export interface HttpAdapter{

  get<T = any>(url: string ): Promise<T>;
  
}

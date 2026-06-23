
import { GetProductsQuery } from '../../../types/api'
import { Product } from '../../../types/product'

export const getProducts = async (query: GetProductsQuery) => {
    const params = new URLSearchParams();
  
    if (query.category) {
      params.set("category", query.category);
    }
  
    if (query.cursor) {
      params.set("cursor", query.cursor);
    }
  
    const res = await fetch(
      `http://localhost:3001/products?${params.toString()}`
    );
  
    return await res.json();
  };
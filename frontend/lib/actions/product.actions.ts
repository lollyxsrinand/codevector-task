import { GetProductsQuery } from "../../types/api"

export const getProducts = async (query: GetProductsQuery) => {
    const params = new URLSearchParams();
  
    if (query.category) {
      params.set("category", query.category);
    }
  
    if (query.cursor) {
      params.set("cursor", query.cursor);
    }
  
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products?${params.toString()}`
    );
  
    return await res.json();
  };
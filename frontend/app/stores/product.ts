import { create } from "zustand";
import { Product } from "../../types/product";

type CachedPage = {
  products: Product[];
  nextCursor: string | null;
};

type ProductsStore = {
  cache: Map<string, Map<number, CachedPage>>;

  setPage: (
    category: string,
    page: number,
    data: CachedPage
  ) => void;
};

export const useProductsStore = create<ProductsStore>((set) => ({
  cache: new Map(),

  setPage: (category, page, data) =>
    set((state) => {
      const cache = new Map(state.cache);

      const categoryCache = new Map(cache.get(category) ?? []);

      categoryCache.set(page, data);

      cache.set(category, categoryCache);

      return { cache };
    }),
}));
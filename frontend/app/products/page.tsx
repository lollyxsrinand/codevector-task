import { Suspense } from "react";
import ProductsPageClient from "./ProductPageClient";

export default function Page() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <ProductsPageClient />
    </Suspense>
  );
}
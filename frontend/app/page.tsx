'use client'
import { getProducts } from "@/lib/actions/product.actions";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState(null)
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts()
      setProducts(products)
    }
    fetchProducts()
  }, [])
  return (
    <div> 
      <button onClick={() => console.log(products)}>yes</button>
    </div>
  );
}

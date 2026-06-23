'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { useProductsStore } from '../stores/product'
import { getProducts } from '@/lib/actions/product.actions'

const CATEGORIES = [
  '',
  "Electronics",
  "Books",
  "Clothing",
  "Home",
  "Sports",
  "Beauty",
]

const ProductPageClient = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const { cache, setPage } = useProductsStore()

  const category = searchParams.get('category') ?? ''
  const page = Number(searchParams.get('page') ?? '1')

  const cached = cache.get(category)?.get(page)

  useEffect(() => {
    if (cached) return

    const load = async () => {
      // Page 1 is easy
      if (page === 1) {
        const data = await getProducts({ category })
    
        setPage(category, 1, data)
        return
      }
    
      let cursor: string | undefined
    
      // Walk from page 1 to the desired page
      for (let currentPage = 1; currentPage <= page; currentPage++) {
        const existing = cache.get(category)?.get(currentPage)
    
        if (existing) {
          cursor = existing.nextCursor ?? undefined
          continue
        }
    
        const data = await getProducts({
          category,
          cursor,
        })
    
        setPage(category, currentPage, data)
    
        cursor = data.nextCursor ?? undefined
      }
    }

    load()
  }, [cached, page, category, cache, setPage])

  const changePage = (newPage: number) => {
    const params = new URLSearchParams()

    if (category) {
      params.set('category', category)
    }

    params.set('page', String(newPage))

    router.push(`/products?${params.toString()}`)
  }

  const changeCategory = (newCategory: string) => {
    const params = new URLSearchParams()

    if (newCategory) {
      params.set('category', newCategory)
    }

    // always reset to page 1
    params.set('page', '1')

    router.push(`/products?${params.toString()}`)
  }

  if (!cached) {
    return <div>Loading...</div>
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Products
        </h1>

        <select
          value={category}
          onChange={(e) => changeCategory(e.target.value)}
          className="rounded border px-3 py-2"
        >
          <option value="">All Categories</option>

          {CATEGORIES.filter(Boolean).map((cat) => (
            <option
              key={cat}
              value={cat}
            >
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        {cached.products.map((product) => (
          <div
            key={product.id}
            className="rounded border p-4"
          >
            <h2 className="font-semibold">
              {product.name}
            </h2>

            <div className="text-sm text-gray-500">
              {product.category}
            </div>

            <div>${product.price}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button
          disabled={page === 1}
          onClick={() => changePage(page - 1)}
          className="rounded border px-4 py-2 disabled:opacity-50"
        >
          ← Previous
        </button>

        <span>
          Page {page}
        </span>

        <button
          disabled={!cached.nextCursor}
          onClick={() => changePage(page + 1)}
          className="rounded border px-4 py-2 disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </div>
  )
}

export default ProductPageClient
import { supabase } from "../lib/supabase"
import { Product } from "../types/product"

export const getProducts = async ({ limit, category, cursor }: { limit: number, category?: string, cursor?: string }) => {
	let query = supabase
		.from("products")
		.select("*")

	// we're filtering by cateogry incase we want to
	if (category) {
		query = query.eq("category", category)
	}

	if (cursor) {
		const decodedCursor = decodeURIComponent(cursor)
		const [updated_at, id] = decodedCursor.split("_")
		query = query.or(
			`updated_at.lt.${updated_at},and(updated_at.eq.${updated_at},id.lt.${id})`
		  )
	}

	query = query
		.order("updated_at", { ascending: false })
		.order("id", { ascending: false })
		.limit(limit + 1)
	console.log(limit)
	
	const { data, error } = await query

	if (error) {
		throw new Error(error.message)
	}
	const products = data as Product[]

	let nextCursor: string | null = null
	if (products.length > limit) {
		products.pop()
		nextCursor = encodeURIComponent(
			`${products[products.length - 1].updated_at}_${products[products.length - 1].id}`
		)

	}
	
	console.log(products.length)
	return { products, nextCursor}
}
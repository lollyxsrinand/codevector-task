type Cursor = {
    updated_at: string
    id: string
  }
export interface GetProductsQuery {
    limit?: number
    category?: string
    cursor?: string
}
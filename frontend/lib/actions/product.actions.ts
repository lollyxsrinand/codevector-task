
export const getProducts = async () => {
    const res = await fetch('http://localhost:3001/products')

    const products = await res.json()

    return products
}
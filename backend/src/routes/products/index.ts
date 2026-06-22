import type { FastifyInstance } from "fastify";
import { getProductsHandler } from "./handlers";

const productRoutes = async (fastify: FastifyInstance) => {
    fastify.get('/products',  getProductsHandler)
}

export default productRoutes;
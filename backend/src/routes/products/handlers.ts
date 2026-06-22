import type { FastifyReply, FastifyRequest } from "fastify";
import { getProducts } from "src/services/product-service";
import { GetProductsQuery } from "../../../../types/api"

export const getProductsHandler = async (request: FastifyRequest<{ Querystring: GetProductsQuery }>, reply: FastifyReply) => {
    const { category, cursor } = request.query
    const limit = Number(request.query.limit ?? 10)

    const { products, nextCursor } = await getProducts({
        limit,
        category,
        cursor
      })
    return reply.status(200).send({products, nextCursor})
}
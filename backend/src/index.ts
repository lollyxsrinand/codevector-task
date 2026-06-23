import Fastify from 'fastify'
import cors from '@fastify/cors'
// import cookie from '@fastify/cookie'

// import authRoutes from './routes/auth'
// import accountRoutes from './routes/accounts';
// import budgetRoutes from './routes/budget';
// import transactionRoutes from './routes/transactions';
// import idkRoutes from './routes/idk';
// import categoryRoutes from './routes/category';
import productRoutes from './routes/products';

const app = Fastify({ logger: false })

const registerCors = async () => {
  await app.register(cors, {
    origin: ['http://localhost:3000', 'http://localhost:3001', 'https://codevector-task-lime.vercel.app/'],
    credentials: true,
  });
}
registerCors()

app.register(productRoutes)
// app.register(cookie)

// app.register(authRoutes)
// app.register(accountRoutes)
// app.register(budgetRoutes)
// app.register(idkRoutes)
// app.register(transactionRoutes)
// app.register(categoryRoutes)

app.get('/ping', async (request, reply) => {
  return reply.status(200).send({ message: 'ponggg' })
})

const start = async () => {
  try {
    await app.listen({ port: parseInt(process.env.PORT || '3001'), host: '0.0.0.0' })
    console.log('running on http://localhost:3001')
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start()

const express = require('express')
const graphQLHTTP = require('express-graphql')
const next = require('next')
const schema = require('./data/schema')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const api = require('./api')

app.prepare()
	.then(() => {
		const server = express()

		server.use('/api', api)
		server.use(graphQLHTTP({
			schema,
			graphiql: true,
		}))

		server.get('*', (req, res) => {
			return handle(req, res)
		})

		server.listen(3000, (err) => {
			if (err) throw err
			console.log('> Ready on http://localhost:3000')
		})
	})
	.catch((ex) => {
		console.error(ex.stack)
		process.exit(1)
	})
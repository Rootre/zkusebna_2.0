const express = require('express')
const next = require('next')

const Database = require('./components/Database')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
	.then(() => {
		const server = express()
		const router = express.Router()

		router.get('/:action', (req, res) => {
			let { action } = req.params

			if (!action) {
				return false
			}

			Database.connect('localhost', 'root', '', 'zkusebna_2.0')

			Database.get('SELECT * FROM item', (rows, fields) => {
				res.json(JSON.stringify(rows))

				Database.end()
			})
		})

		server.use('/api', router)

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
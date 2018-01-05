const express = require('express')

const Database = require('./components/Database')
const router = express.Router()

const db_auth = ['localhost', 'root', '', 'zkusebna_2.0']

router.route('/items')
	.get((req, res) => {
		Database.connect(...db_auth)

		Database.get(`SELECT * FROM item`, (rows, fields) => {
			res.json(JSON.stringify(rows))

			Database.end()
		})
	})
router.route('/items/:item_id')
	.get((req, res) => {
		let {item_id} = req.params

		if (!item_id) {
			return false
		}

		Database.connect(...db_auth)

		Database.get(`SELECT * FROM item WHERE id=${parseInt(item_id)}`, (rows, fields) => {
			res.json(JSON.stringify(rows))

			Database.end()
		})
	})

module.exports = router
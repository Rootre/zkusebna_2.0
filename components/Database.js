const mysql = require('mysql')

let connection_pool

const connect = (host, user, password, database) => {
	connection_pool = mysql.createPool({
		connectionLimit: 100,
		debug: false,
		host: host,//     : 'localhost',
		user: user,//     : 'root',
		password: password,// : '',
		database: database,// : 'zkusebna_2.0'
	});
}
const end = () => {
	connection_pool && connection_pool.end()
}

const get = (query, callback) => {
	connection_pool.getConnection((err, connection) => {
		if (err) {
			connection && connection.release()
			return console.log("Error in connection database")
		}

		try {
			connection.query(query, (err, rows, fields) => {
				connection.release()

				if (err) {
					throw err
					return false
				}
				if (typeof callback === 'function') {
					callback.call(null, rows, fields)
				}
			})
		}
		catch(err) {
			console.error('query error', err);
		}
	})
}

module.exports = {
	connect: connect,
	end: end,
	get: get
}
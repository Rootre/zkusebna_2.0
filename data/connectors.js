import Sequelize from 'sequelize'

const db = new Sequelize('zkusebna_2.0', 'root', '', {
	dialect: 'mysql',
})

const ReservationModel = db.define('reservation', {
	id: { type: Sequelize.INTEGER, primaryKey: true },
	approved: { type: Sequelize.BOOLEAN},
	archived: { type: Sequelize.BOOLEAN},
	since: { type: Sequelize.DATE},
	until: { type: Sequelize.DATE},
	price: { type: Sequelize.INTEGER},
	name: { type: Sequelize.STRING},
});

const ReservationItemModel = db.define('reservation_item', {
	id: { type: Sequelize.INTEGER, primaryKey: true }
})

const ItemModel = db.define('item', {
	id: { type: Sequelize.INTEGER, primaryKey: true },
	name: { type: Sequelize.STRING },
	price: { type: Sequelize.INTEGER },
	active: { type: Sequelize.BOOLEAN },
})

ReservationModel.belongsToMany(ItemModel, {through: ReservationItemModel})
ItemModel.belongsToMany(ReservationModel, {through: ReservationItemModel})


const Reservation = db.models.reservation;
const ReservationItem = db.models.reservation_item;
const Item = db.models.item;

export { Reservation, ReservationItem, Item };
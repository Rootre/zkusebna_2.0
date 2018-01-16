import Sequelize from 'sequelize'

const db = new Sequelize('zkusebna_2_0', 'root', '', {
	dialect: 'mysql',
})

const ReservationModel = db.define('reservation', {
	approved: { type: Sequelize.BOOLEAN},
	archived: { type: Sequelize.BOOLEAN},
	since: { type: Sequelize.DATE},
	until: { type: Sequelize.DATE},
	price: { type: Sequelize.INTEGER},
	name: { type: Sequelize.STRING},
	repeated: { type: Sequelize.INTEGER},
}, {
	freezeTableName: true,
	//tableName: 'reservation',
	underscored: true,
});

const ReservationItemModel = db.define('reservation_item', {
	id: { type: Sequelize.INTEGER, primaryKey: true },
}, {
	freezeTableName: true,
	timestamps: false,
	underscored: true,
})

const ItemModel = db.define('item', {
	name: { type: Sequelize.STRING },
	price: { type: Sequelize.INTEGER },
	active: { type: Sequelize.BOOLEAN },
}, {
	freezeTableName: true,
	underscored: true,
})

const DiscountModel = db.define('discount', {
	name: { type: Sequelize.STRING },
	value: { type: Sequelize.FLOAT },
}, {
	freezeTableName: true,
	underscored: true,
})


ReservationModel.belongsToMany(ItemModel, {through: ReservationItemModel, foreignKey: 'reservation_id'})
ItemModel.belongsToMany(ReservationModel, {through: ReservationItemModel, foreignKey: 'item_id'})
DiscountModel.hasMany(ReservationModel)
ReservationModel.belongsTo(DiscountModel, {foreignKey: 'discount_id'})


const Reservation = db.models.reservation;
const ReservationItem = db.models.reservation_item;
const Item = db.models.item;
const Discount = db.models.discount;

export { Discount, Reservation, ReservationItem, Item };
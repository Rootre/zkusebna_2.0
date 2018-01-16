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

const UserModel = db.define('user', {
	name: { type: Sequelize.STRING },
	phone: { type: Sequelize.STRING },
	email: { type: Sequelize.STRING },
}, {
	freezeTableName: true,
	timestamps: false,
	underscored: true,
})

const AdminModel = db.define('admin', {
	password: { type: Sequelize.STRING },
	hash: { type: Sequelize.STRING },
}, {
	freezeTableName: true,
	timestamps: false,
	underscored: true,
})

const CategoryModel = db.define('category', {
	name: { type: Sequelize.STRING },
}, {
	freezeTableName: true,
	timestamps: false,
	underscored: true,
})

const ActionModel = db.define('action', {
	description: { type: Sequelize.STRING },
}, {
	freezeTableName: true,
	underscored: true,
})

const ImageModel = db.define('image', {
	main: { type: Sequelize.STRING },
	thumb: { type: Sequelize.STRING },
	description: { type: Sequelize.STRING },
}, {
	freezeTableName: true,
	timestamps: false,
	underscored: true,
})


ReservationModel.belongsToMany(ItemModel, {through: ReservationItemModel, foreignKey: 'reservation_id'})
ItemModel.belongsToMany(ReservationModel, {through: ReservationItemModel, foreignKey: 'item_id'})
ReservationItemModel.belongsTo(ReservationModel)
ReservationItemModel.belongsTo(ItemModel)
DiscountModel.hasMany(ReservationModel)
ReservationModel.belongsTo(DiscountModel, {foreignKey: 'discount_id'})
UserModel.hasMany(ReservationModel)
ReservationModel.belongsTo(UserModel, {foreignKey: 'user_id'})
AdminModel.hasMany(UserModel)
UserModel.belongsTo(AdminModel, {foreignKey: 'admin_id'})
CategoryModel.hasMany(ItemModel)
CategoryModel.belongsTo(CategoryModel, {foreignKey: 'category_id'})
CategoryModel.hasMany(CategoryModel)
ItemModel.belongsTo(CategoryModel, {foreignKey: 'category_id'})
UserModel.hasMany(ActionModel)
ActionModel.belongsTo(UserModel, {foreignKey: 'user_id'})
ImageModel.hasMany(ItemModel)
ItemModel.belongsTo(ImageModel, {foreignKey: 'image_id'})


const Reservation = db.models.reservation;
const ReservationItem = db.models.reservation_item;
const Item = db.models.item;
const Discount = db.models.discount;
const User = db.models.user;
const Admin = db.models.admin;
const Category = db.models.category;
const Action = db.models.action;
const Image = db.models.image;

export { Discount, Reservation, ReservationItem, Item, User, Admin, Category, Action, Image };
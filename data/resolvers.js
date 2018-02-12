import {Discount, Reservation, ReservationItem, Item, User, Admin, Category, Action, Image} from './connectors'

const resolvers = {
	Query: {
		allItems() {
			return Item.findAll()
		},
		allCategories() {
			return Category.findAll()
		},
		allReservation() {
			return Reservation.findAll()
		},
		action(_, args) {
			return Action.findById(args.id)
		},
		category(_, args) {
			return Category.findById(args.id)
		},
		item(_, args) {
			return Item.findById(args.id)
		},
		reservation(_, args) {
			return Reservation.find({ where: args })
		},
		user(_, args) {
			return User.findById(args.id)
		},
	},
	Mutation: {
		updateItemName(_, args) {
			const {id, name} = args
			return Item.update({ name }, { where: { id }})
		},
		updateItemPrice(_, args) {
			const {id, price} = args
			return Item.update({ price }, { where: { id }})
		},
	},

	Action: {
		user(action) {
			return User.findById(action.user_id)
		}
	},
	Category: {
		children(category) {
			return Category.findAll({ where: { category_id: category.id } })
		},
		items(category) {
			return Item.findAll({ where: { category_id: category.id } })
		},
		parent(category) {
			return Category.findById(category.category_id)
		}
	},
	Item: {
		category(item) {
			return Category.findById(item.category_id)
		},
		image(item) {
			return Image.findById(item.image_id)
		}
	},
	Reservation: {
		discount(reservation) {
			return Discount.find({ where: { id: reservation.discount_id } })
		},
		user(reservation) {
			return User.find({ where: { id: reservation.user_id } })
		},
		reservationItems(reservation) {
			return ReservationItem.findAll({
				where: { reservation_id: reservation.id },
				include: [Reservation, Item],
			})
		},
	},
	ReservationItem: {
		item(reservation_item) {
			return reservation_item.item
		},
		reservation(reservation_item) {
			return reservation_item.reservation
		}
	},
	User: {
		actions(user) {
			return Action.findAll({ where: { user_id: user.id } })
		},
		admin(user) {
			return Admin.findById(user.admin_id)
		},
		reservations(user) {
			return Reservation.findAll({ where: { user_id: user.id } })
		},
	},
};

export default resolvers;
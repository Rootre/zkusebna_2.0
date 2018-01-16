import {Discount, Reservation, ReservationItem, Item, User, Admin, Category, Action, Image} from './connectors';

const resolvers = {
	Query: {
		reservation(_, args) {
			return Reservation.find({ where: args });
		},
		allReservation(_, args) {
			return Reservation.findAll();
		},
		user(_, args) {
			return User.findById(args.id);
		},
		category(_, args) {
			return Category.findById(args.id);
		},
		item(_, args) {
			return Item.findById(args.id);
		},
		action(_, args) {
			return Action.findById(args.id);
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
			//return Item.find({ where: { id: reservation_item.item_id } })
		},
		reservation(reservation_item) {
			return reservation_item.reservation
			//return Reservation.find({ where: { id: reservation_item.reservation_id } })
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
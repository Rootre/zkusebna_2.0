import { Discount, Reservation, ReservationItem, Item } from './connectors';

const resolvers = {
	Query: {
		reservation(_, args) {
			return Reservation.find({ where: args,/* include: [ReservationItem, Item] */});
		},
		allReservation(_, args) {
			return Reservation.findAll();
		}
	},
	Reservation: {
		discount(reservation) {
			return Discount.find({ where: { id: reservation.discount_id } })
		},
		reservationItems(reservation) {
			return ReservationItem.findAll({ where: { reservation_id: reservation.id } })
		},
	},
	ReservationItem: {
		item(reservation_item) {
			return Item.find({ where: { id: reservation_item.item_id } })
		},
		reservation(reservation_item) {
			return Reservation.find({ where: { id: reservation_item.reservation_id } })
		}
	},
	Item: {

	}
};

export default resolvers;
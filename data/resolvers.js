import { Reservation, ReservationItem, Item } from './connectors';

const resolvers = {
	Query: {
		reservation(_, args) {
			return Reservation.find({ where: args });
		},
		allReservation(_, args) {
			return Reservation.findAll();
		}
	},
	Reservation: {
		reservationItems(reservation) {
		},
	},
	ReservationItem: {
		item(item) {
		}
	}
};

export default resolvers;
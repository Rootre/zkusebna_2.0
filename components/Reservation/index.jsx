import {Component} from 'react';
import {inject, observer} from 'mobx-react';

import ReservationItem from '../ReservationItem';

import {getPriceWithDiscount} from '../../helpers/reservation';

import styles from './styles.scss';

@inject('discountStore', 'reservationStore', 'userStore')
@observer
class Reservation extends Component {
    get priceSummary() {
        const {discountStore, reservationStore} = this.props;

        const priceSummary = reservationStore.reservationItems.reduce((accumulator, item) => accumulator + item.price, 0);

        return getPriceWithDiscount(priceSummary, discountStore.currentDiscount.value)
    }

    createReservation = () => {
        const {
            discountStore: {currentDiscount: {id: discountId}},
            reservationStore: {reservation: {
                name: reservationName,
            }, reservationItems},
            userStore: {
                name,
                email,
                phone,
            },
        } = this.props;
        console.log('discount_id:', discountId);
        console.log('user:', name, email, phone);
        console.log('reservation:', reservationName, reservationItems);
    };

    handleDeleteClick = () => {
        const {reservationStore} = this.props;

        reservationStore.deleteAllReservationItems();
    };

    render() {
        const {reservationStore} = this.props;

        if (!reservationStore.hasReservationItems) {
            return null;
        }

        return (
            <div className={styles.wrapper}>
                {reservationStore.reservationItems.map(item => (
                    <ReservationItem key={item.id} item={item}/>
                ))}

                <p className={styles.summary}>
                    <span>Celkem</span>
                    <span>
                        <strong>{this.priceSummary},-</strong>
                        <span className={styles.delete} onClick={this.handleDeleteClick}>&times;</span>
                    </span>
                </p>
                <button onClick={this.createReservation}>Rezervovat</button>
            </div>
        )
    }
}

export default Reservation;
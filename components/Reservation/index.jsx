import {Component} from 'react';
import {inject, observer} from 'mobx-react';

import ReservationItem from '../ReservationItem';

import {getPriceWithDiscount} from '../../helpers/reservation';

import styles from './styles.scss';

@inject('discountStore', 'reservationStore')
@observer
class Reservation extends Component {
    get priceSummary() {
        const {discountStore, reservationStore} = this.props;

        const priceSummary = reservationStore.reservationItems.reduce((accumulator, item) => accumulator + item.price, 0);

        return getPriceWithDiscount(priceSummary, discountStore.currentDiscount.value)
    }

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
            </div>
        )
    }
}

export default Reservation;
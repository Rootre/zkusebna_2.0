import {Component} from 'react';
import {inject, observer} from 'mobx-react';

import ReservationItem from '../ReservationItem';

import {getPriceWithDiscount} from '../../helpers/reservation';

import Cart from 'Svg/cart.svg';

import styles from './styles.scss';

@inject('discountStore', 'reservationStore', 'userStore', 'visualStore')
@observer
class Reservation extends Component {
    get priceSummary() {
        const {discountStore, reservationStore} = this.props;

        const priceSummary = reservationStore.reservationItems.reduce((accumulator, item) => accumulator + item.price, 0);

        return getPriceWithDiscount(priceSummary, discountStore.currentDiscount.value)
    }

    handleCartClick = () => {
        const {visualStore} = this.props;

        visualStore.setReservationExpanded(!visualStore.reservation_expanded);
    };

    handleDeleteClick = () => {
        const {reservationStore} = this.props;

        reservationStore.deleteAllReservationItems();
    };

    render() {
        const {reservationStore, visualStore} = this.props;

        if (!reservationStore.hasReservationItems) {
            return null;
        }

        return (
            <div className={styles.wrapper}>
                <Cart onClick={this.handleCartClick}/>
                {visualStore.reservation_expanded ? (
                    <div className={styles.reservationItems}>
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
                ) : (
                    <strong>{this.priceSummary},-</strong>
                )}

            </div>
        )
    }
}

export default Reservation;
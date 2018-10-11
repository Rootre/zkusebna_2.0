import {Component} from 'react';
import {inject, observer} from 'mobx-react';

import {getPriceWithDiscount} from '../../helpers/reservation';

import styles from './styles.scss';

@inject('discountStore', 'reservationStore')
@observer
class ReservationItem extends Component {
    get actualPrice() {
        const {discountStore, item: {price}} = this.props;

        return getPriceWithDiscount(price, discountStore.currentDiscount.value);
    }

    handleDeleteClick = () => {
        const {item: {id}, reservationStore} = this.props;

        reservationStore.deleteReservationItem(id);
    };

    render() {
        const {item: {name}} = this.props;

        return (
            <div className={styles.item}>
                <span>{name}</span>
                <span>
                    <strong>{this.actualPrice},-</strong>
                    <span onClick={this.handleDeleteClick} className={styles.delete}>&times;</span>
                </span>
            </div>
        )
    }
}

export default ReservationItem;
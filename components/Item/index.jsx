import {Component} from 'react';
import {computed} from 'mobx';
import {inject, observer} from 'mobx-react';
import classNames from 'classnames';

import {getPriceWithDiscount} from '../../helpers/reservation';

import styles from './styles.scss';

@inject('discountStore', 'reservationStore')
@observer
class Item extends Component {
    @computed
    get isInCart() {
        const {item: {id}, reservationStore} = this.props;

        return reservationStore.reservation.items.has(id);
    }

    get actualPrice() {
        const {discountStore, item: {price}} = this.props;

        return getPriceWithDiscount(price, discountStore.currentDiscount.value);
    }

    handleItemClick = async e => {
        const {reservationStore, item} = this.props;

        this.isInCart
            ? reservationStore.deleteReservationItem(item.id)
            : reservationStore.setReservationItem(item.id, item);
    };

    render() {
        const {item: {name}} = this.props;

        return (
            <div className={classNames(styles.item, {
                [styles.inCart]: this.isInCart,
            })} onClick={this.handleItemClick}>
                <h4 className={styles.name}>{name}</h4>
                <strong className={styles.price}>{this.actualPrice},-</strong>
            </div>
        )
    }
}

export default Item;
import {Component} from 'react';
import {inject, observer} from 'mobx-react';

import styles from './styles.scss';

@inject('reservationStore')
@observer
class Item extends Component {
    get actualPrice() {
        const {item: {price}, reservationStore} = this.props;

        return Math.round(price * (100 - reservationStore.currentDiscount.value) / 100);
    }

    handleItemClick = async e => {

    };

    render() {
        const {item: {name}} = this.props;

        return (
            <div className={styles.item} onClick={this.handleItemClick}>
                <h4 className={styles.name}>{name}</h4>
                <strong className={styles.price}>{this.actualPrice},-</strong>
            </div>
        )
    }
}

export default Item;
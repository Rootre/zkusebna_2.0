import {Component} from 'react';
import {inject, observer} from 'mobx-react';

import styles from './styles.scss';

@inject('discountStore')
@observer
class Discount extends Component {
    handleOptionChange = e => {
        const {discountStore} = this.props;

        discountStore.setCurrentDiscountIndex(e.target.value);
    };

    render() {
        const {discountStore: {discounts, current_discount_index}} = this.props;

        return (
            <div className={styles.wrapper}>
                <select value={current_discount_index} onChange={this.handleOptionChange}>
                    {discounts.map(({name, value}, i) => (
                        <option key={i} value={i}>{name} ({value}%)</option>
                    ))}
                </select>
            </div>
        )
    }
}

export default Discount;
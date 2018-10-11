import {Component} from 'react';

import Item from '../Item';

import styles from './styles.scss';

class ItemList extends Component {
    render() {
        const {items} = this.props;

        if (items.length === 0) {
            return null;
        }

        return (
            <div className={styles.wrapper}>
                {items.map(item => <Item key={item.id} item={item}/>)}
            </div>
        )
    }
}

export default ItemList;
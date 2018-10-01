import React, {Component} from 'react';

import CategoryList from '../CategoryList';

import styles from './reservableTree.scss';

class ReservableTree extends Component {
    render () {
        const {categories} = this.props;

        if (!categories || !categories.length) {
            return null;
        }

        return <div className={`${styles.wrapper} checht`}>
            {categories.map((category, i) => <CategoryList editable={false} level={2} key={i} {...category}/>)}
        </div>
    }
}

export default ReservableTree
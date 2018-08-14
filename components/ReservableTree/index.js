import React, {Component} from 'react';

import CategoryList from '../CategoryList';

class ReservableTree extends Component {
    render () {
        const {editable, categories} = this.props;

        if (!categories || !categories.length) {
            return null;
        }

        return <div className={`ReservableTree`}>
            {categories.map(category => {
                const {id} = category

                return <CategoryList editable={editable} level={2} key={id} {...category}/>
            })}
        </div>
    }
}

export default ReservableTree
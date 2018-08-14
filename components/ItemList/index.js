import React, {Component} from 'react'

import Item from "../Item/index"

import {updateItemName, updateItemPrice} from '../../data/apollo';

class ItemList extends Component {
    render() {
        const {editable, items} = this.props

        if (!items || !items.length) {
            return 'loading...';
        }

        return items.map((item, i) => <Item key={i}
                                            editable={editable}
                                            updateName={updateItemName}
                                            updatePrice={updateItemPrice} {...item}/>)
    }
}

export default ItemList
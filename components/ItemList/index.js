import React, {Component} from 'react'

import Item from "../Item/index"

class ItemList extends Component {
	render () {
		const { items, updateName, updatePrice } = this.props

		return items && items.length
			?
			items.map((item, i) => <Item key={i} editable={true} updateName={updateName} updatePrice={updatePrice} {...item}/>)
			:
			<Item active name={`loading...`}/>
	}
}

export default ItemList
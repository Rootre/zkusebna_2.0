import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'

import Item from "../Item/index"

@inject('store')
@observer
class ItemList extends Component {
	render () {
		const { items, store: {updateName, updatePrice} } = this.props

		return items && items.length
			?
			items.map((item, i) => <Item key={i} editable={true} updateName={updateName} updatePrice={updatePrice} {...item}/>)
			:
			<Item active name={`loading...`}/>
	}
}

export default ItemList
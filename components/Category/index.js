import React, {Component} from 'react'

import EditableItem from '../EditableItem/index'

export default class Category extends Component {
	render() {
		const {active, editable, id, name, price, updateName, updatePrice} = this.props

		return <div className={`Item`} style={{textDecoration: !active && 'line-through'}}>
			{['name', 'price'].map((class_name, i) => {
				const params = {
					value: class_name === 'name' ? name : price,
					update: class_name === 'name' ? updateName : updatePrice
				}

				return <EditableItem key={i} editable={editable} id={id} className={class_name} {...params}/>
			})}
		</div>
	}
}
import React, {Component} from 'react'
/*
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

const getItem = gql`
query getItem($id: ID!) {
  item(id: $id) {
  	name
  	price
  	active
  }
}
`
*/

class Item extends Component {
	state = {
		name: 'Item',
		price: 0,
		editing: {
			name: false,
			price: false
		}
	}
	_change(input_name, value) {
		switch(input_name) {
			case 'name': this.setState({name: value})
				break
			case 'price': this.setState({price: value})
				break
		}
	}
	_edit(input_name) {
		const {editing} = this.state

		let new_edit = Object.assign({}, {
			editing: {
				...editing
			}
		})
		new_edit.editing[input_name] = true

		this.setState(new_edit)
	}
	_update(input_name) {
		const {editing} = this.state

		let new_edit = Object.assign({}, {
			editing: {
				...editing
			}
		})
		new_edit.editing[input_name] = false

		this.setState(new_edit)
	}
	componentWillMount() {
		const {name, price} = this.props

		this.setState({name, price})
	}
	render() {
		const {active} = this.props
		const {name, price, editing} = this.state

		return <div className={`Item`} style={{ textDecoration: !active && 'line-through' }}>
			{editing.name
				?
				<input ref={elm => {
					if (!elm || this.name_input && this.name_input === elm) {
						return
					}
					this.name_input = elm
					elm.select()
				}} autoFocus type="text" value={name} onChange={e => this._change('name', e.target.value)} onBlur={() => this._update('name')}/>
				:
				<strong onClick={() => this._edit('name')} className={`name`}>{name}</strong>
			}
			{editing.price
				?
				<input ref={elm => {
					if (!elm || this.price_input && this.price_input === elm) {
						return
					}
					this.price_input = elm
					elm.select()
				}} autoFocus type="text" value={price} onChange={e => this._change('price', e.target.value)} onBlur={() => this._update('price')}/>
				:
				<i onClick={() => this._edit('price')} className={`price`}>{price}</i>
			}
		</div>
	}
}

export default Item
/*
export default graphql(getItem, {
	options: {
		variables: {
			id: 64
		}
	},
})(Item)
*/
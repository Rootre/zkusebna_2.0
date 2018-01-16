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
	render() {
		const {active, name, price} = this.props

		return <div className={`Item`} style={{ textDecoration: !active && 'line-through' }}>
			<strong className={`name`}>{name}</strong>
			<i className={`price`}>{price}</i>
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
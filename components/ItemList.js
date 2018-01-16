import React, {Component} from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Item from "./Item"

const allItems = gql`
{
	allItems {
		active
		name
		price
	}
}
`

class ItemList extends Component {
	render () {
		const { data: { allItems } } = this.props

		return allItems && allItems.length ? allItems.map((item, key) => <Item key={key} {...item}/>) : <Item name={`loading...`}/>
	}
}

export default graphql(allItems)(ItemList)
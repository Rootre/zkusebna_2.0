import React, {Component} from 'react'

export default class Item extends Component {
	render () {
		const { name } = this.props

		return <div className={`Item`}>
			<strong className={`name`}>{name}</strong>
		</div>
	}
}
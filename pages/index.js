import React, {Component} from 'react'
import Head from 'next/head'
import DevTools from 'mobx-react-devtools'
import { observer } from 'mobx-react'

import withData from '../lib/withData'

import {setStore, ObservableItems as Store} from '../mobx/ObservableItems'

import Item from '../components/Item'

const store = new Store()
setStore(store)

@observer
class Index extends Component {
	state = {
		item_id: 1
	}
	componentDidMount() {
		store.setItems()
	}
	render() {
		return <div>
			<Head>
				<title>{`Kobyliská zkušebna 2.0`}</title>
				<meta charSet={`UTF-8`}/>
				<meta name={`viewport`} content={`initial-scale=1.0, width=device-width`}/>
			</Head>
			<DevTools/>
			<h1>Vítej, Zkušebno!</h1>
			<input type="text" value={this.state.item_id}
				   onChange={e => {
					   let item_id = e.target.value

					   store.setActiveItem(item_id)

					   this.setState({ item_id })
				   }}/>
			{store.activeItem && <div>
				<h3>Active item:</h3> <Item name={store.activeItem.name}/>
			</div>}
			<ul>
				{store.items.length > 0 && store.items.map((item, key) => <li key={key} style={{ textDecoration: item.active ? '' : 'line-through'}}>{item.name}</li>)}
			</ul>
		</div>
	}
}

export default withData(props => <Index/>)
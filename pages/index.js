import React, {Component} from 'react'
import Head from 'next/head'
import DevTools from 'mobx-react-devtools'
import { observer } from 'mobx-react'

import withData from '../lib/withData'

import {setStore, ObservableItems as Store} from '../mobx/ObservableItems'

import ItemList from '../components/ItemList'

const store = new Store()
setStore(store)

@observer
class Index extends Component {
	render() {
		return <div>
			<Head>
				<title>{`Kobyliská zkušebna 2.0`}</title>
				<meta charSet={`UTF-8`}/>
				<meta name={`viewport`} content={`initial-scale=1.0, width=device-width`}/>
			</Head>
			<DevTools/>
			<h1>Vítej, Zkušebno!</h1>
			<ItemList/>
		</div>
	}
}

export default withData(props => <Index/>)
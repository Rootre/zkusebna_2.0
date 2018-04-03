import React, {Component} from 'react'
import Head from 'next/head'
import DevTools from 'mobx-react-devtools'
import {Provider} from 'mobx-react'

import {Store} from '../state/Store'

import ReservableTree from '../components/ReservableTree/index'

class Index extends Component {
	render() {
		return <div>
			<Head>
				<title>{`Kobyliská zkušebna 2.0`}</title>
				<meta charSet={`UTF-8`}/>
				<meta name={`viewport`} content={`initial-scale=1.0, width=device-width`}/>
			</Head>
			<DevTools/>
			<h1 style={{marginTop: 50}}>Vítej, Zkušebno!</h1>
			<ReservableTree/>
		</div>
	}
}

export default () => <Provider store={new Store()}>
	<Index/>
</Provider>

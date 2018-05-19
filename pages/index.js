import React, {Component} from 'react'
import Head from 'next/head'
import DevTools from 'mobx-react-devtools'
import {Provider} from 'mobx-react'

import {Store} from '../state/Store'
import Calendar from '../components/Calendar/index'

const store = new Store();

export default class Index extends Component {
	render() {
		return (
			<Provider store={store}>
                <div id={`app`}>
                    <Head>
                        <title>{`Kobyliská zkušebna 2.0`}</title>
                        <meta charSet={`UTF-8`}/>
                        <meta name={`viewport`} content={`initial-scale=1.0, width=device-width`}/>
                    </Head>
                    <DevTools/>
                    <h1 style={{marginTop: 50}}>Vítej!</h1>
                    <Calendar/>
                </div>
			</Provider>
		)
	}
}

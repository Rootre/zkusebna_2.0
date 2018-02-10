import React, {Component} from 'react'
import Head from 'next/head'
import DevTools from 'mobx-react-devtools'
import {inject, observer, Provider} from 'mobx-react'

import {setStore, ObservableItems as Store} from '../mobx/ObservableItems'

import ItemList from '../components/ItemList/index'

const store = new Store()
setStore(store)

const Index = inject(`store`)(
	observer(
		class extends Component {
			render() {
				const {store} = this.props

				let output
				if (store) {
					const {allItems, updateItemName, updateItemPrice} = store

					if (allItems) {
						const {data, error} = allItems

						output = error ? <p>{error.message}</p> :
							<ItemList updateName={updateItemName} updatePrice={updateItemPrice} items={data.allItems}/>
					}
				}
				else {
					output = <p>{`store is not defined`}</p>
				}


				return <div>
					<Head>
						<title>{`Kobyliská zkušebna 2.0`}</title>
						<meta charSet={`UTF-8`}/>
						<meta name={`viewport`} content={`initial-scale=1.0, width=device-width`}/>
					</Head>
					<DevTools/>
					<h1 style={{marginTop: 50}}>Vítej, Zkušebno!</h1>
					{output}
				</div>
			}
		}
	)
)

const IndexWithState = () => <Provider store={store}>
	<Index/>
</Provider>

export default IndexWithState
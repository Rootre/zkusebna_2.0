import Head from 'next/head'
import DevTools from 'mobx-react-devtools'

export default () => <div>
	<Head>
		<title>{`Kobyliská zkušebna 2.0`}</title>
		<meta charSet={`UTF-8`}/>
		<meta name={`viewport`} content={`initial-scale=1.0, width=device-width`} />
	</Head>
	<DevTools/>
	<h1>Vítej, Zkušebno!</h1>
</div>
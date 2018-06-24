import React, {Component} from 'react';
import Head from 'next/head';
import DevTools from 'mobx-react-devtools';
import {Provider, inject} from 'mobx-react';

import {Store} from '../state/Store';
import Calendar from '../components/Calendar';

import {getStructuredCategories} from '../data/apollo';

const store = new Store();

const stores = {
    store
};

@inject('store')
class Index extends Component {
    render() {
        console.log(this.props.tree);
        return (
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
        )
    }
}

export default class extends Component {
    static async getInitialProps() {
        let tree;

        try {
            tree = await getStructuredCategories;
        }
        catch (e) {
            console.error('Apollo error:', e.message);
        }

        return {tree};
    }
    render() {
        return <Provider {...stores}>
            <Index {...this.props}/>
        </Provider>
    }
}
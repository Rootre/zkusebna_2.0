import React, {Component} from 'react';
import Head from 'next/head';
import DevTools from 'mobx-react-devtools';
import {Provider, inject, observer} from 'mobx-react';

import Calendar from '../components/Calendar';

import {getStore as getCalendarStore} from '../state/calendarStore';
import {getStore as getCategoryStore} from '../state/categoryStore';
import {getStore as getGeneralStore} from '../state/generalStore';
import {getStore as getReservationStore} from '../state/reservationStore';
import {getStore as getVisualStore} from '../state/visualStore';

import {getTopCategories} from '../api/category';
import {getCalendarReservationsForRange} from '../api/reservation';

const calendarStore = getCalendarStore();
const categoryStore = getCategoryStore();
const generalStore = getGeneralStore();
const reservationStore = getReservationStore();
const visualStore = getVisualStore();

const stores = {
    calendarStore,
    categoryStore,
    generalStore,
    reservationStore,
    visualStore,
};

@inject('categoryStore', 'reservationStore')
@observer
class Index extends Component {
    constructor(props) {
        super(props);

        const {categoryStore, reservationStore, calendar_reservations, top_categories} = this.props;

        if (Array.isArray(top_categories)) {
            categoryStore.setTopCategories(top_categories);
        }
        if (Array.isArray(calendar_reservations)) {
            reservationStore.setCurrentReservations(calendar_reservations);
        }
    }

    render() {
        return (
            <div>
                <Head>
                    <title>{`Kobyliská zkušebna 2.0`}</title>
                </Head>
                <DevTools/>
                <h1 style={{marginTop: 50}}>Vítej!</h1>

                <Calendar />
            </div>
        )
    }
}

export default class extends Component {
    static async getInitialProps() {
        const top_categories = await getTopCategories();
        const calendar_reservations = await getCalendarReservationsForRange(
            calendarStore.currentMonthFirstDay.toString(),
            calendarStore.currentMonthLastDay.toString(),
        );

        return {top_categories, calendar_reservations};
    }
    render() {
        return <Provider {...stores}>
            <Index {...this.props}/>
        </Provider>
    }
}
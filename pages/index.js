import React, {Component} from 'react';
import Head from 'next/head';
import DevTools from 'mobx-react-devtools';
import {Provider, inject, observer} from 'mobx-react';

import Calendar from '../components/Calendar';

import {getStore as getCalendarStore} from '../state/calendarStore';
import {getStore as getCategoryStore} from '../state/categoryStore';
import {getStore as getDiscountStore} from '../state/discountStore';
import {getStore as getFormStore} from '../state/formStore';
import {getStore as getItemStore} from '../state/itemStore';
import {getStore as getGeneralStore} from '../state/generalStore';
import {getStore as getReservationStore} from '../state/reservationStore';
import {getStore as getUserStore} from '../state/userStore';
import {getStore as getVisualStore} from '../state/visualStore';

import {getDatabaseTimeFromMoment} from '../helpers/dates';

import {getAllCategories} from '../api/category';
import {getAllDiscounts} from '../api/discounts';
import {getAllItems} from '../api/item';
import {getCalendarReservationsInRange} from '../api/reservation';

import {getClient, hydrateCache} from 'Data/apollo';

const calendarStore = getCalendarStore();
const categoryStore = getCategoryStore();
const discountStore = getDiscountStore();
const formStore = getFormStore();
const itemStore = getItemStore();
const generalStore = getGeneralStore();
const reservationStore = getReservationStore();
const userStore = getUserStore();
const visualStore = getVisualStore();

const stores = {
    calendarStore,
    categoryStore,
    discountStore,
    formStore,
    itemStore,
    generalStore,
    reservationStore,
    userStore,
    visualStore,
};

import '../static/sass/global.scss';

@inject('categoryStore', 'discountStore', 'itemStore', 'reservationStore')
@observer
class Index extends Component {
    constructor(props) {
        super(props);

        const {
            apolloCache,
            categories,
            categoryStore,
            discounts,
            discountStore,
            items,
            itemStore,
            reservationStore,
            calendar_reservations,
        } = this.props;

        if (Array.isArray(categories)) {
            categoryStore.setCategories(categories);
        }
        if (Array.isArray(calendar_reservations)) {
            reservationStore.setCurrentReservations(calendar_reservations);
        }
        if (Array.isArray(discounts)) {
            discountStore.setDiscounts(discounts);
        }
        if (Array.isArray(items)) {
            itemStore.setItems(items);
        }
        if (apolloCache) {
            hydrateCache(JSON.parse(apolloCache));
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

                <Calendar/>
            </div>
        )
    }
}

export default class extends Component {
    static async getInitialProps({req}) {
        const categories = await getAllCategories();
        const discounts = await getAllDiscounts();
        const items = await getAllItems();
        const calendar_reservations = await getCalendarReservationsInRange(
            getDatabaseTimeFromMoment(calendarStore.currentMonthFirstDayAsMoment),
            getDatabaseTimeFromMoment(calendarStore.currentMonthLastDayAsMoment),
        );

        return {
            apolloCache: req && JSON.stringify(getClient().extract()).replace(/</g, '\\u003c'),
            categories,
            calendar_reservations,
            discounts,
            items,
        };
    }

    render() {
        return <Provider {...stores}>
            <Index {...this.props}/>
        </Provider>
    }
}
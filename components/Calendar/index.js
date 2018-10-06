import {Component} from 'react';
import {inject, observer} from 'mobx-react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import {getCalendarReservationsForRange, getReservationById} from '../../api/reservation';

import {EVENT_POPUP} from '../../consts/popup';

import styles from './style.scss';
import Popup from "../Popup";

// TODO: get rid of this dependency
BigCalendar.momentLocalizer(moment);

@inject('calendarStore', 'reservationStore', 'visualStore')
@observer
class Calendar extends Component {

    onNavigate = async day => {
        console.log('onNavigate', day);
        const {calendarStore, reservationStore} = this.props;

        calendarStore.setCurrentDay(day);

        try {
            const calendar_reservations = await getCalendarReservationsForRange(
                calendarStore.currentMonthFirstDay.toString(),
                calendarStore.currentMonthLastDay.toString(),
            );
            reservationStore.setCurrentReservations(calendar_reservations);
        }
        catch (e) {
            console.error(e.message);
        }
    };
    onSelectEvent = async event => {
        console.log('onSelectEvent', event);
        const {reservationStore, visualStore} = this.props;

        try {
            const reservation = await getReservationById(parseInt(event.id));
            reservationStore.setCurrentReservation(reservation);
            visualStore.setCurrentPopup(EVENT_POPUP);
        }
        catch (e) {
            console.error(e.message);
        }
    };
    onSelectSlot = slots => {
        console.log('onSelectSlot', slots);
    };

    render() {
        const {
            calendarStore: {current_day},
            reservationStore: {current_reservations, current_reservation},
            visualStore,
        } = this.props;

        return <div className={styles.wrapper}>
            {visualStore.current_popup === EVENT_POPUP && (
                <Popup>
                    <h2>{current_reservation.name}</h2>
                    <h3>{current_reservation.user.name}</h3>
                    <ul>
                        {current_reservation.reservationItems.map(({item: {id, name}}) => (
                            <li key={id}>{name}</li>
                        ))}
                    </ul>
                </Popup>
            )}
            <BigCalendar
                events={current_reservations.map(({id, name, since, until}) => ({
                    id,
                    title: name,
                    start: since,
                    end: until,
                }))}
                defaultDate={current_day}
                views={['month']}
                onNavigate={this.onNavigate}
                onSelectEvent={this.onSelectEvent}
                onSelectSlot={this.onSelectSlot}
                popup
                selectable
            />
        </div>
    }
}

export default Calendar
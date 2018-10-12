import {Component} from 'react';
import {inject, observer} from 'mobx-react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import Popup from '../Popup';
import ReservationDetail from '../ReservationDetail';
import NewReservation from '../NewReservation';

import {getCalendarReservationsForRange, getReservationById} from '../../api/reservation';

import {EVENT_POPUP, NEW_RESERVATION_POPUP} from '../../consts/popup';

import styles from './style.scss';

// TODO: get rid of this dependency
moment.locale('cs');
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
        const {reservationStore, visualStore} = this.props;

        reservationStore.setReservationStartDay(slots.start);
        reservationStore.setReservationEndDay(slots.end);
        visualStore.setCurrentPopup(NEW_RESERVATION_POPUP);
    };

    render() {
        const {
            calendarStore: {current_day},
            reservationStore: {
                current_reservations,
                current_reservation,
            },
            visualStore,
        } = this.props;

        return <div className={styles.wrapper}>
            {visualStore.current_popup === EVENT_POPUP && (
                <Popup>
                    <ReservationDetail reservation={current_reservation}/>
                </Popup>
            )}
            {visualStore.current_popup === NEW_RESERVATION_POPUP && (
                <Popup>
                    <NewReservation/>
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

export default Calendar;
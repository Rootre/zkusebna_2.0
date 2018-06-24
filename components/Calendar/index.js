import React, {Component} from 'react'
import BigCalendar from 'react-big-calendar'
import {inject} from 'mobx-react'
import moment from 'moment'

import CalendarPopup from '../CalendarPopup/index'
import ReservationPopup from '../ReservationPopup/index'

import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.momentLocalizer(moment);

@inject('store')
class Calendar extends Component {
    state = {
        currentDay: new Date(),
        eventDetail: null,
        reservationDetail: null,
        events: []
    }
    get dbTimeFormat() {
        return "YYYY-MM-DD HH:mm:ss"
    }

    componentDidMount() {
        this.dateChanged(new Date())
    }

    _closeEventPopup = () => {
        this.setState({ eventDetail: null })
    }
    _closeReservationPopup = () => {
        this.setState({ reservationDetail: null })
    }
    _setEvents(events) {
        this.setState({events})
    }
    _switchMonths(day) {
        const {store: {getReservationsWithinRange}} = this.props

        const firstDay = moment(day).startOf('month')
        const lastDay = moment(day).endOf('month')

        getReservationsWithinRange(
            firstDay.format(this.dbTimeFormat),
            lastDay.format(this.dbTimeFormat),
        )
            .then(result => {
                if (result.data && result.data.reservationsWithinRange) {
                    this._setEvents(result.data.reservationsWithinRange)
                }
                else {
                    console.error('reservation range error', result)
                    this._setEvents([])
                }
            })
            .catch(err => {
                console.error(err)
            })
    }

    dateChanged(today) {
        const {currentDay} = this.state

        if (moment(today).isSame(currentDay, 'month')) {
            this.reserve(today.toString())
        }
        else {
            this._switchMonths(today)
        }

        this.setState({currentDay: today})
    }
    reserve(start, end = null) {
        this.setState({
            reservationDetail: {
                start,
                end: end || start,
            }
        })
    }
    eventSelected(eventDetail) {
        this.setState({ eventDetail })
    }
    slotSelected(slots) {
        this.reserve(slots.start, slots.end)
    }

    render() {
        const {currentDay, eventDetail, events, reservationDetail} = this.state

        return <div style={{height: '500px'}}>
            {!!eventDetail && <CalendarPopup onClose={this._closeEventPopup} event={eventDetail}/>}
            {!!reservationDetail && <ReservationPopup onClose={this._closeReservationPopup} reservation={reservationDetail}/>}
            <BigCalendar
                events={events.map(event => ({
                    title: event.name,
                    start: event.since,
                    end: event.until,
                    user: event.user,
                    items: event.reservationItems.map(item => item.item)
                }))}
                defaultDate={currentDay}
                views={['month']}
                onNavigate={day => this.dateChanged(new Date(day))}
                onSelectEvent={event => this.eventSelected(event)}
                onSelectSlot={slots => this.slotSelected(slots)}
                popup
                selectable
            />
        </div>
    }
}

export default Calendar
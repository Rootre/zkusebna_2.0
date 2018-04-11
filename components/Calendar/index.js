import React, {Component} from 'react'
import BigCalendar from 'react-big-calendar'
import {inject} from 'mobx-react'
import moment from 'moment'

import CalendarPopup from '../CalendarPopup/index'

import css from 'react-big-calendar/lib/css/react-big-calendar.css'

BigCalendar.momentLocalizer(moment)

@inject('store')
class Calendar extends Component {
    state = {
        eventDetail: null,
        events: []
    }
    get dbTimeFormat() {
        return "YYYY-MM-DD HH:mm:ss"
    }

    componentDidMount() {
        this.dateChanged(new Date())
    }

    dateChanged(today) {
        const {store: {reservationRange}} = this.props

        const firstDay = moment(today).startOf('month')
        const lastDay = moment(today).endOf('month')

        reservationRange(
            firstDay.format(this.dbTimeFormat),
            lastDay.format(this.dbTimeFormat),
        )
            .then(result => {
                if (result.data && result.data.reservationRange) {
                    this._setEvents(result.data.reservationRange)
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
    dayClick(day) {
        console.log(day);
    }
    eventSelected(eventDetail) {
        this.setState({ eventDetail })
    }

    _closePopup() {
        this.setState({ eventDetail: null })
    }
    _setEvents(events) {
        this.setState({events})
    }

    render() {
        const {eventDetail, events} = this.state

        return <div style={{height: '400px'}}>
            {!!eventDetail && <CalendarPopup onClose={e => this._closePopup()} event={eventDetail}/>}
            <style>{css}</style>
            <BigCalendar
                events={events.map(event => ({
                    title: event.name,
                    start: event.since,
                    end: event.until,
                    user: event.user,
                    items: event.reservationItems.map(item => item.item)
                }))}
                defaultDate={new Date()}
                views={['month']}
                onNavigate={day => this.dateChanged(new Date(day))}
                onSelectEvent={event => this.eventSelected(event)}
                onSelectSlot={slotInfo => this.dayClick(slotInfo)}
                popup
            />
        </div>
    }
}

export default Calendar
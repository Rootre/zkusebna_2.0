import {Component} from 'react';
import {inject, observer} from 'mobx-react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

//import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './style.scss';

BigCalendar.momentLocalizer(moment);

@inject('calendarStore', 'reservationStore')
@observer
class Calendar extends Component {

    onNavigate = day => {
        console.log('onNavigate', day);
    };
    onSelectEvent = event => {
        console.log('onSelectEvent', event);
    };
    onSelectSlot = slots => {
        console.log('onSelectSlot', slots);
    };

    render() {
        const {calendarStore: {current_day}, reservationStore: {current_reservations}} = this.props;

        return <div className={styles.wrapper}>
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
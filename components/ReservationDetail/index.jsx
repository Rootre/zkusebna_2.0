import {Component} from 'react';

import {getDayFromDate, getTimeFromDate, isSameDay} from '../../helpers/dates';

import styles from './styles.scss';

class ReservationDetail extends Component {
    render() {
        const {
            reservation: {
                name,
                reservationItems,
                since,
                until,
                user: {name: user_name},
            }
        } = this.props;

        const start = new Date(since);
        const end = new Date(until);

        return (
            <div>
                <h2>{name}</h2>
                <h3>{user_name}</h3>
                <p>{isSameDay(start, end)
                    ? <span>{getDayFromDate(start)} {getTimeFromDate(start)} - {getTimeFromDate(end)}</span>
                    : <span>{getDayFromDate(start)} {getTimeFromDate(start)} - {getDayFromDate(end)} {getTimeFromDate(end)}</span>}
                </p>
                <ul>
                    {reservationItems.map(({item: {id, name}}) => (
                        <li key={id}>{name}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default ReservationDetail;
import {Component} from 'react';

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

        return (
            <div>
                <h2>{name}</h2>
                <h3>{user_name}</h3>
                <p>od: {since.toString()} do: {until.toString()}</p>
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
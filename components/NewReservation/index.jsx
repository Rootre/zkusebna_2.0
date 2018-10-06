import {Component} from 'react';

import styles from './styles.scss';

class NewReservation extends Component {
    render() {
        const {start_day, end_day} = this.props;

        return (
            <div>
                <h2>Nová rezervace</h2>
                <p>start: <strong>{start_day.toString()}</strong> </p>
                <p>end: <strong>{end_day.toString()}</strong></p>
            </div>
        )
    }
}

export default NewReservation;
import {Component} from 'react';
import {inject, observer} from 'mobx-react';

import CategoryTree from '../CategoryTree';
import Discount from '../Discount';
import TimePicker from '../TimePicker';

import {getDay} from '../../helpers/dates';

import styles from './styles.scss';

@inject('categoryStore', 'reservationStore')
@observer
class NewReservation extends Component {
    handleStartTimeChange = value => {
        const {reservationStore} = this.props;

        reservationStore.setReservationStartTime(value.format('HH:mm'));
    };

    handleEndTimeChange = value => {
        const {reservationStore} = this.props;

        reservationStore.setReservationEndTime(value.format('HH:mm'));
    };

    render() {
        const {reservationStore: {isOneDayReservation, reservation: {end_day, start_day}}} = this.props;

        return (
            <div className={styles.wrapper}>
                <h2>
                    <span>Nová rezervace</span>&nbsp;
                    <small className={styles.date}>
                        ({isOneDayReservation
                        ? getDay(start_day)
                        : <span>{getDay(start_day)} - {getDay(end_day)}</span>
                    })
                    </small>
                </h2>
                <h3>Čas</h3>
                <p>
                    <TimePicker
                        day={start_day}
                        onChange={this.handleStartTimeChange}/>
                    -
                    <TimePicker
                        day={end_day}
                        onChange={this.handleEndTimeChange}
                    />
                </p>
                <h3>Sleva</h3>
                <Discount/>
                <h3>Položky</h3>
                <div className={styles.categories}>
                    <CategoryTree/>
                </div>
            </div>
        )
    }
}

export default NewReservation;
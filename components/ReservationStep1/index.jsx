import {Component} from 'react';
import {inject, observer} from 'mobx-react';
import moment from 'moment';

import Button from '../Button';
import TimePicker from '../TimePicker';

import styles from './styles.scss';

@inject('reservationStore')
@observer
class ReservationStep1 extends Component {
    handleButtonClick = () => {
        this.props.reservationStore.setNextStep();
    };

    handleStartTimeChange = value => {
        const {reservationStore} = this.props;
        const {reservation: {start}} = reservationStore;

        const change = moment(start);
        change.hour(value.hour());
        change.minute(value.minute());

        reservationStore.setReservationStart(change);
    };

    handleEndTimeChange = value => {
        const {reservationStore} = this.props;
        const {reservation: {end}} = reservationStore;

        const change = moment(end);
        change.hour(value.hour());
        change.minute(value.minute());

        reservationStore.setReservationEnd(change);
    };

    render() {
        const {
            reservationStore: {
                reservation: {end, start},
            },
        } = this.props;

        return (
            <div>
                <h3>Čas</h3>
                <p>
                    <TimePicker
                        day={start}
                        onChange={this.handleStartTimeChange}
                        showSecond={false}
                    />
                    <span> - </span>
                    <TimePicker
                        day={end}
                        onChange={this.handleEndTimeChange}
                        showSecond={false}
                    />
                </p>
                <p className={styles.button}>
                    <Button label={'Pokračovat'} onClick={this.handleButtonClick}/>
                </p>
            </div>
        )
    }
}

export default ReservationStep1;
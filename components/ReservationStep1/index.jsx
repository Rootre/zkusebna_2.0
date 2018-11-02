import {Component} from 'react';
import {inject, observer} from 'mobx-react';
import classNames from 'classnames';
import moment from 'moment';

import Button from '../Button';
import TimePicker from '../TimePicker';

import {getReservedItemsForRange} from 'Api/reservation';

import {END_DATE, START_DATE} from '../../consts/forms';
import {isTimeEmptyFromMoment} from '../../helpers/dates';
import {validate} from '../../helpers/forms';

import styles from './styles.scss';

@inject('formStore', 'reservationStore')
@observer
class ReservationStep1 extends Component {
    handleButtonClick = async () => {
        const {reservationStore} = this.props;
        const {reservation: {end, start}} = reservationStore;

        if (!this.validate(start, START_DATE) || !this.validate(end, END_DATE)) {
            return;
        }

        reservationStore.setNextStep();

        const reserved_items = await getReservedItemsForRange(start.toString(), end.toString());

        console.log(reserved_items);
    };

    handleStartTimeChange = value => {
        const {reservationStore} = this.props;
        const {reservation: {start}} = reservationStore;

        if (!this.validate(value, START_DATE)) {
            return;
        }

        const change = moment(start);
        change.hour(value.hour());
        change.minute(value.minute());

        reservationStore.setReservationStart(change);
    };

    handleEndTimeChange = value => {
        const {reservationStore} = this.props;
        const {reservation: {end}} = reservationStore;

        if (!this.validate(value, END_DATE)) {
            return;
        }

        const change = moment(end);
        change.hour(value.hour());
        change.minute(value.minute());

        reservationStore.setReservationEnd(change);
    };

    validate(time, input_id) {
        const {formStore} = this.props;
        const error = validate(isTimeEmptyFromMoment, time);

        if (error) {
            formStore.setError(input_id);
        } else {
            formStore.deleteError(input_id);
        }

        return !error;
    }

    render() {
        const {
            formStore,
            reservationStore: {
                reservation: {end, start},
            },
        } = this.props;

        return (
            <div>
                <h3>Čas</h3>
                <p className={styles.timeWrapper}>
                    <TimePicker
                        className={classNames({
                            [styles.error]: formStore.hasError(START_DATE),
                        })}
                        day={start}
                        onChange={this.handleStartTimeChange}
                        showSecond={false}
                        value={start}
                    />
                    <span> - </span>
                    <TimePicker
                        className={classNames({
                            [styles.error]: formStore.hasError(END_DATE),
                        })}
                        day={end}
                        onChange={this.handleEndTimeChange}
                        showSecond={false}
                        value={end}
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
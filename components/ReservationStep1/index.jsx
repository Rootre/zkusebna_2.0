import {Component} from 'react';
import {inject, observer} from 'mobx-react';
import classNames from 'classnames';
import moment from 'moment';

import Button from '../Button';
import TimePicker from '../TimePicker';

import {getReservedItemsForRange} from 'Api/reservation';

import {END_DATE, START_DATE} from '../../consts/forms';
import {VALIDATE, Validation} from '../../helpers/validation';

import styles from './styles.scss';

@inject('formStore', 'reservationStore')
@observer
class ReservationStep1 extends Component {
    handleButtonClick = async () => {
        const {reservationStore} = this.props;
        const {reservation: {end, start}} = reservationStore;

        if (
            !this.validate(start, START_DATE)
            || !this.validate(end, END_DATE)
        ) {
            return;
        }

        reservationStore.setNextStep();

        try {
            const reserved_items = await getReservedItemsForRange(start.toString(), end.toString());

            if (Array.isArray(reserved_items)) {
                reserved_items.forEach(({reservationItems}) => {
                    reservationItems.forEach(({item_id}) => reservationStore.setReservationExcludedItem(item_id));
                });
            }
        } catch (e) {
            console.error(e);
        }
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

        const isTimeFilledValidation = new Validation(VALIDATE.IS_TIME_FILLED);
        const passed = isTimeFilledValidation.validate(time);

        if (passed) {
            formStore.deleteError(input_id);
        } else {
            formStore.setError(input_id, isTimeFilledValidation.message);
        }

        return passed;
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
                <div className={styles.timeWrapper}>
                    <p>
                        <TimePicker
                            className={classNames({
                                [styles.error]: formStore.hasError(START_DATE),
                            })}
                            day={start}
                            onChange={this.handleStartTimeChange}
                            showSecond={false}
                            value={start}
                        />
                        <small>{formStore.getError(START_DATE)}</small>
                    </p>
                    <p>
                        <TimePicker
                            className={classNames({
                                [styles.error]: formStore.hasError(END_DATE),
                            })}
                            day={end}
                            onChange={this.handleEndTimeChange}
                            showSecond={false}
                            value={end}
                        />
                        <small>{formStore.getError(END_DATE)}</small>
                    </p>
                </div>
                <p className={styles.button}>
                    <Button label={'Pokračovat'} onClick={this.handleButtonClick}/>
                </p>
            </div>
        )
    }
}

export default ReservationStep1;
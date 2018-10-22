import {Component} from 'react';
import {computed} from 'mobx';
import {inject, observer} from 'mobx-react';
import moment from 'moment';

import Button from '../Button';
import CategoryTree from '../CategoryTree';
import Discount from '../Discount';
import ReservationDate from '../ReservationDate';
import TimePicker from '../TimePicker';
import UserForm from '../UserForm';

import styles from './styles.scss';

@inject('categoryStore', 'reservationStore', 'userStore', 'visualStore')
@observer
class NewReservation extends Component {
    @computed
    get canOrder() {
        const {reservationStore, userStore} = this.props;

        return reservationStore.hasFilledTimeAndName && userStore.hasFilledCredentials;
    }

    handleSelectItemsClick = () => {
        this.props.visualStore.setShowOrderItems(true);
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
            reservationStore: {reservation: {end, start}},
            visualStore: {show_order_items}
        } = this.props;

        return (
            <div className={styles.wrapper}>
                <h2>
                    <span>Nová rezervace</span>&nbsp;
                    <small className={styles.date}>
                        (<ReservationDate start={start} end={end}/>)
                    </small>
                </h2>
                <h3>Čas</h3>
                <p>
                    <TimePicker
                        day={start}
                        onChange={this.handleStartTimeChange}/>
                    <span> - </span>
                    <TimePicker
                        day={end}
                        onChange={this.handleEndTimeChange}
                    />
                </p>
                <h3>Sleva</h3>
                <Discount/>
                <h3>Informace</h3>
                <UserForm/>
                {(!this.canOrder || !show_order_items) && (
                    <p className={styles.button}>
                        <Button disabled={!this.canOrder} label={'Vybrat položky'} onClick={this.handleSelectItemsClick}/>
                    </p>
                )}
                {this.canOrder && show_order_items && (
                    <div>
                        <h3>Položky</h3>
                        <div className={styles.categories}>
                            <CategoryTree/>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default NewReservation;
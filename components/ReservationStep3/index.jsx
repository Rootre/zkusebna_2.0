import {Component} from 'react';
import {inject, observer} from 'mobx-react';

import Button from '../Button';
import CategoryTree from '../CategoryTree';
import Reservation from '../Reservation';

import {createNewReservation, createReservationItems} from '../../api/reservation';
import {getDatabseTimeFromMoment} from '../../helpers/dates';

import styles from './styles.scss';
import {getPriceWithDiscount} from "../../helpers/reservation";

@inject('discountStore', 'reservationStore', 'visualStore')
@observer
class ReservationStep3 extends Component {
    handleButtonReserveClick = async () => {
        const {
            discountStore: {
                currentDiscount
            },
            reservationStore: {
                priceSummary,
                reservation: {
                    end,
                    name,
                    start,
                },
                reservationItems,
            }
        } = this.props;

        const variables = {
            discount_id: currentDiscount.id,
            name,
            price: getPriceWithDiscount(priceSummary, currentDiscount.value),
            since: getDatabseTimeFromMoment(start),
            until: getDatabseTimeFromMoment(end),
            user_id: 1,
        };

        try {
            const new_reservation = await createNewReservation(variables);

            const items = reservationItems.map(item => ({
                item_id: item.id,
                reservation_id: new_reservation.id,
            }));

            await createReservationItems(items);

            this.props.reservationStore.addCurrentReservation({
                id: new_reservation.id,
                name: variables.name,
                since: variables.since,
                until: variables.until,
            });
            this.props.reservationStore.resetReservation();
            this.props.visualStore.deleteCurrentPopup();
        } catch (e) {
            console.error(e.message);
        }
    };
    handleButtonPrevClick = () => {
        this.props.reservationStore.setPrevStep();
    };

    render() {
        return (
            <div>
                <h3>Položky</h3>
                <CategoryTree/>
                <Reservation/>
                <p className={styles.button}>
                    <Button label={'Zpět'} onClick={this.handleButtonPrevClick}/>
                    <Button label={'Rezervovat'} onClick={this.handleButtonReserveClick}/>
                </p>
            </div>
        )
    }
}

export default ReservationStep3;
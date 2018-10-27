import {Component} from 'react';
import {inject, observer} from 'mobx-react';

import Button from '../Button';
import CategoryTree from '../CategoryTree';

import {createNewReservation} from '../../api/reservation';
import {getDatabseTimeFromMoment} from '../../helpers/dates';

import styles from './styles.scss';
import {getPriceWithDiscount} from "../../helpers/reservation";

@inject('discountStore', 'reservationStore')
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
                }
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
            const new_reservation_id = await createNewReservation(variables);

            console.log('new_reservation_id', new_reservation_id);
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
                <p className={styles.button}>
                    <Button label={'Zpět'} onClick={this.handleButtonPrevClick}/>
                    <Button label={'Rezervovat'} onClick={this.handleButtonReserveClick}/>
                </p>
            </div>
        )
    }
}

export default ReservationStep3;
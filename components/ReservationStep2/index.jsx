import {Component} from 'react';
import {inject, observer} from 'mobx-react';

import Button from '../Button';
import Discount from '../Discount';
import Input from '../Input';
import UserForm from '../UserForm';

import {RESERVATION_NAME, USER_EMAIL, USER_NAME, USER_PHONE} from '../../consts/forms';
import {VALIDATE, Validation} from '../../helpers/validation';

import styles from './styles.scss';

@inject('formStore', 'reservationStore', 'userStore')
@observer
class ReservationStep2 extends Component {
    formId = 'reservation-step-2';
    validations = {
        [RESERVATION_NAME]: new Validation(VALIDATE.NOT_EMPTY),
        [USER_EMAIL]: new Validation(VALIDATE.IS_EMAIL),
        [USER_NAME]: new Validation(VALIDATE.IS_NAME),
        [USER_PHONE]: new Validation(VALIDATE.IS_PHONE),
    };

    constructor(props) {
        super(props);

        const {formStore} = props;

        formStore.setForm(this.formId);
        Object.keys(this.validations).forEach(key => {
            formStore.addFormValidation(this.formId, key, this.validations[key]);
        });
    }
    handleButtonNextClick = () => {
        const {
            formStore,
            reservationStore: {reservation: {name: reservationName}},
            userStore: {name, email, phone}
        } = this.props;

        if (!formStore.validateForm(this.formId, {
            [RESERVATION_NAME]: reservationName,
            [USER_EMAIL]: email,
            [USER_NAME]: name,
            [USER_PHONE]: phone,
        })) {
            return;
        }

        this.props.reservationStore.setNextStep();
    };
    handleButtonPrevClick = () => {
        this.props.reservationStore.setPrevStep();
    };
    handleReservationNameChange = e => {
        this.props.reservationStore.setReservationName(e.target.value);
    };

    render() {
        const {reservationStore: {reservation: {name: reservationName}}} = this.props;

        return (
            <div>
                <h3>O rezervaci</h3>
                <div className={styles.row}>
                    <div>
                        <Input
                            id={RESERVATION_NAME}
                            onChange={this.handleReservationNameChange}
                            placeholder={'Název akce'}
                            value={reservationName}
                        />
                    </div>
                    <Discount/>
                </div>
                <h3>O vás</h3>
                <UserForm/>
                <p className={styles.button}>
                    <Button label={'Zpět'} onClick={this.handleButtonPrevClick}/>
                    <Button label={'Pokračovat'} onClick={this.handleButtonNextClick}/>
                </p>
            </div>
        )
    }
}

export default ReservationStep2;
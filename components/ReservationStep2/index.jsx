import {Component} from 'react';
import {inject, observer} from 'mobx-react';

import Discount from '../Discount';
import UserForm from '../UserForm';
import Button from '../Button';

import styles from './styles.scss';

@inject('reservationStore')
@observer
class ReservationStep2 extends Component {
    handleButtonNextClick = () => {
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
                        <input type="text" placeholder={'Název akce'} value={reservationName}
                               onChange={this.handleReservationNameChange}/>
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
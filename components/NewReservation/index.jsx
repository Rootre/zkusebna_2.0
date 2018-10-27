import {Component} from 'react';
import {inject, observer} from 'mobx-react';

import ReservationDate from '../ReservationDate';
import ReservationStep1 from '../ReservationStep1';
import ReservationStep2 from '../ReservationStep2';
import ReservationStep3 from '../ReservationStep3';

import styles from './styles.scss';

@inject('categoryStore', 'reservationStore', 'userStore', 'visualStore')
@observer
class NewReservation extends Component {
    render() {
        const {
            reservationStore: {
                reservation: {end, start},
                reservation_step,
            },
        } = this.props;

        return (
            <div className={styles.wrapper}>
                <h2>
                    <span>Nová rezervace</span>&nbsp;
                    <small className={styles.date}>
                        (<ReservationDate start={start} end={end}/>)
                    </small>
                </h2>
                {reservation_step === 1 && <ReservationStep1/>}
                {reservation_step === 2 && <ReservationStep2/>}
                {reservation_step === 3 && <ReservationStep3/>}
            </div>
        )
    }
}

export default NewReservation;
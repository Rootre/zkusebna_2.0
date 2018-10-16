import {Component} from 'react';
import {inject, observer} from 'mobx-react';

import styles from './styles.scss';

@inject('reservationStore', 'userStore')
@observer
class UserForm extends Component {
    handleReservationNameChange = e => {
        this.props.reservationStore.setReservationName(e.target.value);
    };

    handleUserEmailChange = e => {
        this.props.userStore.setEmail(e.target.value);
    };

    handleUserNameChange = e => {
        this.props.userStore.setName(e.target.value);
    };

    handleUserPhoneChange = e => {
        this.props.userStore.setPhone(e.target.value);
    };

    render() {
        const {reservationStore: {reservation: {name: reservationName}}, userStore: {name, email, phone}} = this.props;
        return (
            <div className={styles.wrapper}>
                <input type="text" placeholder={'Název akce'} value={reservationName}
                       onChange={this.handleReservationNameChange}/>
                <input type="text" placeholder={'Jméno'} value={name} onChange={this.handleUserNameChange}/>
                <input type="text" placeholder={'Email'} value={email} onChange={this.handleUserEmailChange}/>
                <input type="text" placeholder={'Telefon'} value={phone} onChange={this.handleUserPhoneChange}/>
            </div>
        );
    }
}

export default UserForm;
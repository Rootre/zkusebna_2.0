import {Component} from 'react';
import {inject, observer} from 'mobx-react';

import Input from '../Input';

import styles from './styles.scss';
import {USER_EMAIL, USER_NAME, USER_PHONE} from '../../consts/forms';

@inject('userStore')
@observer
class UserForm extends Component {
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
        const {userStore: {name, email, phone}} = this.props;
        return (
            <div className={styles.wrapper}>
                <Input
                    id={USER_NAME}
                    onChange={this.handleUserNameChange}
                    placeholder={'Jméno'}
                    value={name}
                />
                <Input
                    id={USER_EMAIL}
                    onChange={this.handleUserEmailChange}
                    placeholder={'Email'}
                    value={email}
                />
                <Input
                    id={USER_PHONE}
                    onChange={this.handleUserPhoneChange}
                    placeholder={'Telefon'}
                    value={phone}
                />
            </div>
        );
    }
}

export default UserForm;
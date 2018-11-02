import React, {Component} from 'react';
import classNames from 'classnames';

import SpinnerSVG from '../../static/svg/spinner.svg';

import styles from './styles.scss';

class Button extends Component {
    render() {
        const {busy, disabled, label, onClick, type} = this.props;

        return (
            <button disabled={disabled} type={type} className={styles.button} onClick={onClick}>
                {busy ? <SpinnerSVG className={classNames('spinner', styles.spinner)}/> : label}
            </button>
        );
    }
}

Button.defaultProps = {
    busy: false,
    disabled: false,
    label: '',
    type: 'submit',
};

export default Button;
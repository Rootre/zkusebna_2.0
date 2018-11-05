import {Component} from 'react';
import {inject, observer} from 'mobx-react';
import classNames from 'classnames';

import {Validation} from '../../helpers/validation';
import {generateID} from '../../helpers/strings';

import styles from './styles.scss';

@inject('formStore')
@observer
class Input extends Component {
    constructor(props) {
        super(props);

        this.id = props.id || generateID();
    }

    componentDidUpdate() {
        const {formStore, validation, value} = this.props;

        if (!(validation instanceof Validation)) {
            return true;
        }

        if (validation.validate(value)) {
            formStore.setError(this.id, validation.message);
        } else {
            formStore.deleteError(this.id);
        }
    }

    render() {
        const {formStore, label, type, value} = this.props;
        const error = formStore.getError(this.id);
        
        return (
            <div className={classNames(styles.container, {
                [styles.hasError]: !!error,
            })}>
                {label && <label className={styles.label} htmlFor={this.id}>{label}</label>}
                <input id={this.id} type={type} value={value}/>
                {error && <p className={styles.error}>{error}</p>}
            </div>
        )
    }
}

export default Input;
import {Component} from 'react';
import {inject, observer} from 'mobx-react';
import classNames from 'classnames';

import {generateID} from '../../helpers/strings';

import styles from './styles.scss';

@inject('formStore')
@observer
class Input extends Component {
    constructor(props) {
        super(props);

        this.id = props.id || generateID();
    }

    onChange(e) {
        const {formStore, onChange} = this.props;

        if (formStore.getValidation(this.id)) {
            formStore.validateInput(this.id, e.target.value);
        }

        onChange && onChange(e);
    }

    componentDidUpdate() {
        const {formStore, value} = this.props;

        const validation = formStore.getValidation(this.id);

        if (!validation) {
            return true;
        }

        return formStore.validateInput(this.id, value);
    }

    render() {
        const {formStore, label, type, value} = this.props;
        const error = formStore.getError(this.id);
        
        return (
            <div className={classNames(styles.container, {
                [styles.hasError]: !!error,
            })}>
                {label && <label className={styles.label} htmlFor={this.id}>{label}</label>}
                <input id={this.id} type={type} value={value} onChange={e => this.onChange(e)}/>
                {error && <p className={styles.error}>{error}</p>}
            </div>
        )
    }
}

export default Input;
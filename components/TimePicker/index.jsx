import {Component} from 'react';
import RcTimePicker from 'rc-time-picker';
import {inject, observer} from 'mobx-react';
import classNames from 'classnames';
import moment from 'moment';

import {generateID} from '../../helpers/strings';

import './styles.scss';
import styles from './timepicker.scss';

@inject('formStore')
@observer
class TimePicker extends Component {
    // TODO: make HOC with constructor and componentDidUpdate
    constructor(props) {
        super(props);

        this.id = props.id || generateID();
    }

    //TODO
    getDisabledHours = () => {};

    getDisabledMinutes = hours => {};

    componentDidUpdate() {
        const {formStore, value} = this.props;

        const validation = formStore.getValidation(this.id);

        if (!validation) {
            return true;
        }

        return formStore.validateInput(this.id, value);
    }

    render() {
        const {className, formStore} = this.props;

        return <RcTimePicker
            className={classNames(className, {
                [styles.error]: formStore.hasError(this.id),
            })}
            disabledHours={this.getDisabledHours}
            disabledMinutes={this.getDisabledMinutes}
            minuteStep={15}
            {...this.props}
        />;
    }
}

export default TimePicker;
import {Component} from 'react';
import RcTimePicker from 'rc-time-picker';
import {inject, observer} from 'mobx-react';
import classNames from 'classnames';
import moment from 'moment';

import {arrayFillRange} from '../../helpers/arrays';
import {isSameDayFromMoment} from '../../helpers/dates';
import {generateID} from '../../helpers/strings';
import {Validation} from '../../helpers/validation';

import './styles.scss';
import styles from './timepicker.scss';

@inject('formStore')
@observer
class TimePicker extends Component {
    date = moment();

    // TODO: make HOC with constructor and componentDidUpdate
    constructor(props) {
        super(props);

        this.id = props.id || generateID();
    }

    getDisabledHours = () => {
        return; //TODO

        const {day} = this.props;

        if (!day || !isSameDayFromMoment(day, this.date)) {
            return;
        }

        return arrayFillRange(0, this.date.hour() - 1);
    };

    getDisabledMinutes = hours => {

    };

    componentDidUpdate() {
        const {formStore, validation, value} = this.props;

        if (!validation || !validation.validate) {
            return true;
        }

        if (validation.validate(value)) {
            formStore.deleteError(this.id);
        } else {
            formStore.setError(this.id, validation.message);
        }
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
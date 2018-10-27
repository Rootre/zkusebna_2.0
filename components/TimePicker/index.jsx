import {Component} from 'react';
import RcTimePicker from 'rc-time-picker';
import moment from 'moment';

import {isSameDayFromMoment} from '../../helpers/dates';
import {arrayFillRange} from '../../helpers/arrays';

import './styles.scss';

class TimePicker extends Component {

    date = moment();

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

    render() {
        return <RcTimePicker
            disabledHours={this.getDisabledHours}
            disabledMinutes={this.getDisabledMinutes}
            minuteStep={15}
            {...this.props}
        />;
    }
}

export default TimePicker;
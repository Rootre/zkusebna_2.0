import {Component} from 'react';
import RcTimePicker from 'rc-time-picker';

import {isSameDay} from '../../helpers/dates';
import {arrayFillRange} from '../../helpers/arrays';

import './styles.scss';

class TimePicker extends Component {

    date = new Date();

    getDisabledHours = () => {
        const {day} = this.props;

        if (!day || !isSameDay(day, this.date)) {
            return;
        }

        return arrayFillRange(0, this.date.getHours() - 1);
    };

    getDisabledMinutes = hours => {
        console.log(hours);
    };

    render() {
        return <RcTimePicker
            disabledHours={this.getDisabledHours}
            disabledMinutes={this.getDisabledMinutes}
            minuteStep={15}
            showSecond={false}
            {...this.props}
        />;
    }
}

export default TimePicker;
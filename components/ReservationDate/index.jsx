import {Component} from 'react';

import {
    getDayFromMoment,
    getTimeFromMoment,
    isSameDayFromMoment,
} from '../../helpers/dates';

class ReservationDate extends Component {
    render() {
        const {start, end} = this.props;

        return (
            <span>
                {isSameDayFromMoment(start, end)
                    ?
                    <span>{getDayFromMoment(start)} {getTimeFromMoment(start)} - {getTimeFromMoment(end)}</span>
                    :
                    <span>{getDayFromMoment(start)} {getTimeFromMoment(start)} - {getDayFromMoment(end)} {getTimeFromMoment(end)}</span>
                }
            </span>
        );
    }
}

export default ReservationDate;
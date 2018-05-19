import React, {Component} from 'react'
import Picker from 'rc-time-picker'
import moment from 'moment/moment'

import css from 'rc-time-picker/assets/index.css'

export default class TimePicker extends Component {
    render() {
        const {defaultValue} = this.props
        return <div>
            <style>{css}</style>
            <Picker defaultValue={defaultValue || moment()} showSecond={false} minuteStep={15} />
        </div>
    }
}
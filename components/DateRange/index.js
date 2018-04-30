import React, {Component} from 'react'
import moment from 'moment/moment'

export default class DateRange extends Component {
    settings = {
        timeFormats: {
            day: 'DD. MM. YYYY',
            dayTime: 'DD. MM. YYYY HH:mm',
            time: 'HH:mm',
        }
    }

    get dayFormat() {
        return this.settings.timeFormats.day
    }

    get dayTimeFormat() {
        return this.settings.timeFormats.dayTime
    }

    get timeFormat() {
        return this.settings.timeFormats.time
    }

    getHtml(since, until = null) {
        return until
            ? <div>
                <p>Od: <strong>{since}</strong></p>
                <p>Do: <strong>{until}</strong></p>
            </div>
            : <div>
                <p><strong>{since}</strong></p>
            </div>
    }

    render() {
        const {end, showTime, start} = this.props

        let html = ''

        const since = moment(new Date(start))
        const until = moment(new Date(end))

        let format = showTime ? this.dayTimeFormat : this.dayFormat

        if (since.isSame(until, 'day')) {
            html = this.getHtml(since.format(format) + (showTime && ` - ${until.format(this.timeFormat)}`))
        }
        else {
            html = this.getHtml(
                since.format(format),
                until.format(format),
            )
        }

        return html
    }
}
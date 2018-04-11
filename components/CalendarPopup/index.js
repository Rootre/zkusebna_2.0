import React, {Component} from 'react'
import moment from 'moment'
import Modal from 'react-modal'

class CalendarPopup extends Component {
    get dayTimeFormat() {
        return "DD.MM.YYYY HH:mm"
    }
    get hourTimeFormat() {
        return "HH:mm"
    }

    componentWillMount() {
        if (typeof document !== 'undefined') {
            Modal.setAppElement('#app')
        }
    }

    render() {
        const {event: {end, items, start, title, user: {name}}, onClose} = this.props

        const since = moment(new Date(start))
        const until = moment(new Date(end))

        return <Modal
            isOpen={true}
            style={{
                overlay: {
                    zIndex: 99,
                }
            }}
        >
            <span
                style={{
                    cursor: 'pointer',
                    fontSize: '1.7em',
                    position: 'absolute',
                    right: '10px',
                    top: 0,
                }}
                onClick={e => onClose()}
            >&times;</span>
            <div style={{ float: 'right' }}>
                {since.isSame(until, 'day')
                    ? <p><i>{since.format(this.dayTimeFormat)} - {until.format(this.hourTimeFormat)}</i></p>
                    : <div>
                        <p>Od: {since.format(this.dayTimeFormat)}</p>
                        <p>Do: {until.format(this.dayTimeFormat)}</p>
                    </div>
                }
            </div>
            <h2>{title}</h2>
            <p>Rezervoval: <strong>{name}</strong></p>
            <h3>Rezervavané věci:</h3>
            <ul>
                {items.length && items.map(({name}) => <li key={name}>{name}</li>)}
            </ul>
        </Modal>
    }
}

export default CalendarPopup